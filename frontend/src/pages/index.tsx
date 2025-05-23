import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import NewsSection from '../components/NewsSection/NewsSection';
import Sidebar from '../components/Sidebar/Sidebar';
import { getLatestNews, getCategories, getPopularNews, getFeaturedNews } from '../utils/api';
import { NewsItem, Category } from '../types';
import styles from '../styles/Home.module.css';

const Home: React.FC = () => {
  const [latestNews, setLatestNews] = useState<NewsItem[]>([]);
  const [featuredNews, setFeaturedNews] = useState<NewsItem[]>([]);
  const [popularNews, setPopularNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [newsData, categoriesData, popularNewsData, featuredNewsData] = await Promise.all([
          getLatestNews(),
          getCategories(),
          getPopularNews(),
          getFeaturedNews(),
        ]);
        setLatestNews(newsData);
        setCategories(categoriesData);
        setPopularNews(popularNewsData);
        setFeaturedNews(featuredNewsData);
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
      {/* 元のheroセクションをHeroSliderに置き換え */}
      <HeroSlider featuredNews={featuredNews} />
      
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <div className={styles.newsContent}>
            <NewsSection title="最新ニュース" newsItems={latestNews} />
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
