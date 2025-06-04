import { GetServerSideProps } from 'next';

export default function ArticleSitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  console.log('=== SITEMAP DEBUG ===');
  console.log('All params:', JSON.stringify(params, null, 2));
  console.log('Slug array:', params?.slug);
  console.log('Request URL:', res.req?.url);
  console.log('====================');
  
  // slug配列から年月とxmlを取得
  const slug = params?.slug as string[];
  if (!slug || slug.length === 0) {
    console.error('No slug found');
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  
  // slug配列を結合して完全なパスを作成
  const fullPath = slug.join('/');
  console.log('Full path:', fullPath);
  
  // .xmlの拡張子を確認
  if (!fullPath.endsWith('.xml')) {
    console.error('Not an XML file:', fullPath);
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  
  // 年月を抽出（"2025-05.xml" → "2025-05"）
  const yearmonth = fullPath.replace('.xml', '');
  const [year, month] = yearmonth.split('-');
  
  if (!year || !month) {
    console.error('Invalid yearmonth format:', yearmonth);
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  
  console.log(`Parsed - Year: ${year}, Month: ${month}`);
  
  // テスト用サイトマップ（動的コンテンツ付き）
  const testSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://game-new-portal.vercel.app/news/test-${yearmonth}-article-1</loc>
    <lastmod>${year}-${month.padStart(2, '0')}-01</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://game-new-portal.vercel.app/news/test-${yearmonth}-article-2</loc>
    <lastmod>${year}-${month.padStart(2, '0')}-15</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>https://game-new-portal.vercel.app/news/test-${yearmonth}-article-3</loc>
    <lastmod>${year}-${month.padStart(2, '0')}-28</lastmod>
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
