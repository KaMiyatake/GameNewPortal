// src/pages/news/[slug].tsx (最終確実版)
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
import { NewsItemDetail, Category, NewsItem } from '../../types';
import styles from '../../styles/NewsDetail.module.css';

interface NewsDetailPageProps {
  newsDetail: NewsItemDetail;
  categories: Category[];
  popularNews: NewsItem[];
  popularTags: { tag: string; count: number }[];
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  newsDetail,
  categories,
  popularNews,
  popularTags
}) => {
  const primaryCategory = newsDetail.categories && newsDetail.categories.length > 0 
    ? newsDetail.categories[0] 
    : null;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://gamesanpi.com';
  const articleUrl = `${baseUrl}/news/${newsDetail.slug}`;
  
  // OG画像URL生成（より確実な方法）
  const getOgImageUrl = () => {
    if (!newsDetail.imageUrl) {
      return `${baseUrl}/og-image.png`;
    }
    
    // 既に絶対URLの場合
    if (newsDetail.imageUrl.startsWith('http')) {
      return newsDetail.imageUrl;
    }
    
    // 相対URLの場合
    const cleanPath = newsDetail.imageUrl.startsWith('/') ? newsDetail.imageUrl : `/${newsDetail.imageUrl}`;
    return `${baseUrl}${cleanPath}`;
  };

  const ogImageUrl = getOgImageUrl();

  return (
    <>
      <SEOHead
        title={newsDetail.title}
        description={newsDetail.summary}
        keywords={[...newsDetail.tags, ...newsDetail.categories, 'ゲーム賛否', 'ゲームレビュー', '賛否両論']}
        ogImage={ogImageUrl}
        ogType="article"
        twitterCard="summary_large_image"
        articlePublishedTime={new Date(newsDetail.date).toISOString()}
        articleModifiedTime={new Date(newsDetail.date).toISOString()}
        articleAuthor={newsDetail.author}
        articleSection={primaryCategory || undefined}
        articleTags={newsDetail.tags}
        canonicalUrl={articleUrl}
      />
      
      <Layout>
        <div className={styles.container}>
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
                
                <div className={styles.newsInfo}>
                  <span className={styles.newsDate}>{newsDetail.date}</span>
                  <span className={styles.newsAuthor}>by {newsDetail.author}</span>
                  
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

    return {
      props: {
        newsDetail,
        categories,
        popularNews,
        popularTags: popularTagsData,
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
