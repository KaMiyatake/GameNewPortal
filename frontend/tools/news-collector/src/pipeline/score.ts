import type { ScoringConfig } from '../config';
import type { NewsCandidate, ScoreReason, SiteCategory, SourceConfig } from '../types';

const PLATFORM_RULES: Array<{ pattern: RegExp; name: string; category: SiteCategory }> = [
  { pattern: /PlayStation|PS5|PS4/i, name: 'PlayStation', category: 'PlayStation' },
  { pattern: /Nintendo Switch|Switch 2|Switch/i, name: 'Nintendo Switch', category: 'Switch' },
  { pattern: /\bPC\b|Steam|Epic Games Store|Windows/i, name: 'PC', category: 'PC' },
  { pattern: /Xbox|Game Pass/i, name: 'Xbox', category: 'Xbox' },
  { pattern: /iOS|Android|スマートフォン|モバイル/i, name: 'モバイル', category: 'モバイル' },
  { pattern: /VR|Meta Quest|PS VR/i, name: 'VR', category: 'VR' },
];

function includesPattern(text: string, pattern: string): boolean {
  return text.toLocaleLowerCase().includes(pattern.toLocaleLowerCase());
}

export function inferPlatforms(text: string): { platforms: string[]; categories: SiteCategory[] } {
  const platforms: string[] = [];
  const categories: SiteCategory[] = [];
  for (const rule of PLATFORM_RULES) {
    if (!rule.pattern.test(text)) continue;
    platforms.push(rule.name);
    categories.push(rule.category);
  }
  return { platforms: [...new Set(platforms)], categories: [...new Set(categories)] };
}

export function scoreCandidate(
  candidate: Pick<NewsCandidate, 'title' | 'summary' | 'announcedAt' | 'locale' | 'duplicate'>,
  source: SourceConfig,
  config: ScoringConfig,
  now = new Date(),
): { score: number; breakdown: ScoreReason[]; matchedKeywords: string[]; platforms: string[]; categories: SiteCategory[]; warnings: string[] } {
  const text = `${candidate.title} ${candidate.summary ?? ''}`;
  const breakdown: ScoreReason[] = [];
  const matchedKeywords: string[] = [];
  const warnings: string[] = [];

  const sourceScore = config.sourceKindScores[source.sourceKind] ?? 0;
  breakdown.push({ label: '公式情報源', score: sourceScore, detail: source.sourceKind });

  if (candidate.announcedAt) {
    const ageHours = (now.getTime() - new Date(candidate.announcedAt).getTime()) / 3_600_000;
    const freshness = config.freshnessScores.find(rule => ageHours <= rule.maxHours);
    if (freshness) breakdown.push({ label: '鮮度', score: freshness.score, detail: `${Math.max(0, Math.round(ageHours))}時間前` });
    else warnings.push('発表日時が7日より古い、または未来日です');
  } else {
    warnings.push('発表日時を抽出できませんでした');
  }

  let newsValue = 0;
  for (const rule of config.keywordRules) {
    const matches = rule.patterns.filter(pattern => includesPattern(text, pattern));
    if (!matches.length) continue;
    const awarded = Math.min(rule.score, 30 - newsValue);
    if (awarded <= 0) break;
    newsValue += awarded;
    matchedKeywords.push(...matches);
    breakdown.push({ label: rule.label, score: awarded, detail: matches.join(', ') });
  }

  if (source.locale.toLowerCase().startsWith('ja')) breakdown.push({ label: '日本語情報', score: 5 });
  const inferred = inferPlatforms(text);
  const categories = [...new Set([...source.defaultCategories, ...inferred.categories])];
  if (categories.length) breakdown.push({ label: '既存カテゴリへ分類可能', score: 5, detail: categories.join(', ') });
  if (inferred.platforms.length >= 2) breakdown.push({ label: '複数プラットフォーム', score: 3, detail: inferred.platforms.join(', ') });

  for (const rule of config.penaltyRules) {
    const matches = rule.patterns.filter(pattern => includesPattern(text, pattern));
    if (matches.length) breakdown.push({ label: rule.label, score: rule.score, detail: matches.join(', ') });
  }
  if (candidate.duplicate.similarCandidateIds.length) {
    breakdown.push({ label: '類似候補あり', score: -20, detail: candidate.duplicate.similarCandidateIds.join(', ') });
    warnings.push('同一発表または続報の可能性があります');
  }
  if (!candidate.summary || candidate.summary.length < 40) {
    breakdown.push({ label: '情報量が少ない', score: -10 });
    warnings.push('要約情報が不足しています');
  }
  if (source.excludeKeywords?.some(keyword => includesPattern(text, keyword))) {
    breakdown.push({ label: '情報源固有の低優先キーワード', score: -20 });
  }

  const rawScore = breakdown.reduce((sum, reason) => sum + reason.score, 0);
  return {
    score: Math.max(0, Math.min(config.maxScore, rawScore)), breakdown,
    matchedKeywords: [...new Set(matchedKeywords)],
    platforms: inferred.platforms, categories, warnings,
  };
}
