// src/pages/novel/index.tsx
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import styles from '../../styles/Novel.module.css';

const NovelTop: React.FC = () => {
  const handleNewGame = () => {
    // 新規ゲーム開始の処理
    console.log('New Game clicked');
  };

  const handleContinue = () => {
    // ゲーム継続の処理
    console.log('Continue clicked');
  };

  const handleSettings = () => {
    // 設定画面の処理
    console.log('Settings clicked');
  };

  const handleExit = () => {
    // ゲーム終了（メインサイトに戻る）
    window.location.href = '/';
  };

  return (
    <>
      <Head>
        <title>ビジュアルノベル - ゲーム賛否</title>
        <meta name="description" content="ゲーム賛否オリジナルビジュアルノベルゲーム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Layout>
        <div className={styles.novelContainer}>
          {/* 背景画像 */}
          <div className={styles.backgroundContainer}>
            <Image
              src="/images/novel/top2.png"
              alt="ノベルゲーム背景"
              fill
              style={{ objectFit: 'cover' }}
              priority
              className={styles.backgroundImage}
            />
            
            {/* オーバーレイ（必要に応じて） */}
            <div className={styles.overlay} />
          </div>

          {/* メニューコンテンツ */}
          <div className={styles.menuContainer}>
            <div className={styles.titleSection}>
              <h1 className={styles.gameTitle}>ビジュアルノベル</h1>
              <p className={styles.gameSubtitle}>～ゲーム賛否物語～</p>
            </div>

            <nav className={styles.menuNav}>
              <button 
                className={styles.menuButton}
                onClick={handleNewGame}
                type="button"
              >
                <span className={styles.buttonIcon}>🎮</span>
                <span className={styles.buttonText}>New Game</span>
              </button>

              <button 
                className={styles.menuButton}
                onClick={handleContinue}
                type="button"
              >
                <span className={styles.buttonIcon}>📖</span>
                <span className={styles.buttonText}>Continue</span>
              </button>

              <button 
                className={styles.menuButton}
                onClick={handleSettings}
                type="button"
              >
                <span className={styles.buttonIcon}>⚙️</span>
                <span className={styles.buttonText}>Settings</span>
              </button>

              <button 
                className={styles.menuButton}
                onClick={handleExit}
                type="button"
              >
                <span className={styles.buttonIcon}>🚪</span>
                <span className={styles.buttonText}>Exit</span>
              </button>
            </nav>

            {/* フッター情報 */}
            <div className={styles.footerInfo}>
              <p className={styles.version}>Version 1.0.0</p>
              <Link href="/" className={styles.backLink}>
                ← メインサイトに戻る
              </Link>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NovelTop;
