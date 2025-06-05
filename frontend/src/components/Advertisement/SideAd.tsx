import React from 'react';
import styles from './SideAd.module.css';

interface SideAdProps {
  position: 'left' | 'right';
  // adSlot?: string;
  className?: string;
}

const SideAd: React.FC<SideAdProps> = ({ 
  position, 
  // adSlot = 'placeholder',
  className 
}) => {
  return (
    <div className={`${styles.sideAd} ${styles[position]} ${className || ''}`}>
      <div className={styles.adContainer}>
        <div className={styles.adLabel}>
          広告
        </div>
        <div className={styles.adContent}>
          {/* プレースホルダー広告 */}
          <div className={styles.placeholder}>
            <div className={styles.placeholderIcon}>📺</div>
            <div className={styles.placeholderText}>
              <p>広告スペース</p>
              <p className={styles.adSize}>160×600</p>
            </div>
          </div>
          
          {/* 将来的にはここに実際の広告コードを配置 */}
          {/* 
          <ins className="adsbygoogle"
               style={{display: 'inline-block', width: '160px', height: '600px'}}
               data-ad-client="ca-pub-xxxxxxxxxx"
               data-ad-slot={adSlot}>
          </ins>
          */}
        </div>
      </div>
    </div>
  );
};

export default SideAd;
