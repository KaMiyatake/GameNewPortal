import dns from 'node:dns/promises';
import type { SourceConfig, SourceState } from './types';

const USER_AGENT = 'GameSanpiNewsCollector/1.0 (+https://gamesanpi.com/about)';
const RETRYABLE = new Set([429, 500, 502, 503, 504]);
const MAX_RESPONSE_BYTES = 5 * 1024 * 1024;

export interface FetchResult {
  status: 'success' | 'not-modified';
  body?: string;
  etag?: string;
  lastModified?: string;
  contentType?: string;
}

function isPrivateAddress(address: string): boolean {
  const normalized = address.toLowerCase();
  if (normalized === '::1' || normalized.startsWith('fc') || normalized.startsWith('fd') || normalized.startsWith('fe8') || normalized.startsWith('fe9') || normalized.startsWith('fea') || normalized.startsWith('feb')) return true;
  const parts = normalized.split('.').map(Number);
  if (parts.length !== 4 || parts.some(part => !Number.isInteger(part))) return false;
  return parts[0] === 10 || parts[0] === 127 || parts[0] === 0 ||
    (parts[0] === 169 && parts[1] === 254) ||
    (parts[0] === 172 && parts[1] >= 16 && parts[1] <= 31) ||
    (parts[0] === 192 && parts[1] === 168);
}

async function assertSafeUrl(rawUrl: string): Promise<URL> {
  const url = new URL(rawUrl);
  if (url.protocol !== 'https:') throw new Error(`Only HTTPS is allowed: ${rawUrl}`);
  const hostname = url.hostname.toLowerCase();
  if (hostname === 'localhost' || hostname.endsWith('.local') || /^127\./.test(hostname) || /^10\./.test(hostname) || /^192\.168\./.test(hostname)) {
    throw new Error(`Private or local host is not allowed: ${hostname}`);
  }
  const addresses = await dns.lookup(hostname, { all: true });
  if (!addresses.length || addresses.some(result => isPrivateAddress(result.address))) throw new Error(`Host resolves to a private address: ${hostname}`);
  return url;
}

function wait(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchSource(source: SourceConfig, state: SourceState = { consecutiveFailures: 0 }): Promise<FetchResult> {
  await assertSafeUrl(source.url);
  const headers: Record<string, string> = {
    'User-Agent': USER_AGENT,
    Accept: source.type === 'rss'
      ? 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.1'
      : 'text/html, application/xhtml+xml;q=0.9, */*;q=0.1',
  };
  if (state.etag) headers['If-None-Match'] = state.etag;
  if (state.lastModified) headers['If-Modified-Since'] = state.lastModified;

  let lastError: Error | undefined;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), source.timeoutMs);
    try {
      const response = await fetch(source.url, { headers, redirect: 'follow', signal: controller.signal });
      clearTimeout(timer);
      await assertSafeUrl(response.url);
      if (response.status === 304) return { status: 'not-modified', etag: state.etag, lastModified: state.lastModified };
      if (RETRYABLE.has(response.status)) {
        const retryAfter = Number(response.headers.get('retry-after'));
        if (attempt < 2) {
          await wait(Number.isFinite(retryAfter) ? retryAfter * 1000 : 500 * (2 ** attempt));
          continue;
        }
      }
      if (!response.ok) throw new Error(`HTTP ${response.status} ${response.statusText}`);
      const contentLength = Number(response.headers.get('content-length'));
      if (Number.isFinite(contentLength) && contentLength > MAX_RESPONSE_BYTES) throw new Error(`Response too large: ${contentLength} bytes`);
      const body = await response.text();
      if (Buffer.byteLength(body, 'utf8') > MAX_RESPONSE_BYTES) throw new Error('Response exceeded 5 MiB limit');
      return {
        status: 'success', body,
        etag: response.headers.get('etag') ?? undefined,
        lastModified: response.headers.get('last-modified') ?? undefined,
        contentType: response.headers.get('content-type') ?? undefined,
      };
    } catch (error) {
      clearTimeout(timer);
      lastError = error instanceof Error ? error : new Error(String(error));
      if (attempt < 2) await wait(500 * (2 ** attempt));
    }
  }
  throw lastError ?? new Error(`Failed to fetch ${source.id}`);
}
