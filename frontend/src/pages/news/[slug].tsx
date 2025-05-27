import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import RelatedNews from '../../components/NewsDetail/RelatedNews';
import NewsContent from '../../components/NewsDetail/NewsContent';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getNewsDetail, getCategories, getPopularNews } from '../../utils/api';
import { getCategoryUrl } from '../../utils/category-utils';
import { NewsItemDetail, Category, NewsItem } from '../../types';
import styles from '../../styles/NewsDetail.module.css';

const NewsDetailPage: React.FC = () => {
  const router = useRouter();
  const { slug } = router.query;
  
  const [newsDetail, setNewsDetail] = useState<NewsItemDetail | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [popularNews, setPopularNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) return;
      
      try {
        setLoading(true);
        const [newsData, categoriesData, popularNewsData] = await Promise.all([
          getNewsDetail(slug as string),
          getCategories(),
          getPopularNews(),
        ]);
        
        setNewsDetail(newsData);
        setCategories(categoriesData);
        setPopularNews(popularNewsData);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (!newsDetail) {
    return (
      <Layout>
        <div className={styles.errorContainer}>
          <h1>記事が見つかりませんでした</h1>
          <p>お探しの記事は存在しないか、削除された可能性があります。</p>
          <Link href="/" passHref>
            <span className={styles.backButton}>ホームに戻る</span>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
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
  );
};

export default NewsDetailPage;
