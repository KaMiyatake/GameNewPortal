import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import NewsSection from '../components/NewsSection/NewsSection';
import Sidebar from '../components/Sidebar/Sidebar';
import { 
  getLatestNewsPaginated, 
  getCategories, 
  getPopularNews, 
  getFeaturedNews,
  PaginatedResponse 
} from '../utils/api';
import { NewsItem, Category } from '../types';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const router = useRouter();
  const [newsData, setNewsData] = useState<PaginatedResponse<NewsItem> | null>(null);
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [popularNews, setPopularNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // URLクエリからページ番号を取得
  const currentPage = parseInt(router.query.page as string) || 1;

  const fetchNews = async (page: number) => {
    setLoading(true);
    try {
      const [newsResponse, categoriesData, popularNewsData, featuredNewsData] = await Promise.all([
        getLatestNewsPaginated(page, 10), // 1ページあたり10記事
        getCategories(),
        getPopularNews(),
        getFeaturedNews(),
      ]);
      
      setNewsData(newsResponse);
      setCategories(categoriesData);
      setPopularNews(popularNewsData);
      setFeaturedNews(featuredNewsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    // URLを更新してページ変更
    router.push({
      pathname: '/',
      query: page > 1 ? { page } : {},
    }, undefined, { shallow: true });
  };

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!newsData) {
    return <div>エラーが発生しました。</div>;
  }

  return (
    <Layout categories={categories}>
      <HeroSlider featuredNews={featuredNews} />
      
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.newsContent}>
            <NewsSection 
              title="最新ニュース" 
              newsItems={newsData.data}
              layout="list"
              showPagination={true}
              currentPage={newsData.pagination.currentPage}
              totalPages={newsData.pagination.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
          <div className={styles.sidebarContent}>
            <Sidebar popularNews={popularNews} categories={categories} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
