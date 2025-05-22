import React from 'react';
import Link from 'next/link';
import { NewsItem } from '../../types';
import styles from './NewsDetail.module.css';

interface RelatedNewsProps {
  news: NewsItem[];
}

const RelatedNews: React.FC<RelatedNewsProps> = ({ news }) => {
  return (
    <div className={styles.relatedNews}>
      <h3 className={styles.relatedTitle}>関連記事</h3>
      <div className={styles.relatedList}>
        {news.map((item) => (
          <div key={item.id} className={styles.relatedItem}>
            <Link href={`/news/${item.slug}`} passHref>
              <div className={styles.relatedLink}>
                <div className={styles.relatedImageContainer}>
                  <img src={item.imageUrl} alt={item.title} className={styles.relatedImage} />
                </div>
                <div className={styles.relatedContent}>
                  <h4 className={styles.relatedItemTitle}>{item.title}</h4>
                  <span className={styles.relatedDate}>{item.date}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedNews;
