import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getCategories, getPopularNews, getNewsByTag } from '../../utils/api';
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Tag.module.css';

const TagPage: React.FC = () => {
  const router = useRouter();
  const { tag } = router.query;
  
  const [news, setNews] = useState<NewsItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularNews, setPopularNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!tag) return;
      
      try {
        setLoading(true);
        const [newsData, categoriesData, popularNewsData] = await Promise.all([
          getNewsByTag(tag as string),
          getCategories(),
          getPopularNews(),
        ]);
        
        setNews(newsData);
        setCategories(categoriesData);
        setPopularNews(popularNewsData);
      } catch (error) {
        console.error('Error fetching tag data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tag]);

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
          <span className={styles.current}>タグ: {tag}</span>
        </div>
        
        <div className={styles.tagHeader}>
          <h1 className={styles.tagTitle}>
            <span className={styles.tagIcon}>#</span>
            {tag}
          </h1>
          <p className={styles.tagDescription}>
            「{tag}」に関連する記事 {news.length}件
          </p>
        </div>
        
        <div className={styles.tagLayout}>
          <div className={styles.mainContent}>
            {news.length > 0 ? (
              <NewsSection 
                title={`「${tag}」の記事一覧`}
                newsItems={news}
                layout="list" // リストレイアウトを指定
              />
            ) : (
              <div className={styles.noResults}>
                <h2>該当する記事が見つかりませんでした</h2>
                <p>「{tag}」に関連する記事は現在ありません。</p>
                <Link href="/" passHref>
                  <span className={styles.backToHome}>ホームに戻る</span>
                </Link>
              </div>
            )}
          </div>
          <div className={styles.sidebarContent}>
            <Sidebar popularNews={popularNews} categories={categories} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TagPage;
