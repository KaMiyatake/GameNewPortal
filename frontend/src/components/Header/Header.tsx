import React from 'react';
import Link from 'next/link';
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
          <Link href="/" passHref>
            <h1>Game News Portal テスト</h1>
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" passHref>
                <span className={styles.navLink}>ホーム</span>
              </Link>
            </li>
            {/* {categories.map((category) => (
              <li key={category.id} className={styles.navItem}>
                <Link href={`/category/${category.slug}`} passHref>
                  <span className={styles.navLink}>{category.name}</span>
                </Link>
              </li>
            ))} */}
            <li className={styles.navItem}>
              <Link href="/about" passHref>
                <span className={styles.navLink}>サイトについて</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
