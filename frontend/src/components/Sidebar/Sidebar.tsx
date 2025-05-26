import React from 'react';
import styles from './Sidebar.module.css';
import PopularNews from './PopularNews';
import TagList from '../Tag/TagList';
import { NewsItem, Category } from '../../types';
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
      <PopularNews popularNews={popularNews} />
      
      {popularTags.length > 0 && (
        <TagList tags={popularTags} title="人気タグ" maxTags={8} />
      )}
      
      <div className={styles.categoryList}>
        <h3 className={styles.sidebarTitle}>カテゴリー</h3>
        <ul className={styles.categoryItems}>
          {categories.map((category) => (
            <li key={category.id} className={styles.categoryItem}>
              <Link href={`/category/${category.slug}`} passHref>
                <span className={styles.categoryLink}>{category.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      
      <div className={styles.adBanner}>
        <div className={styles.adContent}>
          <p>広告スペース</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
