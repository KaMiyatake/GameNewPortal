import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import { getNewsByCategory, getCategories, getPopularNews } from '../../utils/api';
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Category.module.css';
import { GetStaticProps, GetStaticPaths } from 'next';
import { categories } from '../../data/categories/categories';

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
          getNewsByCategory(slug as string),
          getCategories(),
          getPopularNews(),
        ]);
        
        const category = categoriesData.find(cat => cat.slug === slug);
        if (category) {
          setCurrentCategory(category.name);
        }
        
        setNews(newsData);
        setCategories(categoriesData);
        setPopularNews(popularNewsData);
      } catch (error) {
        console.error('Error fetching category data:', error);
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

  return (
    <Layout>
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
            {news.length > 0 ? (
              <NewsSection
                title={`${currentCategory || 'カテゴリー'}の記事一覧`}
                newsItems={news}
                layout="list"
              />
            ) : (
              <div className={styles.noResults}>
                <h2>該当する記事が見つかりませんでした</h2>
                <p>「{currentCategory}」カテゴリーの記事は現在ありません。</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = categories.map((category) => ({
    params: { slug: category.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    const [news, categoriesData, popularNews] = await Promise.all([
      getNewsByCategory(slug),
      getCategories(),
      getPopularNews(),
    ]);

    const currentCategory = categoriesData.find(cat => cat.slug === slug);

    return {
      props: {
        news,
        categories: categoriesData,
        popularNews,
        currentCategory: currentCategory?.name || '',
      },
      revalidate: 300, // 5分ごとに再生成
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export default CategoryPage;
