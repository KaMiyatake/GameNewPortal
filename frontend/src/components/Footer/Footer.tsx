// frontend/src/components/HeroSlider/index.tsx

import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>ゲーム賛否</h3>
            <p className={styles.footerDescription}>
              賛否両論で読む最新ゲームニュースとレビューサイトです。最新のゲーム情報を、様々な視点からお届けします。
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>カテゴリー</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/category/console" passHref>
                  <span>コンソール</span>
                </Link>
              </li>
              <li>
                <Link href="/category/pc" passHref>
                  <span>PC</span>
                </Link>
              </li>
              <li>
                <Link href="/category/mobile" passHref>
                  <span>モバイル</span>
                </Link>
              </li>
              <li>
                <Link href="/category/indie" passHref>
                  <span>インディー</span>
                </Link>
              </li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>サイト情報</h3>
            <ul className={styles.footerLinks}>
              <li>
                <Link href="/about" passHref>
                  <span>サイトについて</span>
                </Link>
              </li>
              <li>
                <Link href="/contact" passHref>
                  <span>お問い合わせ</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} Game News Portal. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
