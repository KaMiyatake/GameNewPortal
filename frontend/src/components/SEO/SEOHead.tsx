// src/components/SEO/SEOHead.tsx (確実版)
import Head from 'next/head';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
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
  
  // OG画像URL - デフォルトフォールバック付き
  const ogImageUrl = ogImage || `${baseUrl}/ogp-default.png`;
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph タグ */}
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
      
      {/* Twitter Card タグ */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@gamesanpi" />
      <meta name="twitter:creator" content="@gamesanpi" />
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
          {articleTags && articleTags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* デバッグ用（本番では除去予定） */}
      <meta name="debug-og-final" content={ogImageUrl} />
      <meta name="debug-title" content={fullTitle} />
    </Head>
  );
};

export default SEOHead;
