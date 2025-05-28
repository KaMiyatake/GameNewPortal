import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  canonicalUrl?: string;
}

const SEOHead: React.FC<SEOHeadProps> = ({
  title = 'ゲーム賛否 - 賛否両論で読む最新ゲームニュース＆レビュー',
  description = '「ゲーム賛否」は最新ゲーム・エンタメ情報を"賛"と"否"の視点で深掘りするメディアです。速報ニュースから、データ分析コラムまで、買う前に知りたい核心をお届けします。',
  keywords = [
    'ゲーム賛否',
    'ゲームレビュー',
    '賛否両論',
    '最新ゲーム',
    'PS5',
    'Xbox',
    'Nintendo Switch',
    'PCゲーム',
    'メタスコア',
    'eスポーツ',
    'ゲームニュース'
  ],
  ogImage = '/images/common/og-image.jpg',
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  canonicalUrl,
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com';
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  const siteName = 'ゲーム賛否';
  
  return (
    <Head>
      {/* 基本メタタグ */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow" />
      
      {/* 正規URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="ja_JP" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:site" content="@game_sanhhi" />
      
      {/* 記事固有のメタタグ */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Favicon */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* JSON-LD構造化データ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": ogType === 'article' ? 'Article' : 'WebSite',
            "name": title,
            "description": description,
            "url": canonicalUrl || baseUrl,
            "image": fullOgImage,
            "publisher": {
              "@type": "Organization",
              "name": siteName,
              "logo": {
                "@type": "ImageObject",
                "url": `${baseUrl}/images/common/logo.png`
              }
            },
            ...(ogType === 'website' && {
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${baseUrl}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              }
            }),
            ...(publishedTime && { "datePublished": publishedTime }),
            ...(modifiedTime && { "dateModified": modifiedTime }),
            ...(author && { "author": { "@type": "Person", "name": author } }),
          }),
        }}
      />
    </Head>
  );
};

export default SEOHead;
