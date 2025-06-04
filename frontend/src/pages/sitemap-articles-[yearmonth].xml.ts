import { GetServerSideProps } from 'next';
import { generateArticleSitemap } from '../utils/sitemap';

export default function ArticleSitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app';
  
  if (!params?.yearmonth) {
    console.error('No yearmonth parameter found');
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  
  const yearmonth = params.yearmonth as string; // "2025-06" 形式
  console.log('Received yearmonth parameter:', yearmonth);
  
  const [year, month] = yearmonth.split('-');
  
  if (!year || !month) {
    console.error('Invalid yearmonth format:', yearmonth);
    res.statusCode = 404;
    res.end();
    return { props: {} };
  }
  
  console.log(`Processing sitemap for year: ${year}, month: ${month}`);
  
  try {
    const sitemapXML = generateArticleSitemap(baseUrl, year, month);
    
    if (!sitemapXML || sitemapXML.trim() === '') {
      console.error('Empty sitemap generated');
      res.statusCode = 404;
      res.end();
      return { props: {} };
    }

    res.setHeader('Content-Type', 'text/xml; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.write(sitemapXML);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Article sitemap generation error:', error);
    res.statusCode = 500;
    res.end();
    return { props: {} };
  }
};
