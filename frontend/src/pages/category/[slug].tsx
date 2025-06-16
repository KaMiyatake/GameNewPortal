import React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import SEOHead from '../../components/SEO/SEOHead';
import { getPopularTags } from '../../data/utils/data-helpers';
import { getNewsByCategoryPaginated, getCategories, getPopularNews, PaginatedResponse } from '../../utils/api';
import { categories } from '../../data/categories/categories';
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Category.module.css';

interface CategoryPageProps {
  newsData: PaginatedResponse<NewsItem>;
  category: {
    name: string;
    slug: string;
    description: string;
    color?: string;
  };
  categories: Category[];
  popularNews: NewsItem[];
  popularTags: { tag: string; count: number }[];
  currentPage: number;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  newsData,
  category,
  categories,
  popularNews,
  popularTags,
  currentPage
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push({
      pathname: `/category/${category.slug}`,
      query: page > 1 ? { page: page.toString() } : {},
    });
  };

  // 記事がない場合のメッセージコンポーネント
  const NoArticlesMessage = () => (
    <div className={styles.noArticles}>
      <div className={styles.noArticlesIcon}>📰</div>
      <h2 className={styles.noArticlesTitle}>記事がありません</h2>
      <p className={styles.noArticlesDescription}>
        「{category.name}」カテゴリの記事はまだ投稿されていません。<br />
        他のカテゴリをご覧になるか、しばらく経ってから再度お訪ねください。
      </p>
      <div className={styles.noArticlesActions}>
        <button
          onClick={() => router.push('/')}
          className={styles.backHomeButton}
        >
          🏠 ホームに戻る
        </button>
        <button
          onClick={() => router.back()}
          className={styles.backButton}
        >
          ← 前のページに戻る
        </button>
      </div>
    </div>
  );

  return (
    <>
      <SEOHead
        title={`${category.name} | ゲーム賛否${currentPage > 1 ? ` | ページ ${currentPage}` : ''}`}
        description={category.description}
        keywords={[category.name, 'ゲーム賛否', 'ゲームレビュー', '賛否両論']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/category/${category.slug}${currentPage > 1 ? `?page=${currentPage}` : ''}`}
      />
      <Layout>
        <div className={styles.container}>
          {/* カテゴリーヘッダー */}
          <div className={styles.categoryHeader}>
            <h1 
              className={styles.categoryTitle}
              style={{ '--category-color': category.color } as React.CSSProperties}
            >
              <span className={styles.categoryIcon}>
                {getCategoryIcon(category.slug)}
              </span>
              {category.name}
            </h1>
            <p className={styles.categoryDescription}>
              「{category.name}」に関連する記事 {newsData.pagination.totalItems}件
              {newsData.pagination.totalItems === 0 && (
                <span className={styles.noArticlesBadge}>記事なし</span>
              )}
            </p>
          </div>

          {/* メインコンテンツ */}
          <div className={styles.mainContent}>
            <div className={styles.newsContent}>
              {newsData.data.length > 0 ? (
                <NewsSection
                  title={`${category.name}の記事${currentPage > 1 ? ` (${currentPage}ページ目)` : ''}`}
                  newsItems={newsData.data}
                  layout="list"
                  showPagination={true}
                  currentPage={newsData.pagination.currentPage}
                  totalPages={newsData.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <NoArticlesMessage />
              )}
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

export const getServerSideProps: GetServerSideProps<CategoryPageProps> = async ({ params, query }) => {
  try {
    const slug = params?.slug as string;
    const page = parseInt(query.page as string) || 1;
    const limit = 10;
    
    // カテゴリが存在するかチェック
    const categoryData = categories.find(cat => cat.slug === slug);
    if (!categoryData) {
      return { notFound: true };
    }

    // データを並列取得
    const [newsData, categoriesData, popularNewsData, popularTagsData] = await Promise.all([
      getNewsByCategoryPaginated(slug, page, limit),
      getCategories(),
      getPopularNews(),
      Promise.resolve(getPopularTags(15)),
    ]);

    // 記事がない場合の処理を修正
    // 記事が0件の場合、totalPagesは0になるが、page 1は有効とする
    if (newsData.pagination.totalItems > 0 && (page < 1 || page > newsData.pagination.totalPages)) {
      return { notFound: true };
    }

    // 記事が0件で2ページ目以降にアクセスした場合は404
    if (newsData.pagination.totalItems === 0 && page > 1) {
      return { notFound: true };
    }

    return {
      props: {
        newsData,
        category: {
          name: categoryData.name,
          slug: categoryData.slug,
          description: categoryData.description,
          color: categoryData.color,
        },
        categories: categoriesData,
        popularNews: popularNewsData,
        popularTags: popularTagsData,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error('Error fetching category page data:', error);
    return { notFound: true };
  }
};

// カテゴリーアイコンを取得する関数
const getCategoryIcon = (slug: string): string => {
  const icons: { [key: string]: string } = {
    'playstation': '🎮',
    'switch': '🕹️',
    'pc': '💻',
    'mobile': '📱',
    'xbox': '🎯',
    'pros-cons': '⚖️',
    'vr': '🥽',
    'entertainment': '🎭',
    'industry': '📰'
  };
  return icons[slug] || '🎯';
};

export default CategoryPage;
