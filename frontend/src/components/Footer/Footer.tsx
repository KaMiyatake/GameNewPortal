import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <Link href="/" className={styles.siteTitleLink}>
            <h3 className={styles.siteTitle}>ゲーム賛否</h3>
          </Link>
          <nav className={styles.siteInfo}>
            <Link href="/about">
              <span className={styles.infoLink}>ℹ️ サイトについて</span>
            </Link>
            <Link href="/contact">
              <span className={styles.infoLink}>📧 お問い合わせ</span>
            </Link>
            <Link href="/privacy-policy">
              <span className={styles.infoLink}>🔒 プライバシーポリシー</span>
            </Link>
            <Link href="/disclaimer">
              <span className={styles.infoLink}>📜 免責事項</span>
            </Link>
            <Link href="/advertising">
              <span className={styles.infoLink}>📋 広告掲載</span>
            </Link>
          </nav>
        </div>
        
        <div className={styles.copyright}>
          <p>&copy; {new Date().getFullYear()} ゲーム賛否 (Game Sanpi). All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
