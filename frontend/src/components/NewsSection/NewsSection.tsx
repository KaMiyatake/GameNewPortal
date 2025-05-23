import React from 'react';
import styles from './News.module.css';
import NewsCard from './NewsCard';
import { NewsItem } from '../../types';

interface NewsSectionProps {
  title: string;
  newsItems: NewsItem[];
  layout?: 'grid' | 'list'; // レイアウトタイプを追加
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  title, 
  newsItems, 
  layout = 'grid' 
}) => {
  return (
    <section className={styles.newsSection}>
      <div className={styles.container}>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <div className={layout === 'list' ? styles.newsListContainer : styles.newsGrid}>
          {newsItems.map((news) => (
            <NewsCard key={news.id} news={news} layout={layout} />
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
