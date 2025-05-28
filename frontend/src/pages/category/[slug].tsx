import React from 'react';
import { GetServerSideProps } from 'next';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import SEOHead from '../../components/SEO/SEOHead';
import { getNewsByCategory, getCategories, getPopularNews } from '../../utils/api';
import { categories } from '../../data/categories/categories';
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Category.module.css';

interface CategoryPageProps {
  newsItems: NewsItem[];
  category: {
    name: string;
    slug: string;
    description: string;
    color?: string;
  };
  categories: Category[];
  popularNews: NewsItem[];
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  newsItems,
  category,
  categories,
  popularNews
}) => {
  return (
    <>
      <SEOHead
        title={`${category.name} | ゲーム賛否`}
        description={category.description}
        keywords={[category.name, 'ゲーム賛否', 'ゲームレビュー', '賛否両論']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/category/${category.slug}`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.categoryHeader}>
            <h1 
              className={styles.categoryTitle}
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              {category.name}
            </h1>
            <p className={styles.categoryDescription}>{category.description}</p>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.newsContent}>
              <NewsSection 
                title={`${category.name}の記事`}
                newsItems={newsItems}
                layout="list"
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

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    
    const categoryData = categories.find(cat => cat.slug === slug);
    if (!categoryData) {
      return { notFound: true };
    }

    const [newsItems, categoriesData, popularNewsData] = await Promise.all([
      getNewsByCategory(slug),
      getCategories(),
      getPopularNews(),
    ]);

    return {
      props: {
        newsItems,
        category: {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          color: categoryData.color,
        },
        categories: categoriesData,
        popularNews: popularNewsData,
      },
    };
  } catch (error) {
    console.error('Error fetching category page data:', error);
    return { notFound: true };
  }
};

export default CategoryPage;
