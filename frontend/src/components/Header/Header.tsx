import React from 'react';
import styles from './Header.module.css';
import { Category } from '../../types';

interface HeaderProps {
  categories: Category[];
}

const Header: React.FC<HeaderProps> = ({ categories }) => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <h1>Game News Portal</h1>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <a href="/" className={styles.navLink}>ホーム</a>
            </li>
            {categories.map((category) => (
              <li key={category.id} className={styles.navItem}>
                <a href={`/category/${category.slug}`} className={styles.navLink}>
                  {category.name}
                </a>
              </li>
            ))}
            <li className={styles.navItem}>
              <a href="/about" className={styles.navLink}>サイトについて</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
