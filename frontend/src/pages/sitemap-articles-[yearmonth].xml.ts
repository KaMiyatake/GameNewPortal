import { GetServerSideProps } from 'next';

export default function ArticleSitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  // デバッグ用ログ
  console.log('=== SITEMAP DEBUG ===');
  console.log('All params:', JSON.stringify(params, null, 2));
  console.log('Request URL parts:', res.req?.url);
  console.log('====================');
  
  // テスト用のハードコーディングサイトマップ
  const testSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://game-new-portal.vercel.app/news/test-article-1</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://game-new-portal.vercel.app/news/test-article-2</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://game-new-portal.vercel.app/news/test-article-3</loc>
    <lastmod>2025-06-04</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
</urlset>`;

  try {
    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.write(testSitemap);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Test sitemap error:', error);
    res.statusCode = 500;
    res.end();
    return { props: {} };
  }
};
