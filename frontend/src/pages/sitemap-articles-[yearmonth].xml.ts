import { GetServerSideProps } from 'next';
import { generateArticleSitemap } from '../utils/sitemap';

export default function ArticleSitemap() {
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ params, res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app/';
  //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com';
  const year = params?.year as string;
  const month = params?.month as string;
  
  try {
    const sitemapXML = generateArticleSitemap(baseUrl, year, month);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate'); // 24時間キャッシュ
    res.write(sitemapXML);
    res.end();

    return { props: {} };
  } catch (error) {
    console.error('Article sitemap generation error:', error);
    res.statusCode = 404;  // status() → statusCode に変更
    return { props: {} };
  }
};
