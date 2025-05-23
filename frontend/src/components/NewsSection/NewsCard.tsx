import React from 'react';
import Link from 'next/link';
import styles from './News.module.css';
import { NewsItem } from '../../types';

interface NewsCardProps {
  news: NewsItem;
  layout?: 'grid' | 'list'; // レイアウトタイプを追加
}

const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'grid' }) => {
  if (layout === 'list') {
    // 1列表示用の横長レイアウト
    return (
      <article className={styles.newsCardList}>
        <Link href={`/news/${news.slug}`} passHref>
          <div className={styles.newsCardListContent}>
            <div className={styles.imageContainerList}>
              <img src={news.imageUrl} alt={news.title} className={styles.newsImageList} />
            </div>
            <div className={styles.contentContainerList}>
              <div className={styles.newsHeaderList}>
                <Link href={`/category/${news.category.toLowerCase()}`} passHref>
                  <span className={styles.categoryList}>{news.category}</span>
                </Link>
                <span className={styles.newsDateList}>{news.date}</span>
              </div>
              <h3 className={styles.newsTitleList}>
                <Link href={`/news/${news.slug}`} passHref>
                  <span>{news.title}</span>
                </Link>
              </h3>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  // 既存のグリッド表示用レイアウト
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <Link href={`/news/${news.slug}`} passHref>
          <img src={news.imageUrl} alt={news.title} className={styles.newsImage} />
        </Link>
        <Link href={`/category/${news.category.toLowerCase()}`} passHref>
          <span className={styles.category}>{news.category}</span>
        </Link>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.newsTitle}>
          <Link href={`/news/${news.slug}`} passHref>
            <span>{news.title}</span>
          </Link>
        </h3>
        <p className={styles.newsSummary}>{news.summary}</p>
        <div className={styles.newsFooter}>
          <span className={styles.newsDate}>{news.date}</span>
          <Link href={`/news/${news.slug}`} passHref>
            <span className={styles.readMore}>続きを読む</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
