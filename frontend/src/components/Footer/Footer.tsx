import React from 'react';
import Link from 'next/link';
import { categories } from '../../data/categories/categories';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  // 主要カテゴリー（最初の6つ）を表示
  const mainCategories = categories.slice(0, 6);
  
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>ゲーム賛否</h3>
            <p className={styles.footerDescription}>
              賛否両論で読む最新ゲームニュースとレビューサイトです。最新のゲーム情報を、様々な視点からお届けします。
            </p>
            <div className={styles.socialLinks}>
              {/* 将来的にソーシャルリンクを追加する場合 */}
              {/* <a href="#" aria-label="Twitter">🐦</a> */}
              {/* <a href="#" aria-label="YouTube">📺</a> */}
            </div>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>主要カテゴリー</h3>
            <ul className={styles.footerLinks}>
              {mainCategories.map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`}>
                    <span 
                      className={styles.categoryLink}
                      style={{ '--category-color': category.color } as React.CSSProperties}
                    >
                      {getCategoryIcon(category.slug)} {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>その他</h3>
            <ul className={styles.footerLinks}>
              {categories.slice(6).map((category) => (
                <li key={category.id}>
                  <Link href={`/category/${category.slug}`}>
                    <span 
                      className={styles.categoryLink}
                      style={{ '--category-color': category.color } as React.CSSProperties}
                    >
                      {getCategoryIcon(category.slug)} {category.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>サイト情報</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/about">
                  <span className={styles.infoLink}>ℹ️ サイトについて</span>
                </Link>
              </li>
              <li>
                <Link href="/contact">
                  <span className={styles.infoLink}>📧 お問い合わせ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} ゲーム賛否 (Game Sanpi). All rights reserved.</p>
          <p className={styles.tagline}>賛否両論で読むゲームメディア</p>
        </div>
      </div>
    </footer>
  );
};

// カテゴリーアイコンを取得する関数（Header.tsxと共通化）
const getCategoryIcon = (slug: string): string => {
  const icons: { [key: string]: string } = {
    'playstation': '🎮',
    'switch': '🕹️',
    'pc': '💻',
    'mobile': '📱',
    'xbox': '🎯',
    'pros-cons': '⚖️',
    'vr': '🥽',
    'entertainment': '🎭',
    'industry': '📰'
  };
  return icons[slug] || '🎯';
};


export default Footer;
