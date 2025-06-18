// src/components/NewsSection/NewsCard.tsx
import React from 'react';
import Link from 'next/link';
import ArticleImage from '../Image/ArticleImage';
import { getCategoryUrl, getCategoryColor } from '../../utils/category-utils';
import styles from './News.module.css';
import { NewsItem } from '../../types';

interface NewsCardProps {
  news: NewsItem;
  layout?: 'grid' | 'list';
}

const NewsCard: React.FC<NewsCardProps> = ({ news, layout = 'grid' }) => {
  // カテゴリーコンポーネント（モバイル対応版）
  const CategoryTags: React.FC<{ 
    categories: string[]; 
    size?: 'small' | 'normal';
    isMobile?: boolean;
  }> = ({ categories, size = 'normal', isMobile = false }) => {
    const getDisplayCategories = () => {
      if (!isMobile || categories.length <= 3) {
        return categories.map((category, index) => ({
          type: 'category' as const,
          category,
          index
        }));
      }

      const displayItems = [];
      displayItems.push(
        ...categories.slice(0, 2).map((category, index) => ({
          type: 'category' as const,
          category,
          index
        }))
      );
      
      const remainingCount = categories.length - 2;
      const thirdCategory = categories[2];
      displayItems.push({
        type: 'more' as const,
        category: thirdCategory,
        remainingCount,
        index: 2
      });

      return displayItems;
    };

    const displayItems = getDisplayCategories();

    return (
      <div className={size === 'small' ? styles.categoriesSmall : styles.categories}>
        {displayItems.map((item) => {
          if (item.type === 'category') {
            return (
              <Link key={item.index} href={getCategoryUrl(item.category)}>
                <span 
                  className={size === 'small' ? styles.categoryTagSmall : styles.categoryTag}
                  style={{ '--category-color': getCategoryColor(item.category) } as React.CSSProperties}
                >
                  {item.category}
                </span>
              </Link>
            );
          } else {
            return (
              <Link key={item.index} href={getCategoryUrl(item.category)}>
                <span 
                  className={size === 'small' ? styles.categoryTagMoreSmall : styles.categoryTagMore}
                  style={{ '--category-color': getCategoryColor(item.category) } as React.CSSProperties}
                  title={`${item.category} 他${item.remainingCount - 1}件`}
                >
                  {item.category} +{item.remainingCount - 1}
                </span>
              </Link>
            );
          }
        })}
      </div>
    );
  };

  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  if (layout === 'list') {
    return (
      <article className={styles.newsCardList}>
        <div className={styles.newsCardListContent}>
          <div className={styles.imageContainerList}>
            <Link href={`/news/${news.slug}`} className={styles.imageLink}>
              <ArticleImage
                src={news.imageUrl}
                alt={news.title}
                fill={true}
                objectFit="cover"
                objectPosition="center"
              />
            </Link>
          </div>
          <div className={styles.contentContainerList}>
            <div className={styles.newsHeaderList}>
              <CategoryTags 
                categories={news.categories} 
                size="small" 
                isMobile={isMobile}
              />
              <time className={styles.newsDateList}>{news.date}</time>
            </div>
            <Link href={`/news/${news.slug}`} className={styles.titleLink}>
              {/* タイトルを全文表示するように修正 */}
              <h3 className={styles.newsTitleListFullText}>{news.title}</h3>
            </Link>
          </div>
        </div>
      </article>
    );
  }

  // グリッド表示の場合
  return (
    <article className={styles.newsCard}>
      <div className={styles.imageContainer}>
        <Link href={`/news/${news.slug}`}>
          <ArticleImage
            src={news.imageUrl}
            alt={news.title}
            fill={true}
            objectFit="cover"
            objectPosition="center"
          />
        </Link>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.newsHeader}>
          <CategoryTags 
            categories={news.categories} 
            size="small"
            isMobile={isMobile}
          />
          <span className={styles.newsHeaderDate}>{news.date}</span>
        </div>
        
        {/* タイトルを全文表示するように修正 */}
        <h3 className={styles.newsTitleFullText}>
          <Link href={`/news/${news.slug}`}>
            <span>{news.title}</span>
          </Link>
        </h3>
        
        <p className={styles.newsSummary}>{news.summary}</p>
        
        <div className={styles.newsFooter}>
          <span className={styles.newsDate}>{news.date}</span>
          <Link href={`/news/${news.slug}`}>
            <span className={styles.readMore}>続きを読む</span>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default NewsCard;
