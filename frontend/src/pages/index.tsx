// pages/index.tsx - 修正版（HeroSlider常時表示対応）
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import HeroSlider from '../components/HeroSlider';
import NewsSection from '../components/NewsSection/NewsSection';
import Sidebar from '../components/Sidebar/Sidebar';
import SideAd from '../components/Ads/SideAd';
import SEOHead from '../components/SEO/SEOHead';
import { 
  getLatestNewsPaginated, 
  getCategories, 
  getPopularNews, 
  getFeaturedNews,
  PaginatedResponse
} from '../utils/api';
import { getPopularTags } from '../data/utils/data-helpers'; // 追加
import { NewsItem, Category } from '../types';
import styles from '../styles/Home.module.css';

interface HomeProps {
  initialNewsData: PaginatedResponse<NewsItem>;
  featuredNews: NewsItem[];
  popularNews: NewsItem[];
  categories: Category[];
  currentPage: number;
  popularTags: { tag: string; count: number }[]; // 追加
}

const Home: React.FC<HomeProps> = ({
  initialNewsData,
  featuredNews,
  popularNews,
  categories,
  currentPage,
  popularTags // 追加
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    // Next.js routerを使用してクエリパラメータ付きで遷移
    router.push({
      pathname: '/',
      query: page > 1 ? { page: page.toString() } : {}
    });
  };

  return (
    <>
      <SEOHead
        title={`ゲーム賛否 - 賛否両論で読む最新ゲームニュース＆レビュー${currentPage > 1 ? ` | ページ ${currentPage}` : ''}`}
        description='「ゲーム賛否」は最新ゲーム・エンタメ情報を"賛"と"否"の視点で深掘りするメディアです。速報ニュースから、データ分析コラムまで、買う前に知りたい核心をお届けします。'
        keywords={['ゲーム賛否', 'ゲームレビュー', '賛否両論', '最新ゲーム', 'PS5', 'Xbox', 'Nintendo Switch', 'PCゲーム', 'メタスコア', 'eスポーツ', 'ゲームニュース']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}${currentPage > 1 ? `?page=${currentPage}` : ''}`}
      />
      <Layout>
        <SideAd position="left" />
        <SideAd position="right" />
        {/* HeroSliderを全ページで表示 */}
        <HeroSlider featuredNews={featuredNews} />
        
        <div className={styles.container}>
          <div className={styles.mainContent}>
            <div className={styles.newsContent}>
              <NewsSection 
                title={`最新ニュース${currentPage > 1 ? ` (${currentPage}ページ目)` : ''}`}
                newsItems={initialNewsData.data}
                layout="list"
                showPagination={true}
                currentPage={initialNewsData.pagination.currentPage}
                totalPages={initialNewsData.pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            <div className={styles.sidebarContent}>
              <Sidebar 
              popularNews={popularNews} 
              categories={categories}
              popularTags={popularTags} // 追加
               />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

// SSR: リクエスト時にクエリパラメータを処理
export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  try {
    const page = parseInt(query.page as string) || 1;
    const limit = 10;

    const [newsData, categoriesData, popularNewsData, featuredNewsData, popularTagsData] = await Promise.all([
      getLatestNewsPaginated(page, limit),
      getCategories(),
      getPopularNews(),
      getFeaturedNews(),
      Promise.resolve(getPopularTags(15)), // 人気タグ15個を取得
    ]);

    // ページ番号が範囲外の場合は404
    if (page < 1 || page > newsData.pagination.totalPages) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        initialNewsData: newsData,
        featuredNews: featuredNewsData,
        popularNews: popularNewsData,
        categories: categoriesData,
        currentPage: page,
        popularTags: popularTagsData, // 追加
      },
    };
  } catch (error) {
    console.error('Error fetching data for home page:', error);
    
    return {
      notFound: true,
    };
  }
};

export default Home;
