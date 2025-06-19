// components/Sidebar/Sidebar.tsx（更新版）
import React from 'react';
import styles from './Sidebar.module.css';
import PopularNews from './PopularNews';
import TagList from '../Tag/TagList';
import SmartAmazonAds from '../Advertisement/SmartAmazonAds';
import { NewsItem, Category } from '../../types';
import { getCategoryColor } from '../../utils/category-utils';
import Link from 'next/link';

interface SidebarProps {
  popularNews: NewsItem[];
  categories: Category[];
  popularTags?: { tag: string; count: number }[];
  currentCategory?: string; // 現在のカテゴリー
  currentArticleTags?: string[]; // 現在の記事のタグ
}

const Sidebar: React.FC<SidebarProps> = ({ 
  popularNews, 
  categories, 
  popularTags = [],
  currentCategory,
  currentArticleTags
}) => {
  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'your-affiliate-tag';

  return (
    <aside className={styles.sidebar}>
      {/* Amazon広告（人気タグの前に配置） */}
      <SmartAmazonAds
        currentCategory={currentCategory}
        currentArticleTags={currentArticleTags}
        maxProducts={3}
        affiliateTag={affiliateTag}
      />

      {/* 人気記事 */}
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
      
      {/* タグ検索 */}
      <div className={styles.tagSection}>
        <TagList 
          tags={popularTags} 
          title="人気タグ" 
          maxTags={12}
        />
      </div>
    </aside>
  );
};

// 既存のgetCategoryIcon関数は変更なし
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
