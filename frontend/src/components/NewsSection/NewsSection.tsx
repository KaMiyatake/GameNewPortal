import React from 'react';
import styles from './News.module.css';
import NewsCard from './NewsCard';
import Pagination from '../Pagination/Pagination';
import { NewsItem } from '../../types';

interface NewsSectionProps {
  title: string;
  newsItems: NewsItem[];
  layout?: 'grid' | 'list';
  showPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const NewsSection: React.FC<NewsSectionProps> = ({ 
  title, 
  newsItems, 
  layout = 'grid',
  showPagination = false,
  currentPage = 1,
  totalPages = 1,
  onPageChange
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
        
        {/* ページネーション */}
        {showPagination && totalPages > 1 && onPageChange && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
          />
        )}
      </div>
    </section>
  );
};

export default NewsSection;
