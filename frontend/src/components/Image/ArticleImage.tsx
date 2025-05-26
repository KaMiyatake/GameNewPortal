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
}

const ArticleImage: React.FC<ArticleImageProps> = ({
  src,
  alt,
  width = 600,
  height = 338,
  priority = false,
  className = '',
  fill = false
}) => {
  const [imageSrc, setImageSrc] = useState(src);
  const [isError, setIsError] = useState(false);

  const handleError = () => {
    if (!isError) {
      setIsError(true);
      setImageSrc(getPlaceholderImage(width, height));
    }
  };

  const imageProps = {
    src: imageSrc,
    alt,
    onError: handleError,
    priority,
    className: `${styles.image} ${className}`,
  };

  if (fill) {
    return (
      <Image
        {...imageProps}
        fill
        style={{ objectFit: 'cover' }}
      />
    );
  }

  return (
    <Image
      {...imageProps}
      width={width}
      height={height}
    />
  );
};

export default ArticleImage;
