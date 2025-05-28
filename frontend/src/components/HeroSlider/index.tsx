// components/HeroSlider/index.tsx - 条件付きローディング版
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { NewsItem } from '../../types';
import styles from './HeroSlider.module.css';

const HeroSliderComponent = dynamic(
  () => import('./HeroSlider'),
  { 
    ssr: false,
    loading: () => (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>読み込み中...</p>
      </div>
    )
  }
);

interface HeroSliderProps {
  featuredNews: NewsItem[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ featuredNews }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // サーバーサイドでは簡易版を表示
  if (!mounted) {
    return (
      <div className={styles.heroSlider}>
        <div className={styles.staticHero}>
          <div className={styles.heroGrid}>
            {featuredNews.slice(0, 4).map((news) => (
              <div key={news.id} className={styles.heroCard}>
                <div className={styles.imageContainer}>
                  <img src={news.imageUrl} alt={news.title} />
                  <div className={styles.cardContent}>
                    <span className={styles.category}>{news.category}</span>
                    <h3 className={styles.title}>{news.title}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return <HeroSliderComponent featuredNews={featuredNews} />;
};

export default HeroSlider;
