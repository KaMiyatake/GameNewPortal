import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Game News Portal</h3>
            <p className={styles.footerDescription}>
              最新のゲーム情報やニュースをお届けするポータルサイトです。
            </p>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>カテゴリー</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/category/console">コンソール</a></li>
              <li><a href="/category/pc">PC</a></li>
              <li><a href="/category/mobile">モバイル</a></li>
              <li><a href="/category/indie">インディー</a></li>
            </ul>
          </div>
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>サイト情報</h3>
            <ul className={styles.footerLinks}>
              <li><a href="/about">サイトについて</a></li>
              <li><a href="/contact">お問い合わせ</a></li>
              <li><a href="/privacy">プライバシーポリシー</a></li>
              <li><a href="/terms">利用規約</a></li>
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
