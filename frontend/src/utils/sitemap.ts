import { allArticles } from '../data/articles';
import { categories } from '../data/categories/categories';
import { getAllTags } from '../data/utils/data-helpers';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export const generateSitemap = (baseUrl: string): SitemapUrl[] => {
  const sitemap: SitemapUrl[] = [];
  const currentDate = new Date().toISOString();

  // 1. ホームページ
  sitemap.push({
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0,
  });

  // 2. 固定ページ
  sitemap.push({
    loc: `${baseUrl}/about`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8,
  });

  // 3. 記事ページ
  allArticles.forEach((article) => {
    sitemap.push({
      loc: `${baseUrl}/news/${article.slug}`,
      lastmod: article.publishedAt,
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  // 4. カテゴリページ
  categories.forEach((category) => {
    sitemap.push({
      loc: `${baseUrl}/category/${category.slug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8,
    });
  });

  // 5. タグページ（人気タグ上位30個のみ）
  const popularTags = getAllTags().slice(0, 30);
  popularTags.forEach(({ tag }) => {
    sitemap.push({
      loc: `${baseUrl}/tag/${encodeURIComponent(tag)}`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6,
    });
  });

  return sitemap;
};

export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map((url) => {
    return `  <url>
    <loc>${url.loc}</loc>
    ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
    ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
    ${url.priority ? `<priority>${url.priority}</priority>` : ''}
  </url>`;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
};
