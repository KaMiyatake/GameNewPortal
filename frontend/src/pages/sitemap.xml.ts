import { GetServerSideProps } from 'next';
import { generateSitemapIndex } from '../utils/sitemap';

export default function SitemapIndex() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  console.log('=== SITEMAP INDEX DEBUG ===');
  console.log('Generating sitemap index...');
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app';
  console.log('Base URL:', baseUrl);
  
  try {
    const sitemapIndexXML = generateSitemapIndex(baseUrl);
    console.log('Generated sitemap index length:', sitemapIndexXML.length);
    console.log('First 200 chars:', sitemapIndexXML.substring(0, 200));
    
    // サイトマップインデックスかどうかを確認
    if (!sitemapIndexXML.includes('<sitemapindex')) {
      console.error('ERROR: Generated content is not a sitemap index!');
      console.log('Full content:', sitemapIndexXML);
    }

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');
    res.write(sitemapIndexXML);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Sitemap index generation error:', error);
    res.statusCode = 500;
    res.end();
    return { props: {} };
  }
};
