import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { categories } from '../../data/categories/categories';
import styles from './Header.module.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // モバイル判定とリサイズ対応
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); // デスクトップ時はメニューを閉じる
      }
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  // メニュー外クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isMenuOpen && !target.closest(`.${styles.header}`)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // ESCキーでメニューを閉じる
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" onClick={closeMenu}>
            <div className={styles.logoContent}>
              <h1 className={styles.siteName}>ゲーム賛否</h1>
              <p className={styles.tagline}>賛否両論で読むゲームメディア</p>
            </div>
          </Link>
        </div>
        
        {/* デスクトップナビゲーション - ロゴの右側に配置 */}
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            {/* 最初の6つを表示（主要プラットフォーム） */}
            {categories.slice(0, 6).map((category) => (
              <li key={category.id} className={styles.navItem}>
                <Link href={`/category/${category.slug}`}>
                  <span 
                    className={styles.navLink}
                    style={{ '--category-color': category.color } as React.CSSProperties}
                  >
                    {category.name}
                  </span>
                </Link>
              </li>
            ))}
            {/* 残りは「その他」ドロップダウンに */}
            {categories.length > 6 && (
              <li className={styles.navItem}>
                <div className={styles.dropdown}>
                  <span className={styles.navLink}>その他</span>
                  <div className={styles.dropdownContent}>
                    {categories.slice(6).map((category) => (
                      <Link key={category.id} href={`/category/${category.slug}`}>
                        <span className={styles.dropdownItem}>
                          {getCategoryIcon(category.slug)} {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            )}
            <li className={styles.navItem}>
              <Link href="/about">
                <span className={styles.navLink}>サイトについて</span>
              </Link>
            </li>
          </ul>
        </nav>

        {/* モバイルハンバーガーメニューボタン */}
        {isMobile && (
        <button 
          className={`${styles.mobileMenuButton} ${isMenuOpen ? styles.active : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </button>
        )}
      </div>

      {/* モバイルメニューオーバーレイ */}
      {isMenuOpen && (
        <div 
          className={styles.mobileMenuOverlay}
          onClick={closeMenu}
        />
      )}

      {/* モバイルメニュー */}
      <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileNavList}>
          {categories.map((category) => (
            <li key={category.id} className={styles.mobileNavItem}>
              <Link href={`/category/${category.slug}`}>
                <span 
                  className={styles.mobileNavLink}
                  style={{ '--category-color': category.color } as React.CSSProperties}
                  onClick={closeMenu}
                >
                  <span className={styles.categoryIcon}>
                    {getCategoryIcon(category.slug)}
                  </span>
                  {category.name}
                </span>
              </Link>
            </li>
          ))}
          <li className={styles.mobileNavItem}>
            <Link href="/about">
              <span 
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                <span className={styles.categoryIcon}>ℹ️</span>
                サイトについて
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

// カテゴリーアイコンを取得する関数
const getCategoryIcon = (slug: string): string => {
  const icons: { [key: string]: string } = {
    'playstation': '🎮',
    'switch': '🕹️',
    'xbox': '🎯', // Xbox用アイコン
    'pc': '💻',
    'vr': '🥽', // VR用アイコン
    'mobile': '📱',
    'pros-cons': '⚖️',
    'entertainment': '🎭',
    'industry': '📰'
  };
  return icons[slug] || '🎯';
};


export default Header;
