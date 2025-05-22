import React from 'react';
import styles from './News.module.css';
import NewsCard from './NewsCard';
import { NewsItem } from '../../types';

interface NewsSectionProps {
  title: string;
  newsItems: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ title, newsItems }) => {
  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={styles.newsGrid}>
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
        <div className={styles.loadMoreContainer}>
          <button className={styles.loadMoreButton}>もっと見る</button>
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
