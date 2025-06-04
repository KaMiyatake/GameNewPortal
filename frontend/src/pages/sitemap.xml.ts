import { GetServerSideProps } from 'next';
import { generateSitemapIndex } from '../utils/sitemap';

export default function SitemapIndex() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app';
  
  try {
    const sitemapIndexXML = generateSitemapIndex(baseUrl);

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
