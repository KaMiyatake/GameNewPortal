import { GetServerSideProps } from 'next';
import { generatePagesSitemap } from '../utils/sitemap';

export default function PagesSitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app/';
  //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com';
  
  try {
    const sitemapXML = generatePagesSitemap(baseUrl);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    res.write(sitemapXML);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Pages sitemap generation error:', error);
    res.statusCode = 500;  // status() → statusCode に変更
    return { props: {} };
  }
};
