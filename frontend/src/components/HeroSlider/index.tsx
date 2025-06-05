import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
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

  // サーバーサイドでは簡易版を表示（カテゴリ表示削除）
  if (!mounted) {
    return (
      <div className={styles.heroSlider}>
        <div className={styles.staticHero}>
          <div className={styles.heroGrid}>
            {featuredNews.slice(0, 3).map((news) => (
              <div key={news.id} className={styles.heroCard}>
                <Link href={`/news/${news.slug}`}>
                  <div className={styles.imageContainer}>
                    <img src={news.imageUrl} alt={news.title} />
                    <div className={styles.cardContent}>
                      {/* カテゴリ表示を削除し、タイトルのみ表示 */}
                      <h3 className={styles.title}>{news.title}</h3>
                    </div>
                  </div>
                </Link>
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
