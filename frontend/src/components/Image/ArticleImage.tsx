import React, { useState } from 'react';
import Image from 'next/image';
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

  const baseImageProps = {
    src: imageSrc,
    alt,
    onError: handleError,
    priority,
    className: `${styles.image} ${className}`,
  };

  if (fill) {
    return (
      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
        <Image
          {...baseImageProps}
          fill
          style={{ 
            objectFit,
            objectPosition
          }}
        />
      </div>
    );
  }

  return (
    <Image
      {...baseImageProps}
      width={width}
      height={height}
      style={{ 
        objectFit,
        objectPosition,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default ArticleImage;
