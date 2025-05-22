import React from 'react';
import styles from './News.module.css';
import { NewsItem } from '../../types';
import Image from 'next/image';

interface NewsCardProps {
  news: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <Image
          src={news.imageUrl}
          alt={news.title}
          width={400}
          height={225}
          className={styles.newsImage}
          loading="lazy"
        />
        <span className={styles.category}>{news.category}</span>
      </div>
      <div className={styles.contentContainer}>
        <h3 className={styles.newsTitle}>
          <a href={news.url}>{news.title}</a>
        </h3>
        <p className={styles.newsSummary}>{news.summary}</p>
        <div className={styles.newsFooter}>
          <span className={styles.newsDate}>{news.date}</span>
          <a href={news.url} className={styles.readMore}>
            続きを読む
          </a>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;