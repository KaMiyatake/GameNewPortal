// 人気記事コンポーネントの作成 (src/components/Sidebar/PopularNews.tsx)

import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { NewsItem } from '../../types';

interface PopularNewsProps {
  popularNews: NewsItem[];
}

const PopularNews: React.FC<PopularNewsProps> = ({ popularNews }) => {
  return (
    <div className={styles.popularNews}>
      <h3 className={styles.sidebarTitle}>人気記事</h3>
      <div className={styles.popularList}>
        {popularNews.map((news, index) => (
          <div key={news.id} className={styles.popularItem}>
            <Link href={`/news/${news.slug}`} passHref>
              <div className={styles.popularLink}>
                <div className={styles.popularRank}>{index + 1}</div>
                <div className={styles.popularContent}>
                  <h4 className={styles.popularTitle}>{news.title}</h4>
                  <div className={styles.popularInfo}>
                    <span className={styles.popularCategory}>{news.category}</span>
                    <span className={styles.popularDate}>{news.date}</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularNews;
