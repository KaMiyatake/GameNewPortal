import * as cheerio from 'cheerio';
import type { RawNewsItem, SourceConfig } from '../types';

const DATE_PATTERNS = [
  /(20\d{2})[./-](\d{1,2})[./-](\d{1,2})/,
  /(20\d{2})年\s*(\d{1,2})月\s*(\d{1,2})日/,
  /(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)\s+([A-Z][a-z]{2})\s+(\d{1,2})\s+(20\d{2})/,
];

function normalizeSpace(value: string): string {
  return value.replace(/\s+/g, ' ').trim();
}

function extractDate(value: string): string | undefined {
  for (let index = 0; index < DATE_PATTERNS.length; index += 1) {
    const match = value.match(DATE_PATTERNS[index]);
    if (!match) continue;
    if (index < 2) return `${match[1]}-${match[2].padStart(2, '0')}-${match[3].padStart(2, '0')}`;
    const month = String(['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].indexOf(match[1]) + 1).padStart(2, '0');
    return `${match[3]}-${month}-${match[2].padStart(2, '0')}`;
  }
  return undefined;
}

function matchesUrl(source: SourceConfig, url: string): boolean {
  return (source.includeUrlPatterns ?? []).some(pattern => url.includes(pattern));
}

export function parseHtmlList(html: string, source: SourceConfig, fetchedAt: string): RawNewsItem[] {
  const $ = cheerio.load(html);
  const seen = new Set<string>();
  const items: RawNewsItem[] = [];
  $('a[href]').each((_, element) => {
    const rawHref = $(element).attr('href');
    if (!rawHref) return;
    let url: string;
    try { url = new URL(rawHref, source.url).toString(); } catch { return; }
    if (!matchesUrl(source, url) || seen.has(url)) return;

    const ownText = normalizeSpace($(element).text());
    const parentText = normalizeSpace($(element).parent().text());
    const nearbyText = normalizeSpace($(element).closest('article, li, div').first().text()).slice(0, 1200);
    let title = ownText;
    if (!title || title.length < 4 || /^more|detail|詳しく|詳細$/i.test(title)) {
      title = normalizeSpace($(element).attr('title') ?? $(element).find('img').attr('alt') ?? '');
    }
    title = title.replace(/(?:20\d{2}[./-]\d{1,2}[./-]\d{1,2}|20\d{2}年\d{1,2}月\d{1,2}日).*$/, '').trim();
    if (!title || title.length < 4) return;

    seen.add(url);
    items.push({
      sourceId: source.id,
      url,
      title,
      summary: nearbyText && nearbyText !== title ? nearbyText.slice(0, 500) : undefined,
      publishedAt: extractDate(`${ownText} ${parentText} ${nearbyText}`),
      fetchedAt,
    });
  });
  return items;
}
