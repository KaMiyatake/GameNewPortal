// pages/index.tsx - HeroSliderに人気記事を渡すように修正
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import HeroSlider from '../components/HeroSlider';
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
import { getPopularTags } from '../data/utils/data-helpers';
import { NewsItem, Category } from '../types';
import styles from '../styles/Home.module.css';

interface HomeProps {
  initialNewsData: PaginatedResponse<NewsItem>;
  featuredNews: NewsItem[];
  popularNews: NewsItem[];
  categories: Category[];
  currentPage: number;
  popularTags: { tag: string; count: number }[];
}

const Home: React.FC<HomeProps> = ({
  initialNewsData,
  featuredNews,
  popularNews,
  categories,
  currentPage,
  popularTags
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
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
        {/* HeroSliderに人気記事を渡す（見た目は従来のまま） */}
        <HeroSlider featuredNews={popularNews} />
        
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
                popularTags={popularTags}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

// getServerSideProps は変更なし
export const getServerSideProps: GetServerSideProps<HomeProps> = async ({ query }) => {
  try {
    const page = parseInt(query.page as string) || 1;
    const limit = 10;

    const [newsData, categoriesData, popularNewsData, featuredNewsData, popularTagsData] = await Promise.all([
      getLatestNewsPaginated(page, limit),
      getCategories(),
      getPopularNews(), // これが人気記事Top10を返す
      getFeaturedNews(),
      Promise.resolve(getPopularTags(15)),
    ]);

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
        popularTags: popularTagsData,
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
