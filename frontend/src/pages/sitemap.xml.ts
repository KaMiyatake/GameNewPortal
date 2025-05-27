import { GetServerSideProps } from 'next';

// このページは直接アクセスされた場合にAPIエンドポイントにリダイレクト
export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app/';
  // const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com/';
  
  res.writeHead(301, {
    Location: `${baseUrl}/api/sitemap.xml`,
  });
  res.end();

  return {
    props: {},
  };
};

export default function SitemapPage() {
  return null;
}
