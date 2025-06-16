// src/components/Header/Header.tsx の修正版
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import SearchBox from '../Search/SearchBox'; // 追加
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
        setIsMenuOpen(false);
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
              <div className={styles.logoImageContainer}>
                <Image
                  src="/GameSanpiLogo.png"
                  alt="ゲーム賛否 ロゴ"
                  width={200}
                  height={60}
                  priority
                  className={styles.logoImage}
                />
              </div>
              <div className={styles.textLogo}>
                <h1 className={styles.siteName}>ゲーム賛否</h1>
                <p className={styles.tagline}>賛否両論で読むゲームメディア</p>
              </div>
            </div>
          </Link>
        </div>
        
        {/* ヘッダーアクション（ナビゲーション + 検索 + テーマトグル） */}
        <div className={styles.headerActions}>
          {/* デスクトップナビゲーション */}
          <nav className={styles.nav}>
            <ul className={styles.navList}>
              {/* カテゴリ検索ドロップダウン */}
              <li className={styles.navItem}>
                <div className={`${styles.dropdown} dropdown`}> {/* クラス名追加 */}
                  <span className={styles.navLink}>カテゴリ</span>
                  <div className={`${styles.dropdownContent} dropdownContent`}> {/* クラス名追加 */}
                    {categories.map((category) => (
                      <Link key={category.id} href={`/category/${category.slug}`}>
                        <span className={styles.dropdownItem}>
                          {getCategoryIcon(category.slug)} {category.name}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
              <li className={styles.navItem}>
                <Link href="/about">
                  <span className={styles.navLink}>サイトについて</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/contact">
                  <span className={styles.navLink}>お問い合わせ</span>
                </Link>
              </li>
              <li className={styles.navItem}>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          {/* 検索ボックス（デスクトップ＆モバイル共通） */}
          <div className={styles.searchContainer}>
            <SearchBox />
          </div>

          {/* テーマ切り替えボタン（デスクトップ） */}
          {/* <div className={styles.themeToggleContainer}>
            <ThemeToggle />
          </div> */}

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
        <div className={styles.mobileMenuHeader}>
          <ThemeToggle />
        </div>
        
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
          <li className={styles.mobileNavItem}>
            <Link href="/contact">
              <span 
                className={styles.mobileNavLink}
                onClick={closeMenu}
              >
                <span className={styles.categoryIcon}>📧</span>
                お問い合わせ
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
    'pc': '💻',
    'mobile': '📱',
    'xbox': '🎯',
    'pros-cons': '⚖️',
    'vr': '🥽',
    'esports': '🏆',
    'entertainment': '🎭',
    'industry': '📰'
  };
  return icons[slug] || '🎯';
};

export default Header;
