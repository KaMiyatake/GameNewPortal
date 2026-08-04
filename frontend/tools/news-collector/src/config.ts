import fs from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { SITE_CATEGORIES, type SourceConfig, type SourcesConfig } from './types';

const categorySchema = z.enum(SITE_CATEGORIES);
const sourceSchema = z.object({
  id: z.string().regex(/^[a-z0-9-]+$/),
  name: z.string().min(1),
  publisher: z.string().min(1),
  type: z.enum(['rss', 'html']),
  adapter: z.enum(['nintendo-topics', 'sega-topics', 'konami-news', 'fromsoftware-press']).optional(),
  url: z.string().url().refine(value => value.startsWith('https://'), 'HTTPS URL is required'),
  enabled: z.boolean(),
  official: z.boolean(),
  locale: z.string().min(2),
  defaultCategories: z.array(categorySchema),
  sourceKind: z.enum(['press-release', 'official-site', 'platform-blog']),
  includeUrlPatterns: z.array(z.string()).optional(),
  includeKeywords: z.array(z.string()).optional(),
  excludeKeywords: z.array(z.string()).optional(),
  timeoutMs: z.number().int().min(1000).max(60000),
  requestIntervalMs: z.number().int().min(0).max(60000),
}).superRefine((value, ctx) => {
  if (value.type === 'html' && !value.adapter) {
    ctx.addIssue({ code: 'custom', message: 'HTML source requires adapter' });
  }
});

const sourcesSchema = z.object({ schemaVersion: z.literal(1), sources: z.array(sourceSchema) });

export interface ScoringConfig {
  schemaVersion: 1;
  maxScore: number;
  sourceKindScores: Record<string, number>;
  freshnessScores: Array<{ maxHours: number; score: number }>;
  keywordRules: Array<{ label: string; patterns: string[]; score: number }>;
  siteFitRules: Array<{ label: string; patterns: string[]; minimumMatches?: number; score: number }>;
  penaltyRules: Array<{ label: string; patterns: string[]; score: number }>;
}

export function getCollectorRoot(cwd = process.cwd()): string {
  return path.join(cwd, 'tools', 'news-collector');
}

export function getDataRoot(cwd = process.cwd()): string {
  return path.join(cwd, '.news-collector');
}

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

export function loadSources(cwd = process.cwd()): SourcesConfig {
  const parsed = sourcesSchema.parse(readJson(path.join(getCollectorRoot(cwd), 'config', 'sources.json')));
  const ids = new Set<string>();
  for (const source of parsed.sources) {
    if (ids.has(source.id)) throw new Error(`Duplicate source id: ${source.id}`);
    ids.add(source.id);
  }
  return parsed as SourcesConfig;
}

export function loadScoring(cwd = process.cwd()): ScoringConfig {
  return readJson(path.join(getCollectorRoot(cwd), 'config', 'scoring.json')) as ScoringConfig;
}

export function selectSources(sources: SourceConfig[], sourceId?: string): SourceConfig[] {
  const enabled = sources.filter(source => source.enabled);
  if (!sourceId) return enabled;
  const selected = enabled.filter(source => source.id === sourceId);
  if (!selected.length) throw new Error(`Enabled source not found: ${sourceId}`);
  return selected;
}
