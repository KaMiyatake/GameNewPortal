import React from 'react';
import Link from 'next/link';
import { getCategoryUrl, getCategoryColor } from '../../utils/category-utils';
import styles from './Sidebar.module.css';
import { NewsItem } from '../../types';

interface PopularNewsProps {
  popularNews: NewsItem[];
}

const PopularNews: React.FC<PopularNewsProps> = ({ popularNews }) => {
  // 最大10件に制限（念のため）
  const displayNews = popularNews.slice(0, 10);

  const handleCategoryClick = (e: React.MouseEvent, categoryUrl: string) => {
    e.stopPropagation(); // 親のリンククリックを停止
    e.preventDefault();
    window.location.href = categoryUrl; // 直接ナビゲーション
  };

  return (
    <div className={styles.popularNews}>
      <h3 className={styles.sidebarTitle}>
        人気記事
        {displayNews.length > 0 && (
          <span className={styles.newsCount}>({displayNews.length})</span>
        )}
      </h3>
      {displayNews.length > 0 ? (
        <div className={styles.popularList}>
          {displayNews.map((news, index) => {
            // 代表カテゴリ（最初のカテゴリ）を取得
            const primaryCategory = news.categories && news.categories.length > 0 
              ? news.categories[0] 
              : null;

            return (
              <div key={news.id} className={styles.popularItem}>
                <Link href={`/news/${news.slug}`}>
                  <div className={styles.popularLink}>
                    <div className={styles.popularRank}>{index + 1}</div>
                    <div className={styles.popularContent}>
                      <h4 className={styles.popularTitle}>{news.title}</h4>
                      <div className={styles.popularInfo}>
                        {primaryCategory && (
                          <span 
                            className={styles.popularCategory}
                            style={{ '--category-color': getCategoryColor(primaryCategory) } as React.CSSProperties}
                            onClick={(e) => handleCategoryClick(e, getCategoryUrl(primaryCategory))}
                          >
                            {primaryCategory}
                            {/* 複数カテゴリがある場合のインジケーター */}
                            {news.categories && news.categories.length > 1 && (
                              <span className={styles.multiCategoryIndicator}>
                                +{news.categories.length - 1}
                              </span>
                            )}
                          </span>
                        )}
                        <span className={styles.popularDate}>{news.date}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
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
