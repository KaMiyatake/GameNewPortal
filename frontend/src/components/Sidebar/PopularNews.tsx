import React from 'react';
import Link from 'next/link';
import styles from './Sidebar.module.css';
import { NewsItem } from '../../types';

interface PopularNewsProps {
  popularNews: NewsItem[];
}

const PopularNews: React.FC<PopularNewsProps> = ({ popularNews }) => {
  // 最大10件に制限（念のため）
  const displayNews = popularNews.slice(0, 10);

  return (
    <div className={styles.popularNews}>
      <h3 className={styles.sidebarTitle}>
        人気記事
        {/* {displayNews.length > 0 && (
          <span className={styles.newsCount}>({displayNews.length})</span>
        )} */}
      </h3>
      {displayNews.length > 0 ? (
        <div className={styles.popularList}>
          {displayNews.map((news, index) => (
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
      ) : (
        <div className={styles.noPopularNews}>
          <p>人気記事がまだありません</p>
        </div>
      )}
    </div>
  );
};

export default PopularNews;
