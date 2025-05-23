import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroSlider.module.css';
import { NewsItem } from '../../types';

interface HeroSliderProps {
  featuredNews: NewsItem[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ featuredNews }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoSliding, setIsAutoSliding] = useState(true);

  // 自動スライド機能
  useEffect(() => {
    if (!isAutoSliding || featuredNews.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % featuredNews.length);
    }, 5000); // 5秒ごとにスライド

    return () => clearInterval(interval);
  }, [isAutoSliding, featuredNews.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoSliding(false);
  };

  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % featuredNews.length);
    setIsAutoSliding(false);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + featuredNews.length) % featuredNews.length);
    setIsAutoSliding(false);
  };

  if (!featuredNews.length) return null;

  return (
    <div className={styles.heroSlider}>
      <div className={styles.sliderContainer}>
        <div 
          className={styles.slidesWrapper}
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {featuredNews.map((news, index) => (
            <div key={news.id} className={styles.slide}>
              <Link href={`/news/${news.slug}`} passHref>
                <div className={styles.slideContent}>
                  <div className={styles.slideImage}>
                    <img src={news.imageUrl} alt={news.title} />
                    <div className={styles.imageOverlay}></div>
                  </div>
                  <div className={styles.slideInfo}>
                    <span className={styles.slideCategory}>{news.category}</span>
                    <h2 className={styles.slideTitle}>{news.title}</h2>
                    <p className={styles.slideSummary}>{news.summary}</p>
                    <div className={styles.slideFooter}>
                      <span className={styles.slideDate}>{news.date}</span>
                      <span className={styles.readMoreText}>続きを読む →</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* ナビゲーションボタン */}
        <button 
          className={`${styles.navButton} ${styles.prevButton}`}
          onClick={prevSlide}
          aria-label="前のスライド"
        >
          &#8249;
        </button>
        
        <button 
          className={`${styles.navButton} ${styles.nextButton}`}
          onClick={nextSlide}
          aria-label="次のスライド"
        >
          &#8250;
        </button>

        {/* インジケーター */}
        <div className={styles.indicators}>
          {featuredNews.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === currentSlide ? styles.active : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`スライド ${index + 1} に移動`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
