// frontend/src/components/HeroSlider/index.tsx

import React from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import { getCategoryUrl } from '../../utils/category-utils';
import styles from './HeroSlider.module.css';
import { NewsItem } from '../../types';

// Swiperのスタイルをインポート
import 'swiper/css';
import 'swiper/css/navigation';

interface HeroSliderProps {
  featuredNews: NewsItem[];
}

const HeroSlider: React.FC<HeroSliderProps> = ({ featuredNews }) => {
  return (
    <div className={styles.heroSlider}>
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={12}
          slidesPerView={4}
          loop={true}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          navigation={{
            nextEl: `.${styles.swiperButtonNext}`,
            prevEl: `.${styles.swiperButtonPrev}`,
          }}
          speed={600}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 8,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 12,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
          }}
          className={styles.swiper}
        >
          {featuredNews.map((news) => (
            <SwiperSlide key={news.id}>
              <div className={styles.newsItem}>
                <Link href={`/news/${news.slug}`} passHref>
                  <div className={styles.newsCard}>
                    <div className={styles.imageContainer}>
                      <img src={news.imageUrl} alt={news.title} />
                      <div className={styles.imageOverlay}></div>
                      <div className={styles.newsInfo}>
                        <Link href={getCategoryUrl(news.category)} passHref>
                          <span className={styles.newsCategory}>{news.category}</span>
                        </Link>
                        <h3 className={styles.newsTitle}>{news.title}</h3>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* カスタムナビゲーションボタン */}
        <div className={styles.swiperButtonPrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={styles.swiperButtonNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSlider;
