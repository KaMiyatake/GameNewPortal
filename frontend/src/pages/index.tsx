import { GetStaticProps } from 'next';
import Layout from '../components/Layout/Layout';
//import HeroSlider from '../components/HeroSlider/HeroSlider';
import HeroSlider from '../components/HeroSlider'; // index.tsxを自動的に読み込む
import NewsSection from '../components/NewsSection/NewsSection';
import Sidebar from '../components/Sidebar/Sidebar';
import SEOHead from '../components/SEO/SEOHead';
import { 
  getLatestNewsPaginated, 
  getCategories, 
  getPopularNews, 
  getFeaturedNews,
  PaginatedResponse
} from '../utils/api';
import { NewsItem, Category } from '../types';
import styles from '../styles/Home.module.css';

interface HomeProps {
  initialNewsData: PaginatedResponse<NewsItem>;
  featuredNews: NewsItem[];
  popularNews: NewsItem[];
  categories: Category[];
}

const Home: React.FC<HomeProps> = ({
  initialNewsData,
  featuredNews,
  popularNews,
  categories
}) => {
  return (
    <>
      <SEOHead
        title="Game News Portal - 最新ゲーム情報をお届け"
        description="ゲーム業界の最新情報、レビュー、発売情報をお届けするニュースポータルサイトです。"
        keywords={['ゲーム', 'ニュース', 'ゲーム情報', 'レビュー']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}`}
      />
      <Layout>
        <HeroSlider featuredNews={featuredNews} />
        
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <div className={styles.newsContent}>
              <NewsSection 
                title="最新ニュース" 
                newsItems={initialNewsData.data}
                layout="list"
                showPagination={true}
                currentPage={initialNewsData.pagination.currentPage}
                totalPages={initialNewsData.pagination.totalPages}
                onPageChange={(page) => {
                  // クライアントサイドでのページ変更
                  window.location.href = page > 1 ? `/?page=${page}` : '/';
                }}
              />
            </div>
            <div className={styles.sidebarContent}>
              <Sidebar popularNews={popularNews} categories={categories} />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

// SSG: ビルド時にデータを取得してHTMLを生成
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  try {
    const [newsData, categoriesData, popularNewsData, featuredNewsData] = await Promise.all([
      getLatestNewsPaginated(1, 10),
      getCategories(),
      getPopularNews(),
      getFeaturedNews(),
    ]);

    return {
      props: {
        initialNewsData: newsData,
        featuredNews: featuredNewsData,
        popularNews: popularNewsData,
        categories: categoriesData,
      },
      // 60秒ごとに再生成（ISR: Incremental Static Regeneration）
      revalidate: 60,
    };
  } catch (error) {
    console.error('Error fetching data for home page:', error);
    
    return {
      notFound: true,
    };
  }
};

export default Home;
