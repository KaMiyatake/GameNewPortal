import path from 'node:path';
import { loadScoring, loadSources, selectSources } from '../config';
import { parseFeed } from '../collectors/rss';
import { parseHtmlList } from '../collectors/html';
import { parseKonamiNewsScript } from '../collectors/konami';
import { fetchSource } from '../http';
import { assessDuplicate } from '../pipeline/deduplicate';
import { normalizeRawItem } from '../pipeline/normalize';
import { scoreCandidate } from '../pipeline/score';
import { loadPublishedArticleIndex } from '../repositories/article-repository';
import { acquireLock, loadCandidates, loadState, saveCandidates, saveRun, saveState, writeReport } from '../repositories/storage';
import { renderMarkdownReport } from '../reporting/markdown';
import type { NewsCandidate, RunSourceResult, RunSummary, SourceConfig } from '../types';

export interface CollectOptions { dryRun: boolean; sourceId?: string; since?: string; limit: number }

function isAfterSince(date: string | undefined, since?: string): boolean {
  if (!since || !date) return true;
  return new Date(date).getTime() >= new Date(since).getTime();
}

function suggestedTags(title: string, matchedKeywords: string[], platforms: string[]): string[] {
  const quoted = [...title.matchAll(/[『「](.*?)[』」]/g)].map(match => match[1]).filter(value => value.length <= 80);
  return [...new Set([...quoted, ...matchedKeywords, ...platforms])].slice(0, 8);
}

function inferGameTitles(title: string): string[] {
  const titles = [...title.matchAll(/[『「](.*?)[』」]/g)]
    .map(match => match[1].trim())
    .filter(value => value.length >= 2 && value.length <= 100)
    .filter(value => !/^(アップデート|セール|特集|お知らせ|ゲーム|ニュース)$/.test(value));
  return [...new Set(titles)].slice(0, 3);
}

function buildCandidate(raw: ReturnType<typeof normalizeRawItem>, source: SourceConfig, original: any, existing: NewsCandidate[], published: ReturnType<typeof loadPublishedArticleIndex>, scoring: ReturnType<typeof loadScoring>, now: Date): NewsCandidate {
  const duplicateResult = assessDuplicate(raw.canonicalUrl, raw.title, source.id, existing, published);
  const base: NewsCandidate = {
    schemaVersion: 1, candidateId: raw.candidateId, fingerprint: raw.fingerprint,
    sourceId: source.id, sourceType: source.type, sourceUrl: source.url,
    canonicalUrl: raw.canonicalUrl, externalId: original.externalId,
    title: raw.title, summary: raw.summary, publisher: source.publisher,
    official: source.official, locale: source.locale, announcedAt: raw.announcedAt,
    discoveredAt: now.toISOString(), lastSeenAt: now.toISOString(),
    gameTitles: inferGameTitles(raw.title), platforms: [], suggestedCategories: source.defaultCategories,
    suggestedTags: [], matchedKeywords: [], score: 0, scoreBreakdown: [], warnings: [],
    duplicate: duplicateResult.assessment, imageAssessment: { status: 'unknown', urls: [] }, status: 'new',
  };
  const scored = scoreCandidate(base, source, scoring, now);
  base.score = scored.score;
  base.scoreBreakdown = scored.breakdown;
  base.matchedKeywords = scored.matchedKeywords;
  base.platforms = scored.platforms;
  base.suggestedCategories = scored.categories;
  base.suggestedTags = suggestedTags(base.title, scored.matchedKeywords, scored.platforms);
  base.warnings = scored.warnings;
  if (duplicateResult.assessment.exact) base.warnings.push(...duplicateResult.assessment.reasons);
  return base;
}

export async function collectCommand(options: CollectOptions, cwd = process.cwd()): Promise<RunSummary> {
  const releaseLock = options.dryRun ? () => undefined : acquireLock(cwd);
  const started = new Date();
  const runId = started.toISOString().replace(/[:.]/g, '-');
  try {
    const sources = selectSources(loadSources(cwd).sources, options.sourceId);
    const scoring = loadScoring(cwd);
    const state = loadState(cwd);
    const existing = loadCandidates(cwd);
    const published = loadPublishedArticleIndex(cwd);
    const working = [...existing];
    const sourceResults: RunSourceResult[] = [];
    let newCandidates = 0;
    let updatedCandidates = 0;
    let exactDuplicates = 0;

    for (const source of sources) {
      const attemptedAt = new Date().toISOString();
      const sourceState = state.sources[source.id] ?? { consecutiveFailures: 0 };
      sourceState.lastAttemptAt = attemptedAt;
      try {
        const response = await fetchSource(source, options.since ? { consecutiveFailures: 0 } : sourceState);
        if (response.status === 'not-modified') {
          sourceState.lastSuccessAt = attemptedAt;
          sourceState.consecutiveFailures = 0;
          sourceResults.push({ sourceId: source.id, status: 'not-modified', itemCount: 0 });
          state.sources[source.id] = sourceState;
          continue;
        }
        const rawItems = source.type === 'rss'
          ? parseFeed(response.body ?? '', source, attemptedAt)
          : source.adapter === 'konami-news'
            ? parseKonamiNewsScript(response.body ?? '', source, attemptedAt)
            : parseHtmlList(response.body ?? '', source, attemptedAt);
        const eligible = rawItems.filter(item => isAfterSince(item.publishedAt, options.since));
        for (const item of eligible) {
          const normalized = normalizeRawItem(item, source);
          if (!normalized.title) continue;
          const index = working.findIndex(current => current.fingerprint === normalized.fingerprint || current.canonicalUrl === normalized.canonicalUrl);
          const comparisonCandidates = index >= 0 ? working.filter((_, candidateIndex) => candidateIndex !== index) : working;
          const candidate = buildCandidate(normalized, source, item, comparisonCandidates, published, scoring, started);
          if (index >= 0) {
            const previous = working[index];
            working[index] = {
              ...candidate,
              discoveredAt: previous.discoveredAt,
              lastSeenAt: attemptedAt,
              status: previous.status,
              decision: previous.decision,
            };
            updatedCandidates += 1;
          } else {
            working.push(candidate);
            if (candidate.duplicate.exact) exactDuplicates += 1;
            else newCandidates += 1;
          }
        }
        sourceState.lastSuccessAt = attemptedAt;
        sourceState.etag = response.etag;
        sourceState.lastModified = response.lastModified;
        sourceState.consecutiveFailures = 0;
        delete sourceState.lastError;
        state.sources[source.id] = sourceState;
        sourceResults.push({ sourceId: source.id, status: 'success', itemCount: eligible.length });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        sourceState.consecutiveFailures += 1;
        sourceState.lastError = message;
        state.sources[source.id] = sourceState;
        sourceResults.push({ sourceId: source.id, status: 'failed', itemCount: 0, error: message });
      }
    }

    const report = renderMarkdownReport(working, sourceResults, started, options.limit);
    let reportPath: string | undefined;
    if (!options.dryRun) {
      saveCandidates(working, cwd);
      saveState(state, cwd);
      reportPath = writeReport(report, started, cwd);
    }
    const summary: RunSummary = {
      runId, startedAt: started.toISOString(), finishedAt: new Date().toISOString(), dryRun: options.dryRun,
      sourceResults, newCandidates, updatedCandidates, exactDuplicates,
      reportPath: reportPath ? path.relative(cwd, reportPath) : undefined,
    };
    if (!options.dryRun) saveRun(summary, cwd);
    process.stdout.write(`${report}\n`);
    return summary;
  } finally {
    releaseLock();
  }
}
