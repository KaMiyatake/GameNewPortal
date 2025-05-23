import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getLatestNews, getCategories, getPopularNews } from '../../utils/api';
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Category.module.css';

const CategoryPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularNews, setPopularNews] = useState<NewsItem[]>([]);
  const [currentCategory, setCurrentCategory] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const [newsData, categoriesData, popularNewsData] = await Promise.all([
          getLatestNews(),
          getCategories(),
          getPopularNews(),
        ]);
        
        // カテゴリ名を取得
        const category = categoriesData.find(cat => cat.slug === slug);
        if (category) {
          setCurrentCategory(category.name);
        }
        
        // カテゴリに一致する記事をフィルタリング
        const filteredNews = newsData.filter(
          item => item.category.toLowerCase() === currentCategory.toLowerCase()
        );
        
        setNews(filteredNews.length > 0 ? filteredNews : newsData);
        setCategories(categoriesData);
        setPopularNews(popularNewsData);
      } catch (error) {
        console.error('Error fetching category data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, currentCategory]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Layout categories={categories}>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link href="/" passHref>
            <span>ホーム</span>
          </Link>
          <span className={styles.separator}>&gt;</span>
          <span className={styles.current}>{currentCategory || 'カテゴリー'}</span>
        </div>
        
        <h1 className={styles.categoryTitle}>{currentCategory || 'すべての記事'}</h1>
        
        <div className={styles.categoryLayout}>
          <div className={styles.mainContent}>
            <NewsSection
              title={`${currentCategory || 'カテゴリー'}の最新記事`}
              newsItems={news}
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

export default CategoryPage;
