// src/pages/search.tsx
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Layout from '../components/Layout/Layout';
import NewsSection from '../components/NewsSection/NewsSection';
import Sidebar from '../components/Sidebar/Sidebar';
import SEOHead from '../components/SEO/SEOHead';
import { searchArticlesPaginated, addSearchTerm } from '../utils/search-utils';
import { getCategories, getPopularNews } from '../utils/api';
import { getPopularTags } from '../data/utils/data-helpers';
import { NewsItem, Category } from '../types';
import { useEffect } from 'react';
import styles from '../styles/Search.module.css';

interface SearchPageProps {
  searchResults: {
    data: NewsItem[];
    pagination: {
      currentPage: number;
      totalPages: number;
      totalItems: number;
      itemsPerPage: number;
    };
    query: string;
  };
  categories: Category[];
  popularNews: NewsItem[];
  popularTags: { tag: string; count: number }[];
}

const SearchPage: React.FC<SearchPageProps> = ({
  searchResults,
  categories,
  popularNews,
  popularTags
}) => {
  const router = useRouter();
  const { q: query, page } = router.query;

  // 検索履歴に追加
  useEffect(() => {
    if (typeof query === 'string' && query.trim()) {
      addSearchTerm(query.trim());
    }
  }, [query]);

  const handlePageChange = (newPage: number) => {
    router.push({
      pathname: '/search',
      query: {
        q: query,
        ...(newPage > 1 && { page: newPage.toString() })
      }
    });
  };

  const handleNewSearch = (searchQuery: string) => {
    router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  const currentPage = searchResults.pagination.currentPage;
  const totalItems = searchResults.pagination.totalItems;
  const searchQuery = searchResults.query;

  return (
    <>
      <SEOHead
        title={`"${searchQuery}" の検索結果 - ゲーム賛否${currentPage > 1 ? ` | ページ ${currentPage}` : ''}`}
        description={`「${searchQuery}」に関するゲームニュース・レビューの検索結果。${totalItems}件の記事が見つかりました。`}
        keywords={['ゲーム検索', searchQuery, 'ゲームニュース', 'ゲームレビュー']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/search?q=${encodeURIComponent(searchQuery)}${currentPage > 1 ? `&page=${currentPage}` : ''}`}
      />
      <Layout>
        <div className={styles.container}>
          <div className={styles.searchHeader}>
            <h1 className={styles.searchTitle}>
              「<span className={styles.searchQuery}>{searchQuery}</span>」の検索結果
            </h1>
            <p className={styles.searchCount}>
              {totalItems > 0 ? (
                <>
                  <strong>{totalItems.toLocaleString()}</strong>件の記事が見つかりました
                  {currentPage > 1 && (
                    <span className={styles.pageInfo}>
                      {' '}(ページ {currentPage}/{searchResults.pagination.totalPages})
                    </span>
                  )}
                </>
              ) : (
                '該当する記事が見つかりませんでした'
              )}
            </p>
          </div>

          <div className={styles.mainContent}>
            <div className={styles.newsContent}>
              {totalItems > 0 ? (
                <NewsSection
                  title=""
                  newsItems={searchResults.data}
                  layout="list"
                  showPagination={true}
                  currentPage={currentPage}
                  totalPages={searchResults.pagination.totalPages}
                  onPageChange={handlePageChange}
                />
              ) : (
                <div className={styles.noResults}>
                  <div className={styles.noResultsIcon}>🔍</div>
                  <h2>検索結果が見つかりませんでした</h2>
                  <p>以下をお試しください：</p>
                  <ul className={styles.suggestions}>
                    <li>キーワードのスペルを確認してください</li>
                    <li>より一般的なキーワードで検索してみてください</li>
                    <li>単語を減らして検索してみてください</li>
                    <li>同義語や関連語を試してみてください</li>
                  </ul>
                  
                  <div className={styles.popularSearches}>
                    <h3>人気の検索ワード</h3>
                    <div className={styles.searchTags}>
                      {popularTags.slice(0, 8).map(({ tag }) => (
                        <button
                          key={tag}
                          className={styles.searchTag}
                          onClick={() => handleNewSearch(tag)}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
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

export const getServerSideProps: GetServerSideProps<SearchPageProps> = async ({ query }) => {
  try {
    const searchQuery = (query.q as string) || '';
    const page = parseInt((query.page as string) || '1', 10);
    
    if (!searchQuery.trim()) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    const [searchResults, categoriesData, popularNewsData, popularTagsData] = await Promise.all([
      Promise.resolve(searchArticlesPaginated(searchQuery, page, 10, { includeContent: false })),
      getCategories(),
      getPopularNews(),
      Promise.resolve(getPopularTags(15)),
    ]);

    // ページ番号が範囲外の場合
    if (page < 1 || (searchResults.pagination.totalPages > 0 && page > searchResults.pagination.totalPages)) {
      return {
        notFound: true,
      };
    }

    // 検索結果をNewsItem形式に変換
    const convertedResults = {
      ...searchResults,
      data: searchResults.data.map(article => ({
        id: article.id,
        title: article.title,
        summary: article.summary,
        imageUrl: article.imageUrl,
        categories: article.categories || [],
        date: article.publishedAt,
        slug: article.slug,
      }))
    };

    return {
      props: {
        searchResults: convertedResults,
        categories: categoriesData,
        popularNews: popularNewsData,
        popularTags: popularTagsData,
      },
    };
  } catch (error) {
    console.error('検索ページのデータ取得エラー:', error);
    
    return {
      notFound: true,
    };
  }
};

export default SearchPage;
