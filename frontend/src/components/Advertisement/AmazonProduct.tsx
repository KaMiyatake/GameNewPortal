// components/Advertisement/AmazonProduct.tsx
import React from 'react';
import Image from 'next/image';
import styles from './AmazonProduct.module.css';

interface AmazonProductProps {
  asin: string;
  title: string;
  imageUrl: string;
  affiliateTag: string;
}

const AmazonProduct: React.FC<AmazonProductProps> = ({
  asin,
  title,
  imageUrl,
  affiliateTag
}) => {
  const amazonUrl = `https://www.amazon.co.jp/dp/${asin}?tag=${affiliateTag}`;

  return (
    <div className={styles.amazonProduct}>
      <a 
        href={amazonUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className={styles.productLink}
        aria-label={`${title}をAmazonで見る`}
      >
        <div className={styles.productImage}>
          <Image
            src={imageUrl}
            alt={title}
            width={100}
            height={100}
            className={styles.image}
            loading="lazy"
          />
        </div>
        <div className={styles.productInfo}>
          <h4 className={styles.productTitle}>{title}</h4>
          <span className={styles.buyButton}>
            🛒 Amazonで見る
          </span>
        </div>
      </a>
    </div>
  );
};

export default AmazonProduct;
