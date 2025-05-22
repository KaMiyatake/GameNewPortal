import React from 'react';
import styles from './Header.module.css';
import { Category } from '../../types';
import Link from 'next/link';

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
              <Link href="/" className={styles.navLink}>
                ホーム
              </Link>
            </li>
            {categories.map((category) => (
              <li key={category.id} className={styles.navItem}>
                <Link href={`/category/${category.slug}`} className={styles.navLink}>
                  {category.name}
                </Link>
              </li>
            ))}
            <li className={styles.navItem}>
              <Link href="/about" className={styles.navLink}>
                サイトについて
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;