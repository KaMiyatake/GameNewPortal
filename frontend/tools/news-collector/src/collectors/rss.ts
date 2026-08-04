import { XMLParser } from 'fast-xml-parser';
import type { RawNewsItem, SourceConfig } from '../types';

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: '@_', trimValues: true, processEntities: true });

function arrayify<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

function text(value: unknown): string | undefined {
  if (typeof value === 'string' || typeof value === 'number') return String(value).trim();
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>;
    return text(record['#text']) ?? text(record.__cdata);
  }
  return undefined;
}

function atomLink(value: unknown): string | undefined {
  for (const item of arrayify(value as Record<string, unknown> | Array<Record<string, unknown>> | undefined)) {
    if (item && typeof item === 'object' && (!item['@_rel'] || item['@_rel'] === 'alternate') && typeof item['@_href'] === 'string') return item['@_href'];
    if (typeof item === 'string') return item;
  }
  return undefined;
}

export function parseFeed(xml: string, source: SourceConfig, fetchedAt: string): RawNewsItem[] {
  const document = parser.parse(xml) as Record<string, any>;
  const rssItems = arrayify(document.rss?.channel?.item);
  const atomItems = arrayify(document.feed?.entry);
  const items = rssItems.length ? rssItems : atomItems;
  return items.flatMap((item: Record<string, unknown>) => {
    const url = text(item.link) ?? atomLink(item.link) ?? text(item.guid);
    const title = text(item.title);
    if (!url || !title) return [];
    return [{
      sourceId: source.id,
      externalId: text(item.guid) ?? text(item.id),
      url,
      title,
      summary: text(item.description) ?? text(item.summary) ?? text(item.content),
      publishedAt: text(item.pubDate) ?? text(item.published) ?? text(item.updated) ?? text(item['dc:date']),
      updatedAt: text(item.updated),
      fetchedAt,
    }];
  });
}
