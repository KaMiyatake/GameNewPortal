// components/HeroSlider/HeroSlider.tsx（型定義修正版）
import React, { useMemo } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import HeroAmazonSlide from '../Advertisement/HeroAmazonSlide';
import { getRandomProducts, GameProductLite } from '../../data/amazon-products';
import styles from './HeroSlider.module.css';
import { NewsItem } from '../../types';

// Swiperのスタイルをインポート
import 'swiper/css';
import 'swiper/css/navigation';

interface HeroSliderProps {
  featuredNews: NewsItem[];
}

interface NewsSlideItem {
  type: 'news';
  data: NewsItem;
  id: string;
}

interface AdSlideItem {
  type: 'ad';
  data: GameProductLite;
  id: string;
}

// Union型でスライドアイテムを定義
type SlideItem = NewsSlideItem | AdSlideItem;

const HeroSlider: React.FC<HeroSliderProps> = ({ featuredNews }) => {
  const affiliateTag = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || 'your-affiliate-tag';

  // 記事2つ → 広告1つの比率で混合
  const mixedSlides = useMemo((): SlideItem[] => {
    const slides: SlideItem[] = [];
    const amazonProducts = getRandomProducts(Math.ceil(featuredNews.length / 2));
    let productIndex = 0;
    let newsCount = 0;

    for (let i = 0; i < featuredNews.length; i++) {
      // 記事スライドを追加
      slides.push({
        type: 'news',
        data: featuredNews[i],
        id: `news-${featuredNews[i].id}`
      });
      newsCount++;

      // 2つの記事の後に広告を挿入
      if (newsCount === 2 && productIndex < amazonProducts.length) {
        slides.push({
          type: 'ad',
          data: amazonProducts[productIndex],
          id: `ad-${amazonProducts[productIndex].asin}`
        });
        productIndex++;
        newsCount = 0; // カウンタをリセット
      }
    }

    return slides;
  }, [featuredNews]);

  return (
    <div className={styles.heroSlider}>
      <div className={styles.sliderContainer}>
        <Swiper
          modules={[Autoplay, Navigation]}
          spaceBetween={6}
          slidesPerView={3}
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
              spaceBetween: 4,
            },
            576: {
              slidesPerView: 2,
              spaceBetween: 5,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 6,
            },
          }}
          className={styles.swiper}
        >
          {mixedSlides.map((slide) => (
            <SwiperSlide key={slide.id}>
              {slide.type === 'news' ? (
                <div className={styles.newsItem}>
                  <Link href={`/news/${slide.data.slug}`} passHref>
                    <div className={styles.newsCard}>
                      <div className={styles.imageContainer}>
                        <img src={slide.data.imageUrl} alt={slide.data.title} />
                        <div className={styles.imageOverlay}></div>
                        <div className={styles.newsInfo}>
                          <h3 className={styles.newsTitle}>{slide.data.title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ) : (
                <HeroAmazonSlide 
                  product={slide.data}
                  affiliateTag={affiliateTag}
                />
              )}
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
