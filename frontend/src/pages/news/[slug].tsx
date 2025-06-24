// src/pages/news/[slug].tsx (OGP対応版)
import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import RelatedNews from '../../components/NewsDetail/RelatedNews';
import NewsContent from '../../components/NewsDetail/NewsContent';
import Sidebar from '../../components/Sidebar/Sidebar';
import SEOHead from '../../components/SEO/SEOHead';
import { getNewsDetail, getCategories, getPopularNews } from '../../utils/api';
import { allArticles } from '../../data/articles';
import { getPopularTags } from '../../data/utils/data-helpers';
import { getCategoryUrl, getCategoryColor } from '../../utils/category-utils';
// サーバーサイド専用関数をインポート
import { getOGPImagePathWithFallback } from '../../utils/image-paths-server';
import { NewsItemDetail, Category, NewsItem } from '../../types';
import styles from '../../styles/NewsDetail.module.css';

interface NewsDetailPageProps {
  newsDetail: NewsItemDetail;
  categories: Category[];
  popularNews: NewsItem[];
  popularTags: { tag: string; count: number }[];
  ogImagePath: string; // OGP専用画像パス
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  newsDetail,
  categories,
  popularNews,
  popularTags,
  ogImagePath // OGP専用
}) => {
  // 主要カテゴリ（最初のカテゴリ）を取得
  const primaryCategory = newsDetail.categories && newsDetail.categories.length > 0 
    ? newsDetail.categories[0] 
    : null;

  return (
    <>
      <SEOHead
        title={`${newsDetail.title} | ゲーム賛否`}
        description={newsDetail.summary}
        keywords={[...newsDetail.tags, 'ゲーム賛否', 'ゲームレビュー', '賛否両論']}
        ogImage={ogImagePath} // 記事のメイン画像を使用（Twitter OGP用）
        articleSlug={newsDetail.slug} // 追加: OGP画像自動生成用
        ogType="article"
        twitterCard="summary_large_image" // 追加: Twitter Card設定
        articlePublishedTime={new Date(newsDetail.date).toISOString()} // 修正: ISO形式
        articleModifiedTime={new Date(newsDetail.date).toISOString()} // 追加: 更新日時
        articleAuthor={newsDetail.author}
        articleSection={primaryCategory || undefined} // 追加: 記事セクション
        articleTags={newsDetail.tags} // 追加: 記事タグ
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com'}/news/${newsDetail.slug}`}
      />
      <Layout>
        <div className={styles.container}>
          {/* Breadcrumbs - 主要カテゴリのみ表示 */}
          <div className={styles.breadcrumbs}>
            <Link href="/">
              <span>ホーム</span>
            </Link>
            <span className={styles.separator}>&gt;</span>
            {primaryCategory ? (
              <>
                <Link href={getCategoryUrl(primaryCategory)}>
                  <span>{primaryCategory}</span>
                </Link>
                <span className={styles.separator}>&gt;</span>
              </>
            ) : null}
            <span className={styles.current}>{newsDetail.title}</span>
          </div>

          <div className={styles.newsDetailLayout}>
            <div className={styles.mainContent}>
              <div className={styles.articleHeader}>
                <h1 className={styles.newsTitle}>{newsDetail.title}</h1>
                
                {/* 理想の並び順：日付 → 著者 → カテゴリ */}
                <div className={styles.newsInfo}>
                  <span className={styles.newsDate}>{newsDetail.date}</span>
                  <span className={styles.newsAuthor}>by {newsDetail.author}</span>
                  
                  {/* カテゴリをnewsInfo内に戻すが、継承を回避するため独立したコンテナに */}
                  <div className={styles.categoriesContainer}>
                    {newsDetail.categories && newsDetail.categories.map((category, index) => (
                      <Link key={index} href={getCategoryUrl(category)}>
                        <span 
                          className={styles.newsCategory}
                          style={{ '--category-color': getCategoryColor(category) } as React.CSSProperties}
                        >
                          {category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* 既存の画像表示（変更なし） */}
              <div className={styles.featuredImage}>
                <img src={newsDetail.imageUrl} alt={newsDetail.title} />
              </div>

              <NewsContent content={newsDetail.content} />

              <div className={styles.tagContainer}>
                {newsDetail.tags.map((tag, index) => (
                  <Link key={index} href={`/tag/${encodeURIComponent(tag)}`}>
                    <span className={styles.tag}>#{tag}</span>
                  </Link>
                ))}
              </div>
              
              <div className={styles.relatedNewsSection}>
                <RelatedNews news={newsDetail.relatedNews} />
              </div>
            </div>
            
            <div className={styles.sidebar}>
              <Sidebar 
                popularNews={popularNews} 
                categories={categories} 
                popularTags={popularTags}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allArticles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps<NewsDetailPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    if (!slug) {
      return { notFound: true };
    }
    
    const [newsDetail, categories, popularNews, popularTagsData] = await Promise.all([
      getNewsDetail(slug),
      getCategories(),
      getPopularNews(),
      Promise.resolve(getPopularTags(15)),
    ]);

    // OGP専用の画像パスを生成（記事表示には影響しない）
    const ogImagePath = getOGPImagePathWithFallback(slug);

    return {
      props: {
        newsDetail,
        categories,
        popularNews,
        popularTags: popularTagsData,
        ogImagePath, // OGP専用画像パス
      },
      revalidate: 3600,
    };
  } catch (error) {
    console.error('Error fetching news detail:', error);
    
    return {
      notFound: true,
    };
  }
};

export default NewsDetailPage;
