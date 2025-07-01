// src/components/ProductCard/AmazonProductCard.tsx
import React, { useState } from 'react';
//import Link from 'next/link';
import { GameProductLite } from '../../data/amazon-products';
import styles from './AmazonProductCard.module.css';

interface AmazonProductCardProps {
  product: GameProductLite;
  layout?: 'compact' | 'detailed' | 'inline';
  showDescription?: boolean;
  customTitle?: string;
  affiliate?: {
    tag: string;
    customUrl?: string;
  };
}

const AmazonProductCard: React.FC<AmazonProductCardProps> = ({
  product,
  layout = 'detailed',
  //showDescription = true,
  customTitle,
  affiliate
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Amazon商品URLを生成（アフィリエイトタグ付き）
  const getAmazonUrl = () => {
    const baseUrl = `https://www.amazon.co.jp/dp/${product.asin}`;
    if (affiliate?.customUrl) {
      return affiliate.customUrl;
    }
    if (affiliate?.tag) {
      return `${baseUrl}?tag=${affiliate.tag}`;
    }
    return baseUrl;
  };

  // プラットフォームアイコンを取得
  const getPlatformIcon = (platforms: string[]) => {
    if (!platforms || platforms.length === 0) return '';
    
    const iconMap: { [key: string]: string } = {
      'PlayStation': '🎮',
      'Nintendo Switch': '🕹️',
      'PC': '💻',
      'Xbox': '🎯',
      'Mobile': '📱'
    };
    
    return platforms.map(platform => iconMap[platform] || '🎮').join(' ');
  };

  if (layout === 'compact') {
    return (
      <div className={`${styles.productCard} ${styles.compact}`}>
        <div className={styles.productImage}>
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={imageLoaded ? styles.loaded : styles.loading}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>📦</span>
            </div>
          )}
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.productTitle}>
            {customTitle || product.title}
          </h4>
          <div className={styles.platforms}>
            {getPlatformIcon(product.platforms || [])} 
            {product.platforms?.join(', ')}
          </div>
          <a
            href={getAmazonUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.amazonButton}
          >
            Amazonで詳細を見る
          </a>
        </div>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div className={`${styles.productCard} ${styles.inline}`}>
        <div className={styles.inlineContent}>
          <div className={styles.productImageSmall}>
            {!imageError ? (
              <img
                src={product.imageUrl}
                alt={product.title}
                onError={() => setImageError(true)}
              />
            ) : (
              <span>📦</span>
            )}
          </div>
          <div className={styles.inlineInfo}>
            <span className={styles.productTitleSmall}>
              {customTitle || product.title}
            </span>
            <a
              href={getAmazonUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.inlineButton}
            >
              Amazon →
            </a>
          </div>
        </div>
      </div>
    );
  }

  // detailed layout (default)
  return (
    <div className={`${styles.productCard} ${styles.detailed}`}>
      <div className={styles.cardHeader}>
        <span className={styles.prLabel}>🛍️ 関連商品</span>
      </div>
      
      <div className={styles.productContent}>
        <div className={styles.productImage}>
          {!imageError ? (
            <img
              src={product.imageUrl}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={imageLoaded ? styles.loaded : styles.loading}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              <span>📦</span>
              <p>画像を読み込めませんでした</p>
            </div>
          )}
        </div>
        
        <div className={styles.productDetails}>
          <h3 className={styles.productTitle}>
            {customTitle || product.title}
          </h3>
          
          {/* {product.platforms && product.platforms.length > 0 && (
            <div className={styles.platforms}>
              <span className={styles.platformIcon}>
                {getPlatformIcon(product.platforms)}
              </span>
              <span className={styles.platformText}>
                対応: {product.platforms.join(', ')}
              </span>
            </div>
          )}
          
          {product.categories && product.categories.length > 0 && (
            <div className={styles.categories}>
              {product.categories.map((category, index) => (
                <span key={index} className={styles.categoryTag}>
                  {category}
                </span>
              ))}
            </div>
          )}
          
          {showDescription && (
            <div className={styles.description}>
              <p>この商品は記事で紹介されているゲーム関連商品です。</p>
            </div>
          )} */}
          
          <div className={styles.actions}>
            <a
              href={getAmazonUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.amazonButton}
            >
              <span className={styles.amazonIcon}>🛒</span>
              Amazonで見る
            </a>
            <span className={styles.disclaimer}>
              ※Amazon.co.jpアソシエイト
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmazonProductCard;
