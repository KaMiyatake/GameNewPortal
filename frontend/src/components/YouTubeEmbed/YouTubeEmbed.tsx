import React, { useState } from 'react';
import styles from './YouTubeEmbed.module.css';

interface YouTubeEmbedProps {
  videoId: string;
  title?: string;
  width?: number;
  height?: number;
  autoplay?: boolean;
  showControls?: boolean;
  startTime?: number;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  title = 'YouTube video player',
  width = 560,
  height = 315,
  autoplay = false,
  showControls = true,
  startTime = 0
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // YouTube URLパラメータを構築
  const getEmbedUrl = () => {
    const params = new URLSearchParams();
    
    if (autoplay) params.append('autoplay', '1');
    if (!showControls) params.append('controls', '0');
    if (startTime > 0) params.append('start', startTime.toString());
    
    params.append('rel', '0'); // 関連動画を同チャンネルのみに制限
    params.append('modestbranding', '1'); // YouTubeロゴを最小化
    params.append('playsinline', '1'); // iOSでインライン再生
    
    const paramString = params.toString();
    return `https://www.youtube.com/embed/${videoId}${paramString ? `?${paramString}` : ''}`;
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const handleError = () => {
    setHasError(true);
  };

  if (hasError) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorContent}>
          <p>動画の読み込みに失敗しました</p>
          <a 
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.fallbackLink}
          >
            YouTubeで視聴する
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.videoContainer}>
      <div className={styles.videoWrapper} style={{ '--aspect-ratio': `${height / width * 100}%` } as React.CSSProperties}>
        {!isLoaded && (
          <div className={styles.loadingOverlay}>
            <div className={styles.loadingSpinner}></div>
            <p>動画を読み込み中...</p>
          </div>
        )}
        <iframe
          className={styles.videoFrame}
          src={getEmbedUrl()}
          title={title}
          width={width}
          height={height}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
        />
      </div>
      
      {/* 動画情報表示（オプション） */}
      <div className={styles.videoInfo}>
        <p className={styles.videoTitle}>{title}</p>
        <a 
          href={`https://www.youtube.com/watch?v=${videoId}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.youtubeLink}
        >
          YouTubeで開く
        </a>
      </div>
    </div>
  );
};

export default YouTubeEmbed;

// ユーティリティ関数: YouTube URLからビデオIDを抽出
export const extractVideoId = (url: string): string | null => {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/v\/([^&\n?#]+)/,
    /youtube\.com\/user\/[^\/]+#p\/[au]\/\d+\/([^&\n?#]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  return null;
};
