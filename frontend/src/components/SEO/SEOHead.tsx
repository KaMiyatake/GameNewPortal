// src/components/SEO/SEOHead.tsx (安全版)
import Head from 'next/head';
import { getOGPImagePath } from '../../utils/image-paths';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  articleSlug?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  articleSection?: string;
  articleTags?: string[];
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  keywords = [],
  canonicalUrl,
  ogImage,
  articleSlug,
  ogType = 'website',
  twitterCard = 'summary_large_image',
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  articleSection,
  articleTags = []
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com';
  const siteName = 'ゲーム賛否';
  const defaultDescription = '「ゲーム賛否」は最新ゲーム・エンタメ情報を"賛"と"否"の視点で深掘りするメディアです。';
  
  // OG画像のURL生成（Twitter専用、記事表示には影響しない）
  const getOgImageUrl = () => {
    // 1. 明示的にogImageが指定されている場合
    if (ogImage) {
      if (ogImage.startsWith('http')) {
        return ogImage;
      }
      return `${baseUrl}${ogImage.startsWith('/') ? '' : '/'}${ogImage}`;
    }
    
    // 2. 記事のslugが指定されている場合（Twitter OGP専用）
    if (articleSlug) {
      try {
        const articleImagePath = getOGPImagePath(articleSlug);
        return `${baseUrl}${articleImagePath}`;
      } catch (error) {
        console.warn(`OGP画像取得失敗: ${articleSlug}`, error);
        // フォールバック
        return `${baseUrl}/ogp-default.png`;
      }
    }
    
    // 3. デフォルトOG画像
    return `${baseUrl}/ogp-default.png`;
  };

  const ogImageUrl = getOgImageUrl();
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph タグ（Twitter専用、記事表示には影響しない） */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${title} - ${siteName}`} />
      <meta property="og:url" content={canonicalUrl || baseUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ja_JP" />
      
      {/* Twitter Card タグ（Twitter専用） */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@gamesanpi"} />
      <meta name="twitter:creator" content={process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@gamesanpi"} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta name="twitter:image:alt" content={`${title} - ${siteName}`} />
      
      {/* 記事固有のメタタグ */}
      {ogType === 'article' && (
        <>
          {articlePublishedTime && (
            <meta property="article:published_time" content={articlePublishedTime} />
          )}
          {articleModifiedTime && (
            <meta property="article:modified_time" content={articleModifiedTime} />
          )}
          {articleAuthor && (
            <meta property="article:author" content={articleAuthor} />
          )}
          {articleSection && (
            <meta property="article:section" content={articleSection} />
          )}
          {articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
    </Head>
  );
};

export default SEOHead;
