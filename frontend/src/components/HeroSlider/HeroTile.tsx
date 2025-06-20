// components/HeroSlider/HeroTile.tsx （構造修正版）
import React from 'react';
import Link from 'next/link';
import { NewsItem } from '../../types';
import { GameProductLite } from '../../data/amazon-products';
import styles from './HeroTile.module.css';

interface NewsHeroTileProps {
  type: 'news';
  data: NewsItem;
}

interface AdHeroTileProps {
  type: 'ad';
  data: GameProductLite;
  affiliateTag: string;
}

type HeroTileProps = NewsHeroTileProps | AdHeroTileProps;

const HeroTile: React.FC<HeroTileProps> = (props) => {
  if (props.type === 'news') {
    return (
      <Link href={`/news/${props.data.slug}`} className={styles.tileLink}>
        <div className={styles.heroTile}>
          <div className={styles.imageContainer}>
            <img 
              src={props.data.imageUrl} 
              alt={props.data.title}
              className={styles.image}
            />
            <div className={styles.imageOverlay} />
            <div className={styles.tileInfo}>
              <h3 className={styles.tileTitle}>{props.data.title}</h3>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // 広告タイル（構造を簡素化）
  const amazonUrl = `https://www.amazon.co.jp/dp/${props.data.asin}?tag=${props.affiliateTag}`;
  
  return (
    <a 
      href={amazonUrl}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className={styles.tileLink}
    >
      <div className={`${styles.heroTile} ${styles.adTile}`}>
        {/* PRラベルを最前面に配置 */}
        <div className={styles.prBadge}>PR</div>
        
        {/* 画像を直接配置（ラッパーを簡素化） */}
        <img 
          src={props.data.imageUrl} 
          alt={props.data.title}
          className={styles.adImage}
        />
        
        {/* オーバーレイとテキスト情報 */}
        <div className={styles.adOverlay} />
        <div className={styles.tileInfo}>
          <h3 className={styles.tileTitle}>{props.data.title}</h3>
          <div className={styles.buyButton}>
            🛒 Amazonで見る
          </div>
        </div>
      </div>
    </a>
  );
};

export default HeroTile;