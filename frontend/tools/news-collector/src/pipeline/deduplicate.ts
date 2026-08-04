import type { NewsCandidate } from '../types';
import { normalizeText } from './normalize';

export interface PublishedArticleIndex {
  urls: Map<string, string>;
  titles: Array<{ slug: string; title: string }>;
}

function titleTokens(title: string): Set<string> {
  return new Set(normalizeText(title).toLowerCase().replace(/[『』「」【】()[\]、。,:：!！?？]/g, ' ').split(/\s+/).filter(token => token.length >= 2));
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (!left.size || !right.size) return 0;
  const intersection = [...left].filter(token => right.has(token)).length;
  return intersection / (left.size + right.size - intersection);
}

export function assessDuplicate(
  canonicalUrl: string,
  title: string,
  sourceId: string,
  existing: NewsCandidate[],
  published: PublishedArticleIndex,
) {
  const reasons: string[] = [];
  const publishedArticle = published.urls.get(canonicalUrl);
  if (publishedArticle) reasons.push(`公開済み記事 ${publishedArticle} が同じ公式URLを参照`);
  const exactCandidate = existing.find(item => item.canonicalUrl === canonicalUrl || (item.sourceId === sourceId && item.title === title));
  if (exactCandidate) reasons.push(`既存候補 ${exactCandidate.candidateId} と一致`);

  const tokens = titleTokens(title);
  const similarCandidateIds = existing
    .filter(item => item.canonicalUrl !== canonicalUrl && jaccard(tokens, titleTokens(item.title)) >= 0.65)
    .slice(0, 5)
    .map(item => item.candidateId);
  return {
    exact: Boolean(publishedArticle || exactCandidate),
    publishedArticle,
    exactCandidate,
    assessment: { exact: Boolean(publishedArticle || exactCandidate), publishedArticle, similarCandidateIds, reasons },
  };
}
