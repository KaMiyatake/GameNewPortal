import React from 'react';
import Link from 'next/link';
import ArticleImage from '../Image/ArticleImage';
import { getCategoryUrl } from '../../utils/category-utils';
import styles from './News.module.css';
import { NewsItem } from '../../types';

interface NewsCardProps {
  news: NewsItem;
  layout?: 'grid' | 'list';
}

const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'grid' }) => {
  if (layout === 'list') {
    return (
      <article className={styles.newsCardList}>
        <div className={styles.newsCardListContent}>
          <div className={styles.imageContainerList}>
            <Link href={`/news/${news.slug}`}>
              <ArticleImage
                src={news.imageUrl}
                alt={news.title}
                fill={true}
                objectFit="cover"
                objectPosition="center"
              />
            </Link>
          </div>
          <div className={styles.contentContainerList}>
            <div className={styles.newsHeaderList}>
              <Link href={getCategoryUrl(news.category)}>
                {news.category}
              </Link>
              <span className={styles.newsDateList}>{news.date}</span>
            </div>
            <h3 className={styles.newsTitleList}>
              <Link href={`/news/${news.slug}`}>
                {news.title}
              </Link>
            </h3>
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
        <Link href={getCategoryUrl(news.category)}>
          <span className={styles.category}>{news.category}</span>
        </Link>
      </div>
      <div className={styles.contentContainer}>
        {/* カテゴリと日付のヘッダー */}
        <div className={styles.newsHeader}>
          <Link href={getCategoryUrl(news.category)}>
            <span className={styles.newsHeaderCategory}>{news.category}</span>
          </Link>
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
