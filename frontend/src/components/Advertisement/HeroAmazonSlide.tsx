// components/Advertisement/HeroAmazonSlide.tsx（修正版）
import React from 'react';
import Image from 'next/image';
import styles from './HeroAmazonSlide.module.css';
import { GameProductLite } from '../../data/amazon-products';

interface HeroAmazonSlideProps {
  product: GameProductLite;
  affiliateTag: string;
}

const HeroAmazonSlide: React.FC<HeroAmazonSlideProps> = ({
  product,
  affiliateTag
}) => {
  const amazonUrl = `https://www.amazon.co.jp/dp/${product.asin}?tag=${affiliateTag}`;

  return (
    <div className={styles.heroAmazonSlide}>
      <a 
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={styles.slideLink}
        aria-label={`${product.title}をAmazonで見る`}
      >
        <div className={styles.slideContent}>
          {/* 左側：画像エリア */}
          <div className={styles.imageContainer}>
            <div className={styles.imageWrapper}>
              <Image
                src={product.imageUrl}
                alt={product.title}
                width={150}
                height={150}
                className={styles.productImage}
                loading="lazy"
              />
            </div>
          </div>
          
          {/* 右側：商品情報エリア */}
          <div className={styles.productInfo}>
            <h3 className={styles.productTitle}>{product.title}</h3>
            <div className={styles.buyButton}>
              🛒 Amazonで見る
            </div>
          </div>
          
          {/* PRバッジ（右上に配置） */}
          <div className={styles.prBadge}>
            PR
          </div>
        </div>
      </a>
    </div>
  );
};

export default HeroAmazonSlide;
