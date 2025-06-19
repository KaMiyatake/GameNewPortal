// components/Advertisement/SmartAmazonAds.tsx（修正版）
import React, { useMemo, useEffect, useState } from 'react';
import AmazonProduct from './AmazonProduct';
import { 
  gameProducts, 
  getProductsByCategory, 
  getProductsByPlatform, 
  GameProductLite 
} from '../../data/amazon-products';
import styles from './SmartAmazonAds.module.css';

interface SmartAmazonAdsProps {
  currentCategory?: string;
  currentArticleTags?: string[];
  maxProducts?: number;
  affiliateTag: string;
}

const SmartAmazonAds: React.FC<SmartAmazonAdsProps> = ({
  currentCategory,
  currentArticleTags = [],
  maxProducts = 3,
  affiliateTag
}) => {
  const [isClient, setIsClient] = useState(false);

  // クライアントサイドでのみ実行
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 決定論的な商品選択（ランダムを使わない）
  const relevantProducts = useMemo((): GameProductLite[] => {
    // 1. カテゴリーベースの商品選択
    if (currentCategory) {
      const categoryProducts = getProductsByCategory(currentCategory, maxProducts);
      if (categoryProducts.length >= maxProducts) {
        return categoryProducts;
      }
      
      // プラットフォームベースでも検索
      const platformProducts = getProductsByPlatform(currentCategory, maxProducts);
      if (platformProducts.length > 0) {
        return platformProducts;
      }
    }

    // 2. タグベースの商品選択
    if (currentArticleTags.length > 0) {
      const tagBasedProducts = gameProducts.filter(product =>
        currentArticleTags.some(tag => {
          const lowerTag = tag.toLowerCase();
          return product.title.toLowerCase().includes(lowerTag) ||
                 product.categories?.some(cat => cat.toLowerCase().includes(lowerTag)) ||
                 product.platforms?.some(platform => platform.toLowerCase().includes(lowerTag));
        })
      );
      
      if (tagBasedProducts.length > 0) {
        return tagBasedProducts.slice(0, maxProducts);
      }
    }

    // 3. フォールバック：最初の商品を固定で返す（ランダムを使わない）
    return gameProducts.slice(0, maxProducts);
  }, [currentCategory, currentArticleTags, maxProducts]);

  // クライアントサイドでのみレンダリング
  if (!isClient) {
    return null;
  }

  if (relevantProducts.length === 0) {
    return null;
  }

  return (
    <div className={styles.amazonAds}>
      <h3 className={styles.adTitle}>
        <span className={styles.adBadge}>PR</span>
        {currentCategory ? '関連商品' : 'おすすめ商品'}
      </h3>
      <div className={styles.productGrid}>
        {relevantProducts.map(product => (
          <AmazonProduct
            key={product.asin}
            asin={product.asin}
            title={product.title}
            imageUrl={product.imageUrl}
            affiliateTag={affiliateTag}
          />
        ))}
      </div>
      <p className={styles.disclaimer}>
        ※ Amazon.co.jpアソシエイト
      </p>
    </div>
  );
};

export default SmartAmazonAds;
