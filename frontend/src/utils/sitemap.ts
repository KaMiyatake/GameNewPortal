import { allArticles } from '../data/articles';
import { categories } from '../data/categories/categories';
import { getAllTags } from '../data/utils/data-helpers';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// URL結合の安全な関数を追加
const joinUrl = (baseUrl: string, path: string): string => {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const route = path.startsWith('/') ? path : `/${path}`;
  return `${base}${route}`;
};

// サイトマップインデックスの修正
export const generateSitemapIndex = (baseUrl: string): string => {
  const availableMonths = getAvailableMonths();
  const currentDate = new Date().toISOString();
  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;

  const sitemaps = [
    // 固定ページサイトマップ
    `<sitemap>
      <loc>${cleanBaseUrl}/sitemap-pages.xml</loc>
      <lastmod>${currentDate}</lastmod>
    </sitemap>`,
    
    // 年月別記事サイトマップ（新しい命名規則）
    ...availableMonths.map(({ year, month }) => 
      `<sitemap>
        <loc>${cleanBaseUrl}/sitemap-articles-${year}-${month}.xml</loc>
        <lastmod>${getLastModForMonth(year, month)}</lastmod>
      </sitemap>`
    )
  ];

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps.join('\n')}
</sitemapindex>`;
};

// 固定ページサイトマップの生成
// 修正された生成関数
export const generatePagesSitemap = (baseUrl: string): string => {
  const currentDate = new Date().toISOString();
  const urls: SitemapUrl[] = [];

  // ホームページ
  urls.push({
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0,
  });

  // 固定ページ
  urls.push({
    loc: joinUrl(baseUrl, '/about'),
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8,
  });

  urls.push({
    loc: joinUrl(baseUrl, '/contact'),
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8,
  });

  // カテゴリページ
  categories.forEach((category) => {
    urls.push({
      loc: joinUrl(baseUrl, `/category/${category.slug}`),
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8,
    });
  });

  // 人気タグページ（上位30個）
  const popularTags = getAllTags().slice(0, 30);
  popularTags.forEach(({ tag }) => {
    urls.push({
      loc: joinUrl(baseUrl, `/tag/${encodeURIComponent(tag)}`),
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.6,
    });
  });

  return generateSitemapXML(urls);
};


// 年月別記事サイトマップの修正
export const generateArticleSitemap = (baseUrl: string, year: string, month: string): string => {
  const targetYearMonth = `${year}-${month.padStart(2, '0')}`;
  
  console.log(`Generating sitemap for: ${targetYearMonth}`);
  console.log(`Total articles available: ${allArticles.length}`);
  
  const articles = allArticles.filter(article => {
    const articleYearMonth = article.publishedAt.substring(0, 7); // YYYY-MM
    return articleYearMonth === targetYearMonth;
  });

  console.log(`Articles found for ${targetYearMonth}: ${articles.length}`);
  
  if (articles.length === 0) {
    console.warn(`No articles found for ${targetYearMonth}`);
    return generateSitemapXML([]); // 空のサイトマップを返す
  }

  const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const urls: SitemapUrl[] = articles.map(article => ({
    loc: `${cleanBaseUrl}/news/${article.slug}`,
    lastmod: article.publishedAt,
    changefreq: 'weekly',
    priority: 0.9,
  }));

  return generateSitemapXML(urls);
};

// 利用可能な年月リストの取得
export const getAvailableMonths = (): Array<{ year: string; month: string }> => {
  const monthsSet = new Set<string>();
  
  allArticles.forEach(article => {
    const date = new Date(article.publishedAt);
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    monthsSet.add(`${year}-${month}`);
  });

  return Array.from(monthsSet)
    .sort((a, b) => b.localeCompare(a)) // 新しい月順
    .map(yearMonth => {
      const [year, month] = yearMonth.split('-');
      return { year, month };
    });
};

// 指定月の最終更新日取得
export const getLastModForMonth = (year: string, month: string): string => {
  const targetYearMonth = `${year}-${month.padStart(2, '0')}`;
  
  const monthArticles = allArticles.filter(article => {
    const articleYearMonth = article.publishedAt.substring(0, 7);
    return articleYearMonth === targetYearMonth;
  });

  if (monthArticles.length === 0) {
    return new Date().toISOString();
  }

  // その月の最新記事の日付を返す
  const latestArticle = monthArticles.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )[0];

  return latestArticle.publishedAt;
};

// 既存のXML生成関数
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

// 既存の単一サイトマップ関数（後方互換性のため保持）
export const generateSitemap = (baseUrl: string): SitemapUrl[] => {
  // 既存の実装をそのまま維持
  const sitemap: SitemapUrl[] = [];
  const currentDate = new Date().toISOString();

  sitemap.push({
    loc: baseUrl,
    lastmod: currentDate,
    changefreq: 'daily',
    priority: 1.0,
  });

  sitemap.push({
    loc: `${baseUrl}/about`,
    lastmod: currentDate,
    changefreq: 'monthly',
    priority: 0.8,
  });

  allArticles.forEach((article) => {
    sitemap.push({
      loc: `${baseUrl}/news/${article.slug}`,
      lastmod: article.publishedAt,
      changefreq: 'weekly',
      priority: 0.9,
    });
  });

  categories.forEach((category) => {
    sitemap.push({
      loc: `${baseUrl}/category/${category.slug}`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8,
    });
  });

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
