import React, { useState, useEffect } from 'react';
import styles from './XEmbed.module.css';

interface XEmbedProps {
  tweetId?: string;
  tweetUrl?: string;
  username?: string;
  displayName?: string;
  content?: string;
  timestamp?: string;
  avatar?: string;
  verified?: boolean;
  likes?: number;
  retweets?: number;
  replies?: number;
  embedType?: 'full' | 'simple' | 'quote';
}

const XEmbed: React.FC<XEmbedProps> = ({
  tweetId,
  tweetUrl,
  username,
  displayName,
  content,
  timestamp,
  avatar,
  verified = false,
  likes = 0,
  retweets = 0,
  replies = 0,
  embedType = 'full'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // X公式埋め込みスクリプトの読み込み
  useEffect(() => {
    const loadTwitterScript = () => {
      if (window.twttr) {
        window.twttr.widgets.load();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://platform.twitter.com/widgets.js';
      script.async = true;
      script.charset = 'utf-8';
      script.onload = () => {
        setIsLoaded(true);
        if (window.twttr) {
          window.twttr.widgets.load();
        }
      };
      script.onerror = () => setHasError(true);
      document.head.appendChild(script);
    };

    loadTwitterScript();
  }, []);

  // カスタム埋め込み表示（フォールバック）
  const renderCustomEmbed = () => {
    return (
      <div className={styles.customTweet}>
        <div className={styles.tweetHeader}>
          <div className={styles.userInfo}>
            {avatar && (
              <img 
                src={avatar} 
                alt={`${displayName || username}のアイコン`}
                className={styles.avatar}
              />
            )}
            <div className={styles.userDetails}>
              <div className={styles.displayName}>
                {displayName || username}
                {verified && (
                  <span className={styles.verifiedBadge}>✓</span>
                )}
              </div>
              <div className={styles.username}>@{username}</div>
            </div>
          </div>
          <div className={styles.xLogo}>
            <svg viewBox="0 0 24 24" className={styles.xIcon}>
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </div>
        </div>
        
        <div className={styles.tweetContent}>
          {content && (
            <p className={styles.tweetText}>{content}</p>
          )}
        </div>
        
        {timestamp && (
          <div className={styles.tweetTime}>
            {timestamp}
          </div>
        )}
        
        <div className={styles.tweetActions}>
          <div className={styles.actionItem}>
            <span className={styles.actionIcon}>💬</span>
            <span className={styles.actionCount}>{replies}</span>
          </div>
          <div className={styles.actionItem}>
            <span className={styles.actionIcon}>🔁</span>
            <span className={styles.actionCount}>{retweets}</span>
          </div>
          <div className={styles.actionItem}>
            <span className={styles.actionIcon}>❤️</span>
            <span className={styles.actionCount}>{likes}</span>
          </div>
        </div>
        
        <div className={styles.tweetFooter}>
          <a 
            href={tweetUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className={styles.viewOnX}
          >
            Xで見る
          </a>
        </div>
      </div>
    );
  };

  // 公式埋め込み表示
  const renderOfficialEmbed = () => {
    if (!tweetUrl) return renderCustomEmbed();

    return (
      <div className={styles.officialEmbed}>
        <blockquote className="twitter-tweet" data-theme="dark">
          <a href={tweetUrl}></a>
        </blockquote>
      </div>
    );
  };

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <p>投稿の読み込みに失敗しました</p>
          {tweetUrl && (
            <a 
              href={tweetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.fallbackLink}
            >
              Xで開く
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.xEmbedContainer}>
      {embedType === 'simple' || !tweetUrl ? 
        renderCustomEmbed() : 
        renderOfficialEmbed()
      }
    </div>
  );
};

export default XEmbed;

// ユーティリティ関数
export const extractTweetId = (url: string): string | null => {
  const patterns = [
    /twitter\.com\/\w+\/status\/(\d+)/,
    /x\.com\/\w+\/status\/(\d+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }
  return null;
};

export const formatNumber = (num: number): string => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
};

// グローバル型定義
declare global {
  interface Window {
    twttr: any;
  }
}
