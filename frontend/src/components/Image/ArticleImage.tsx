import React, { useState } from 'react';
import { getPlaceholderImage } from '../../utils/image-paths';
import styles from './ArticleImage.module.css';

interface ArticleImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  fill?: boolean;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  objectPosition?: string;
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  width = 600,
  height = 338,
  priority = false,
  className = '',
  fill = false,
  objectFit = 'cover',
  objectPosition = 'center'
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImageSrc(getPlaceholderImage(width, height));
    }
  };

  const imageStyle: React.CSSProperties = {
    objectFit,
    objectPosition,
    width: fill ? '100%' : width,    // fillに基づいて幅を設定
    height: fill ? '100%' : height,   // fillに基づいて高さを設定
    position: fill ? 'absolute' : 'relative',  // fillがtrueの場合は絶対配置
  };

  return (
    <img
      src={imageSrc}
      alt={alt}
      onError={handleError}
      className={`${styles.image} ${className}`}
      style={imageStyle}
      loading={priority ? 'eager' : 'lazy'}
    />
  );
};

export default ArticleImage;
