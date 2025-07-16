// src/components/ImageModal/ImageModal.tsx の修正版
import React, { useEffect, useState } from 'react';
import styles from './ImageModal.module.css';

interface ImageModalProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ src, alt, isOpen, onClose }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // モーダルが開かれたときの処理
  useEffect(() => {
    if (isOpen) {
      // 背景スクロールを無効化
      document.body.style.overflow = 'hidden';
      setImageLoaded(false);
      setImageError(false);
    } else {
      // 背景スクロールを有効化
      document.body.style.overflow = 'unset';
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // ESCキーで閉じる
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [isOpen, onClose]);

  // 画像クリック時に新しいタブで開く
  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(src, '_blank');
  };

  // 画像コンテナクリック時にモーダルを閉じる
  const handleContainerClick = (e: React.MouseEvent) => {
    // 画像要素以外をクリックした場合のみモーダルを閉じる
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // モーダルが開いていない場合は何も表示しない
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        {/* 上部のヘッダー（画像名称 + 閉じるボタン） */}
        <div className={styles.modalHeader}>
          <div className={styles.imageTitle}>
            {imageLoaded && !imageError && alt}
          </div>
          <button 
            className={styles.closeButton}
            onClick={onClose}
            aria-label="モーダルを閉じる"
          >
            ×
          </button>
        </div>

        {/* 画像コンテナ */}
        <div className={styles.imageContainer} onClick={handleContainerClick}>
          {!imageError ? (
            <>
              {/* ローディング表示 */}
              {!imageLoaded && (
                <div className={styles.loadingSpinner}>
                  <div className={styles.spinner}></div>
                  <p>画像を読み込んでいます...</p>
                </div>
              )}

              {/* 実際の画像 */}
              <img
                src={src}
                alt={alt}
                className={`${styles.modalImage} ${imageLoaded ? styles.loaded : styles.loading}`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageError(true)}
                onClick={handleImageClick}
              />
            </>
          ) : (
            <div className={styles.errorMessage}>
              <div className={styles.errorIcon}>🖼️</div>
              <p>画像を読み込めませんでした</p>
              <p className={styles.errorAlt}>{alt}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageModal;
