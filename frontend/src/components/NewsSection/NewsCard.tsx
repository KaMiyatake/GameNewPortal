import React from 'react';
import Link from 'next/link';
import styles from './News.module.css';
import { NewsItem } from '../../types';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
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
