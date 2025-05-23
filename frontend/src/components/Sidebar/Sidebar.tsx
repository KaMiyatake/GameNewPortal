import React from 'react';
import styles from './Sidebar.module.css';
import PopularNews from './PopularNews';
import { NewsItem, Category } from '../../types';

interface SidebarProps {
  popularNews: NewsItem[];
  categories: Category[];
}

const Sidebar: React.FC<SidebarProps> = ({ popularNews, categories }) => {
  return (
    <aside className={styles.sidebar}>
      <PopularNews popularNews={popularNews} />
      
      <div className={styles.categoryList}>
        <h3 className={styles.sidebarTitle}>カテゴリー</h3>
        <ul className={styles.categoryItems}>
          {categories.map((category) => (
            <li key={category.id} className={styles.categoryItem}>
              <a href={`/category/${category.slug}`} className={styles.categoryLink}>
                {category.name}
              </a>
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
