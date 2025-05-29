import React from 'react';
import Link from 'next/link';
import ArticleImage from '../Image/ArticleImage';
import { getCategoryUrl, getCategoryColor } from '../../utils/category-utils';
import styles from './News.module.css';
import { NewsItem } from '../../types';

interface NewsCardProps {
  news: NewsItem;
  layout?: 'grid' | 'list';
}

const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'grid' }) => {
  // カテゴリーコンポーネント
  const CategoryTags: React.FC<{ categories: string[]; size?: 'small' | 'normal' }> = ({ 
    categories, 
    size = 'normal' 
  }) => (
    <div className={size === 'small' ? styles.categoriesSmall : styles.categories}>
      {categories.map((category, index) => (
        <Link key={index} href={getCategoryUrl(category)}>
          <span 
            className={size === 'small' ? styles.categoryTagSmall : styles.categoryTag}
            style={{ '--category-color': getCategoryColor(category) } as React.CSSProperties}
          >
            {category}
          </span>
        </Link>
      ))}
    </div>
  );

  if (layout === 'list') {
    return (
      <article className={styles.newsCardList}>
        <div className={styles.newsCardListContent}>
          <div className={styles.imageContainerList}>
            <Link href={`/news/${news.slug}`} className={styles.imageLink}>
              <ArticleImage
                src={news.imageUrl}
                alt={news.title}
                fill={true}
                objectFit="cover"
                objectPosition="center"
              />
            </Link>
            {/* 画像上のカテゴリ表示を削除 */}
          </div>
          <div className={styles.contentContainerList}>
            <div className={styles.newsHeaderList}>
              <CategoryTags categories={news.categories} size="small" />
              <time className={styles.newsDateList}>{news.date}</time>
            </div>
            <Link href={`/news/${news.slug}`} className={styles.titleLink}>
              <h3 className={styles.newsTitleList}>{news.title}</h3>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // グリッド表示の場合
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <Link href={`/news/${news.slug}`}>
          <ArticleImage
            src={news.imageUrl}
            alt={news.title}
            fill={true}
            objectFit="cover"
            objectPosition="center"
          />
        </Link>
        {/* 画像上のカテゴリ表示を削除 */}
      </div>
      <div className={styles.contentContainer}>
        {/* 複数カテゴリと日付のヘッダー */}
        <div className={styles.newsHeader}>
          <CategoryTags categories={news.categories} size="small" />
          <span className={styles.newsHeaderDate}>{news.date}</span>
        </div>
        
        {/* タイトル */}
        <h3 className={styles.newsTitle}>
          <Link href={`/news/${news.slug}`}>
            <span>{news.title}</span>
          </Link>
        </h3>
        
        {/* サマリ */}
        <p className={styles.newsSummary}>{news.summary}</p>
        
        {/* フッター */}
        <div className={styles.newsFooter}>
          <span className={styles.newsDate}>{news.date}</span>
          <Link href={`/news/${news.slug}`}>
            <span className={styles.readMore}>続きを読む</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
