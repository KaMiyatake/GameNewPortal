// src/pages/novel/index.tsx（修正版）
import React, { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import AudioManager, { AudioManagerRef } from '../../components/Novel/AudioManager';
import styles from '../../styles/Novel.module.css';

const NovelTop: React.FC = () => {
  const [bgmEnabled, setBgmEnabled] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [showBgmPrompt, setShowBgmPrompt] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const audioManagerRef = useRef<AudioManagerRef>(null);

  // ユーザーインタラクション検知
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        // 初回インタラクション時にBGMプロンプトを表示
        if (showBgmPrompt) {
          setTimeout(() => {
            const shouldPlayBGM = window.confirm(
              '🎵 BGMを再生しますか？\n「Summer Memories」が流れます。'
            );
            if (shouldPlayBGM) {
              setBgmEnabled(true);
            }
            setShowBgmPrompt(false);
          }, 500);
        }
      }
    };

    document.addEventListener('click', handleUserInteraction, { once: true });
    document.addEventListener('keydown', handleUserInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, [userInteracted, showBgmPrompt]);

  const handleNewGame = () => {
    console.log('New Game clicked');
    // TODO: ゲーム開始画面に遷移
  };

  const handleContinue = () => {
    console.log('Continue clicked');
    // TODO: セーブデータ読み込み画面に遷移
  };

  const handleSettings = () => {
    console.log('Settings clicked');
    // TODO: 設定画面に遷移
  };

  const handleExit = () => {
    setIsExiting(true);
    
    // BGMが再生中の場合はフェードアウトしてから遷移
    if (bgmEnabled && audioManagerRef.current?.isPlaying) {
      audioManagerRef.current.fadeOutAndStop();
      setTimeout(() => {
        window.location.href = '/';
      }, 1500); // フェードアウト時間を考慮
    } else {
      // BGMが再生されていない場合はすぐに遷移
      window.location.href = '/';
    }
  };

  const toggleBGM = () => {
    if (!userInteracted) {
      setUserInteracted(true);
      setShowBgmPrompt(false);
    }
    setBgmEnabled(!bgmEnabled);
  };

  return (
    <>
      <Head>
        <title>ビジュアルノベル - 夏の思い出</title>
        <meta name="description" content="オリジナルビジュアルノベルゲーム - 夏の思い出" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <Layout>
        <div className={`${styles.novelContainer} ${isExiting ? styles.exiting : ''}`}>
          {/* Summer Memories BGM */}
          <AudioManager
            ref={audioManagerRef}
            bgmSrc="/sounds/bgm/title/main_theme.mp3"
            volume={0.35}
            loop={true}
            autoPlay={userInteracted && bgmEnabled}
            fadeIn={true}
            fadeDuration={4000}
          />

          {/* 背景画像 */}
          <div className={styles.backgroundContainer}>
            <Image
              src="/images/novel/toppage.png"
              alt="ノベルゲーム背景"
              fill
              style={{ objectFit: 'cover' }}
              priority
              className={styles.backgroundImage}
            />
            <div className={styles.overlay} />
          </div>

          {/* メニューコンテンツ */}
          <div className={styles.menuContainer}>
            <div className={styles.titleSection}>
              <h1 className={styles.gameTitle}>ビジュアルノベル</h1>
              <p className={styles.gameSubtitle}>～夏の思い出～</p>
            </div>

            <nav className={styles.menuNav}>
              <button 
                className={styles.menuButton}
                onClick={handleNewGame}
                type="button"
                disabled={isExiting}
              >
                <span className={styles.buttonIcon}>🎮</span>
                <span className={styles.buttonText}>New Game</span>
              </button>

              <button 
                className={styles.menuButton}
                onClick={handleContinue}
                type="button"
                disabled={isExiting}
              >
                <span className={styles.buttonIcon}>📖</span>
                <span className={styles.buttonText}>Continue</span>
              </button>

              <button 
                className={styles.menuButton}
                onClick={handleSettings}
                type="button"
                disabled={isExiting}
              >
                <span className={styles.buttonIcon}>⚙️</span>
                <span className={styles.buttonText}>Settings</span>
              </button>

              <button 
                className={`${styles.menuButton} ${isExiting ? styles.exiting : ''}`}
                onClick={handleExit}
                type="button"
                disabled={isExiting}
              >
                <span className={styles.buttonIcon}>🚪</span>
                <span className={styles.buttonText}>
                  {isExiting ? 'Exiting...' : 'Exit'}
                </span>
              </button>
            </nav>

            {/* BGMコントロール */}
            <div className={styles.bgmControl}>
              <button 
                className={`${styles.bgmButton} ${bgmEnabled ? styles.active : ''}`}
                onClick={toggleBGM}
                type="button"
                title={bgmEnabled ? 'BGMを停止' : 'BGMを再生'}
                disabled={isExiting}
              >
                <span className={styles.bgmIcon}>
                  {bgmEnabled ? '🎵' : '🔇'}
                </span>
                <span className={styles.bgmText}>
                  {bgmEnabled ? 'Summer Memories' : 'BGM OFF'}
                </span>
              </button>
            </div>

            {/* フッター情報 */}
            <div className={styles.footerInfo}>
              <p className={styles.version}>Version 1.0.0</p>
              <p className={styles.bgmCredit}>
                BGM: "Summer Memories" by Music-Note.jp
              </p>
              {/* <Link href="/" className={styles.backLink}>
                ← メインサイトに戻る
              </Link> */}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default NovelTop;
