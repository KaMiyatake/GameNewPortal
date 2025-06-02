import React from 'react';
import styles from './Sidebar.module.css';
import PopularNews from './PopularNews';
import TagList from '../Tag/TagList';
import { NewsItem, Category } from '../../types';
import { getCategoryColor } from '../../utils/category-utils';
import Link from 'next/link';

interface SidebarProps {
  popularNews: NewsItem[];
  categories: Category[];
  popularTags?: { tag: string; count: number }[];
}

const Sidebar: React.FC<SidebarProps> = ({ 
  popularNews, 
  categories, 
  popularTags = [] 
}) => {
  return (
    <aside className={styles.sidebar}>
      {/* 人気記事（最大10件まで表示） */}
      <PopularNews popularNews={popularNews.slice(0, 10)} />
      
      {/* カテゴリー一覧 */}
      <div className={styles.categoryList}>
        <h3 className={styles.sidebarTitle}>カテゴリー</h3>
        <ul className={styles.categoryItems}>
          {categories.map((category) => (
            <li key={category.id} className={styles.categoryItem}>
              <Link href={`/category/${category.slug}`}>
                <span 
                  className={styles.categoryLink}
                  style={{ '--category-color': getCategoryColor(category.name) } as React.CSSProperties}
                >
                  <span className={styles.categoryIcon}>
                    {getCategoryIcon(category.slug)}
                  </span>
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      {/* タグ検索 - カテゴリの下に配置 */}
      <div className={styles.tagSection}>
        <TagList 
          tags={popularTags} 
          title="人気タグ" 
          maxTags={12}
        />
      </div>
      
      {/* 広告バナー */}
      <div className={styles.adBanner}>
        <div className={styles.adContent}>
          <p>広告スペース</p>
        </div>
      </div>
    </aside>
  );
};

// カテゴリーアイコンを取得する関数
const getCategoryIcon = (slug: string): string => {
  const icons: { [key: string]: string } = {
    'playstation': '🎮',
    'switch': '🕹️',
    'xbox': '🎯',
    'pc': '💻',
    'vr': '🥽',
    'mobile': '📱',
    'esports': '🏆',
    'pros-cons': '⚖️',
    'entertainment': '🎭',
    'industry': '📰'
  };
  return icons[slug] || '🎯';
};

export default Sidebar;
