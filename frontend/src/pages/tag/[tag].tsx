import { GetStaticProps, GetStaticPaths } from 'next';
import React from 'react';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import NewsSection from '../../components/NewsSection/NewsSection';
import Sidebar from '../../components/Sidebar/Sidebar';
import SEOHead from '../../components/SEO/SEOHead';
import { getNewsByTagSync, getCategoriesSync, getPopularNewsSync } from '../../utils/api-server';
import { getAllTags, getPopularTags } from '../../data/utils/data-helpers'; // getPopularTags追加
import { NewsItem, Category } from '../../types';
import styles from '../../styles/Tag.module.css';

interface TagPageProps {
  news: NewsItem[];
  categories: Category[];
  popularNews: NewsItem[];
  popularTags: { tag: string; count: number }[]; // 追加
  currentTag: string;
}

const TagPage: React.FC<TagPageProps> = ({
  news,
  categories,
  popularNews,
  popularTags, // 追加
  currentTag
}) => {
  return (
    <>
      <SEOHead
        title={`${currentTag}の記事一覧 | ゲーム賛否`}
        description={`「${currentTag}」に関連するゲーム記事の一覧です。賛否両論の視点で最新ゲーム情報をお届けします。`}
        keywords={[currentTag, 'ゲーム賛否', 'ゲームレビュー', '賛否両論', '最新ゲーム']}
        canonicalUrl={`${process.env.NEXT_PUBLIC_BASE_URL || ''}/tag/${encodeURIComponent(currentTag)}`}
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
              「{currentTag}」に関連する記事 {news.length}件
            </p>
          </div>
          
          <div className={styles.tagLayout}>
            <div className={styles.mainContent}>
              {news.length > 0 ? (
                <NewsSection 
                  title={`「${currentTag}」の記事一覧`}
                  newsItems={news}
                  layout="list"
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

// SSG: 人気タグのパスを事前生成
export const getStaticPaths: GetStaticPaths = async () => {
  // 人気タグ上位30個のみを事前生成（SEO効果が高いもの）
  const popularTags = getAllTags().slice(0, 30);
  
  const paths = popularTags.map(({ tag }) => ({
    params: { tag: encodeURIComponent(tag) },
  }));

  return {
    paths,
    fallback: 'blocking', // 他のタグは初回アクセス時に動的生成
  };
};

// SSG: ビルド時に各タグのデータを取得
export const getStaticProps: GetStaticProps<TagPageProps> = async ({ params }) => {
  try {
    const tag = decodeURIComponent(params?.tag as string);
    
    const [news, categories, popularNews, popularTags] = await Promise.all([
      Promise.resolve(getNewsByTagSync(tag)),
      Promise.resolve(getCategoriesSync()),
      Promise.resolve(getPopularNewsSync()),
      Promise.resolve(getPopularTags(15)), // 追加
    ]);

    return {
      props: {
        news,
        categories,
        popularNews,
        popularTags, // 追加
        currentTag: tag,
      },
      revalidate: 1800, // 30分ごとに再生成（タグページは更新頻度が低い）
    };
  } catch (error) {
    console.error('Error fetching tag data:', error);
    
    return {
      notFound: true,
    };
  }
};

export default TagPage;
