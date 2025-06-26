// src/components/Footer/Footer.tsx (拡張版)
import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
  hoverColor: string;
}

const Footer: React.FC = () => {
  // 環境変数からソーシャルメディアURLを取得
  const socialLinks: SocialLink[] = [
    {
      name: 'x',
      url: process.env.NEXT_PUBLIC_X_PROFILE_URL || '',
      icon: '𝕏',
      label: 'X（旧Twitter）でフォロー',
      hoverColor: '#1da1f2'
    },
    // 将来的に追加可能
    // {
    //   name: 'youtube',
    //   url: process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_URL || '',
    //   icon: '📺',
    //   label: 'YouTubeチャンネル',
    //   hoverColor: '#ff0000'
    // },
    // {
    //   name: 'discord',
    //   url: process.env.NEXT_PUBLIC_DISCORD_SERVER_URL || '',
    //   icon: '💬',
    //   label: 'Discordサーバー',
    //   hoverColor: '#5865f2'
    // }
  ].filter(link => link.url); // URLが設定されているもののみ表示

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          <Link href="/" className={styles.siteTitleLink}>
            <h3 className={styles.siteTitle}>ゲーム賛否</h3>
          </Link>
          
          {/* ソーシャルメディアリンク */}
          {socialLinks.length > 0 && (
            <div className={styles.socialLinks}>
              {socialLinks.map((social) => (
                <a 
                  key={social.name}
                  href={social.url}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label={social.label}
                  style={{ '--hover-color': social.hoverColor } as React.CSSProperties}
                >
                  <span className={styles.socialIcon}>{social.icon}</span>
                  <span className={styles.socialText}>Follow us</span>
                </a>
              ))}
            </div>
          )}
          
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
