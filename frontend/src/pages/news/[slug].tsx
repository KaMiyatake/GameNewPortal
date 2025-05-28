import { GetStaticProps, GetStaticPaths } from 'next';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import RelatedNews from '../../components/NewsDetail/RelatedNews';
import NewsContent from '../../components/NewsDetail/NewsContent';
import Sidebar from '../../components/Sidebar/Sidebar';
import SEOHead from '../../components/SEO/SEOHead';
import { getNewsDetail, getCategories, getPopularNews } from '../../utils/api';
import { allArticles } from '../../data/articles';
import { getCategoryUrl } from '../../utils/category-utils';
import { NewsItemDetail, Category, NewsItem } from '../../types';
import styles from '../../styles/NewsDetail.module.css';

interface NewsDetailPageProps {
  newsDetail: NewsItemDetail;
  categories: Category[];
  popularNews: NewsItem[];
}

const NewsDetailPage: React.FC<NewsDetailPageProps> = ({
  newsDetail,
  categories,
  popularNews
}) => {
  return (
    <>
      <SEOHead
        title={`${newsDetail.title} | ゲーム賛否`}
        description={newsDetail.summary}
        keywords={[...newsDetail.tags, 'ゲーム賛否', 'ゲームレビュー', '賛否両論']}
        ogImage={newsDetail.imageUrl}
        ogType="article"
        publishedTime={newsDetail.date}
        author={newsDetail.author}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/news/${newsDetail.slug}`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/" passHref>
              <span>ホーム</span>
            </Link>
            <span className={styles.separator}>&gt;</span>
            <Link href={getCategoryUrl(newsDetail.category)} passHref>
              <span>{newsDetail.category}</span>
            </Link>
            <span className={styles.separator}>&gt;</span>
            <span className={styles.current}>{newsDetail.title}</span>
          </div>

          <div className={styles.newsDetailLayout}>
            <div className={styles.mainContent}>
              <div className={styles.articleHeader}>
                <h1 className={styles.newsTitle}>{newsDetail.title}</h1>
                <div className={styles.newsInfo}>
                  <span className={styles.newsDate}>{newsDetail.date}</span>
                  <span className={styles.newsAuthor}>by {newsDetail.author}</span>
                  <Link href={getCategoryUrl(newsDetail.category)} passHref>
                    <span className={styles.newsCategory}>{newsDetail.category}</span>
                  </Link>
                </div>
              </div>

              <div className={styles.featuredImage}>
                <img src={newsDetail.imageUrl} alt={newsDetail.title} />
              </div>

              <NewsContent content={newsDetail.content} />

              <div className={styles.tagContainer}>
                {newsDetail.tags.map((tag, index) => (
                  <Link key={index} href={`/tag/${encodeURIComponent(tag)}`} passHref>
                    <span className={styles.tag}>#{tag}</span>
                  </Link>
                ))}
              </div>
              
              <div className={styles.relatedNewsSection}>
                <RelatedNews news={newsDetail.relatedNews} />
              </div>
            </div>
            
            <div className={styles.sidebar}>
              <Sidebar popularNews={popularNews} categories={categories} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

// SSG: 全記事のパスを事前生成
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allArticles.map((article) => ({
    params: { slug: article.slug },
  }));

  return {
    paths,
    fallback: 'blocking', // 新しい記事は動的に生成
  };
};

// SSG: ビルド時に各記事のデータを取得
export const getStaticProps: GetStaticProps<NewsDetailPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    const [newsDetail, categories, popularNews] = await Promise.all([
      getNewsDetail(slug),
      getCategories(),
      getPopularNews(),
    ]);

    return {
      props: {
        newsDetail,
        categories,
        popularNews,
      },
      revalidate: 3600, // 1時間ごとに再生成
    };
  } catch (error) {
    console.error('Error fetching news detail:', error);
    
    return {
      notFound: true,
    };
  }
};

export default NewsDetailPage;
