export const SITE_CATEGORIES = [
  'PlayStation', 'Switch', 'PC', 'モバイル', 'Xbox',
  'ゲーム賛否', 'VR', 'エンタメ', '業界ニュース', 'eスポーツ',
] as const;

export type SiteCategory = typeof SITE_CATEGORIES[number];
export type CandidateStatus = 'new' | 'reviewing' | 'accepted' | 'held' | 'rejected' | 'published';
export type SourceKind = 'press-release' | 'official-site' | 'platform-blog';

export interface SourceConfig {
  id: string;
  name: string;
  publisher: string;
  type: 'rss' | 'html';
  adapter?: 'nintendo-topics' | 'sega-topics' | 'konami-news' | 'fromsoftware-press';
  url: string;
  enabled: boolean;
  official: boolean;
  locale: string;
  defaultCategories: SiteCategory[];
  sourceKind: SourceKind;
  includeUrlPatterns?: string[];
  includeKeywords?: string[];
  excludeKeywords?: string[];
  timeoutMs: number;
  requestIntervalMs: number;
}

export interface SourcesConfig { schemaVersion: 1; sources: SourceConfig[] }

export interface RawNewsItem {
  sourceId: string;
  externalId?: string;
  url: string;
  title?: string;
  summary?: string;
  publishedAt?: string;
  updatedAt?: string;
  fetchedAt: string;
}

export interface ScoreReason { label: string; score: number; detail?: string }

export interface DuplicateAssessment {
  exact: boolean;
  publishedArticle?: string;
  similarCandidateIds: string[];
  reasons: string[];
}

export interface CandidateDecision {
  status: Exclude<CandidateStatus, 'new'>;
  decidedAt: string;
  decidedBy: 'human-via-codex';
  note: string;
}

export interface NewsCandidate {
  schemaVersion: 1;
  candidateId: string;
  fingerprint: string;
  sourceId: string;
  sourceType: 'rss' | 'html';
  sourceUrl: string;
  canonicalUrl: string;
  externalId?: string;
  title: string;
  summary?: string;
  publisher: string;
  official: boolean;
  locale: string;
  announcedAt?: string;
  discoveredAt: string;
  lastSeenAt: string;
  gameTitles: string[];
  platforms: string[];
  suggestedCategories: SiteCategory[];
  suggestedTags: string[];
  matchedKeywords: string[];
  score: number;
  scoreBreakdown: ScoreReason[];
  warnings: string[];
  duplicate: DuplicateAssessment;
  imageAssessment: { status: 'unknown'; urls: string[] };
  status: CandidateStatus;
  decision?: CandidateDecision;
}

export interface SourceState {
  lastAttemptAt?: string;
  lastSuccessAt?: string;
  etag?: string;
  lastModified?: string;
  consecutiveFailures: number;
  lastError?: string;
}

export interface CollectorState {
  schemaVersion: 1;
  sources: Record<string, SourceState>;
}

export interface DecisionEvent extends CandidateDecision { candidateId: string }

export interface RunSourceResult {
  sourceId: string;
  status: 'success' | 'not-modified' | 'failed';
  itemCount: number;
  error?: string;
}

export interface RunSummary {
  runId: string;
  startedAt: string;
  finishedAt: string;
  dryRun: boolean;
  sourceResults: RunSourceResult[];
  newCandidates: number;
  updatedCandidates: number;
  exactDuplicates: number;
  reportPath?: string;
}
