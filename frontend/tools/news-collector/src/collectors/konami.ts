import type { RawNewsItem, SourceConfig } from '../types';

interface KonamiNewsItem {
  newsCom?: string;
  newsDate?: string;
  newsTime?: string;
  newsTitle?: string;
  newsLink?: string;
  newsKeyword?: string;
}

export function parseKonamiNewsScript(script: string, source: SourceConfig, fetchedAt: string): RawNewsItem[] {
  const match = script.match(/newsJson\s*=\s*(\{[\s\S]*?\});\s*(?:\r?\n|$)/);
  if (!match) throw new Error('KONAMI newsJson was not found');
  const parsed = JSON.parse(match[1]) as Record<string, KonamiNewsItem[]>;
  const items = Object.values(parsed).flat();
  return items.flatMap(item => {
    const link = item.newsLink?.trim();
    const title = item.newsTitle?.trim();
    if (!link || !title || !(source.includeUrlPatterns ?? []).some(pattern => link.includes(pattern))) return [];
    const url = new URL(link, 'https://www.konami.com').toString();
    const publishedAt = item.newsDate
      ? `${item.newsDate.replaceAll('.', '-')}${item.newsTime ? `T${item.newsTime}:00+09:00` : 'T00:00:00+09:00'}`
      : undefined;
    return [{
      sourceId: source.id,
      url,
      title,
      summary: item.newsKeyword?.split('/')[0],
      publishedAt,
      fetchedAt,
    }];
  });
}
