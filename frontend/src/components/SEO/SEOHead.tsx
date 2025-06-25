// src/components/SEO/SEOHead.tsx (動作していた設定を復元)
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

      {/* RealFaviconGenerator - 動作していた設定を復元 */}
      <link rel="icon" href="/favicon.ico" sizes="32x32" />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      <link rel="icon" href="/favicon-96x96.png" sizes="96x96" type="image/png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* PWA - 動作していた設定を復元 */}
      <meta name="theme-color" content="#6c5ce7" />
      <meta name="application-name" content="ゲーム賛否" />
      <meta name="apple-mobile-web-app-title" content="ゲーム賛否" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ogType === 'article' ? 'Article' : 'WebSite',
            "name": fullTitle,
            "headline": title,
            "description": description || defaultDescription,
            "image": ogImageUrl,
            "url": canonicalUrl || baseUrl,
            ...(ogType === 'article' && {
              "datePublished": articlePublishedTime,
              "dateModified": articleModifiedTime || articlePublishedTime,
              "author": {
                "@type": "Organization",
                "name": articleAuthor || siteName
              },
              "publisher": {
                "@type": "Organization",
                "name": siteName,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/apple-touch-icon.png`
                }
              }
            }),
            ...(ogType === 'website' && {
              "publisher": {
                "@type": "Organization",
                "name": siteName,
                "logo": {
                  "@type": "ImageObject",
                  "url": `${baseUrl}/apple-touch-icon.png`
                }
              }
            })
          })
        }}
      />
    </Head>
  );
};

export default SEOHead;
