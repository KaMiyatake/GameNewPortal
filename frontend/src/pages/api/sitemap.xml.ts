import { NextApiRequest, NextApiResponse } from 'next';
import { generateSitemap, generateSitemapXML } from '../../utils/sitemap';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // 本番環境でのベースURLを設定
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://game-new-portal.vercel.app/';
  //const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com/';
  
  try {
    const sitemapUrls = generateSitemap(baseUrl);
    const xml = generateSitemapXML(sitemapUrls);

    res.setHeader('Content-Type', 'text/xml');
    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // 1時間キャッシュ
    res.status(200).send(xml);
  } catch (error) {
    console.error('Sitemap generation error:', error);
    res.status(500).json({ error: 'Failed to generate sitemap' });
  }
}
