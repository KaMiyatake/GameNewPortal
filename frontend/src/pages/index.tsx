import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import NewsSection from '../components/NewsSection/NewsSection';
import { getLatestNews, getCategories } from '../utils/api';
import { NewsItem, Category } from '../types';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, categoriesData] = await Promise.all([
          getLatestNews(),
          getCategories(),
        ]);
        setLatestNews(newsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
      <div className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>最新ゲームニュース</h1>
          <p className={styles.heroSubtitle}>
            ゲーム業界の最新情報、レビュー、発売情報をお届けします
          </p>
        </div>
      </div>
      <NewsSection title="最新ニュース" newsItems={latestNews} />
    </Layout>
  );
};

export default Home;
