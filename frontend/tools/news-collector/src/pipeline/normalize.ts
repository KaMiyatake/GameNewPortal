import crypto from 'node:crypto';
import * as cheerio from 'cheerio';
import type { RawNewsItem, SourceConfig } from '../types';

const TRACKING_PARAMS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'fbclid', 'gclid'];

export function normalizeText(value: string): string {
  return value.normalize('NFKC').replace(/\s+/g, ' ').trim();
}

export function stripHtml(value?: string): string | undefined {
  if (!value) return undefined;
  const $ = cheerio.load(value);
  const result = normalizeText($.root().text());
  return result ? result.slice(0, 1000) : undefined;
}

export function canonicalizeUrl(rawUrl: string, base?: string): string {
  const url = new URL(rawUrl, base);
  url.hash = '';
  url.hostname = url.hostname.toLowerCase();
  for (const param of TRACKING_PARAMS) url.searchParams.delete(param);
  if (url.pathname !== '/' && url.pathname.endsWith('/')) url.pathname = url.pathname.replace(/\/+$/, '/');
  return url.toString();
}

export function parseDate(value?: string): string | undefined {
  if (!value) return undefined;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toISOString();
}

export function createFingerprint(sourceId: string, canonicalUrl: string): string {
  return crypto.createHash('sha256').update(`${sourceId}\0${canonicalUrl}`).digest('hex');
}

export function createCandidateId(sourceId: string, canonicalUrl: string, announcedAt?: string): string {
  const date = announcedAt ? new Date(announcedAt) : new Date();
  const prefix = Number.isNaN(date.getTime()) ? new Date().toISOString().slice(0, 10).replaceAll('-', '') : date.toISOString().slice(0, 10).replaceAll('-', '');
  const shortHash = crypto.createHash('sha256').update(canonicalUrl).digest('hex').slice(0, 8);
  return `${prefix}-${sourceId}-${shortHash}`;
}

export function normalizeRawItem(item: RawNewsItem, source: SourceConfig) {
  const canonicalUrl = canonicalizeUrl(item.url, source.url);
  const announcedAt = parseDate(item.publishedAt);
  const title = normalizeText(item.title ?? '');
  return {
    canonicalUrl, announcedAt, title,
    summary: stripHtml(item.summary),
    fingerprint: createFingerprint(source.id, canonicalUrl),
    candidateId: createCandidateId(source.id, canonicalUrl, announcedAt),
  };
}
