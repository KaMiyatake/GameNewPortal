import { GetServerSideProps } from 'next';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import SEOHead from '../../components/SEO/SEOHead';
import { getNewsByTagPaginated, getCategories, getPopularNews, PaginatedResponse } from '../../utils/api';
import { getPopularTags } from '../../data/utils/data-helpers'; // getPopularTags追加
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Tag.module.css';

interface TagPageProps {
  newsData: PaginatedResponse<NewsItem>;
  categories: Category[];
  popularNews: NewsItem[];
  popularTags: { tag: string; count: number }[]; // 追加
  currentTag: string;
  currentPage: number;
}

const TagPage: React.FC<TagPageProps> = ({
  newsData,
  categories,
  popularNews,
  popularTags, // 追加
  currentTag,
  currentPage
}) => {
  const router = useRouter();

  const handlePageChange = (page: number) => {
    router.push({
      pathname: `/tag/${encodeURIComponent(currentTag)}`,
      query: page > 1 ? { page: page.toString() } : {},
    });
  };
  return (
    <>
      <SEOHead
        title={`${currentTag}の記事一覧 | ゲーム賛否${currentPage > 1 ? ` | ページ ${currentPage}` : ''}`}
        description={`「${currentTag}」に関連するゲーム記事の一覧です。賛否両論の視点で最新ゲーム情報をお届けします。`}
        keywords={[currentTag, 'ゲーム賛否', 'ゲームレビュー', '賛否両論', '最新ゲーム']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/tag/${encodeURIComponent(currentTag)}${currentPage > 1 ? `?page=${currentPage}` : ''}`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.breadcrumbs}>
            <Link href="/">
              <span>ホーム</span>
            </Link>
            <span className={styles.separator}>&gt;</span>
            <span className={styles.current}>タグ: {currentTag}</span>
          </div>
          
          <div className={styles.tagHeader}>
            <h1 className={styles.tagTitle}>
              <span className={styles.tagIcon}>#</span>
              {currentTag}
            </h1>
            <p className={styles.tagDescription}>
              「{currentTag}」に関連する記事 {newsData.pagination.totalItems}件
            </p>
          </div>
          
          <div className={styles.tagLayout}>
            <div className={styles.mainContent}>
              {newsData.data.length > 0 ? (
                <NewsSection
                  title={`「${currentTag}」の記事一覧${currentPage > 1 ? ` (${currentPage}ページ目)` : ''}`}
                  newsItems={newsData.data}
                  layout="list"
                  showPagination={true}
                  currentPage={newsData.pagination.currentPage}
                  totalPages={newsData.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className={styles.noResults}>
                  <h2>該当する記事が見つかりませんでした</h2>
                  <p>「{currentTag}」に関連する記事は現在ありません。</p>
                  <Link href="/">
                    <span className={styles.backToHome}>ホームに戻る</span>
                  </Link>
                </div>
              )}
            </div>
            <div className={styles.sidebarContent}>
              <Sidebar 
                popularNews={popularNews} 
                categories={categories}
                popularTags={popularTags} // 追加
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps<TagPageProps> = async ({ params, query }) => {
  try {
    const tag = decodeURIComponent(params?.tag as string);
    const page = parseInt(query.page as string) || 1;
    const limit = 10;

    const [newsData, categories, popularNews, popularTags] = await Promise.all([
      getNewsByTagPaginated(tag, page, limit),
      getCategories(),
      getPopularNews(),
      Promise.resolve(getPopularTags(15)),
    ]);

    if (page < 1 || page > newsData.pagination.totalPages) {
      return { notFound: true };
    }

    return {
      props: {
        newsData,
        categories,
        popularNews,
        popularTags,
        currentTag: tag,
        currentPage: page,
      },
    };
  } catch (error) {
    console.error('Error fetching tag data:', error);
    return { notFound: true };
  }
};

export default TagPage;
