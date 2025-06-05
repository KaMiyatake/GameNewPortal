import React from 'react';
import styles from './SideAd.module.css';

interface SideAdProps {
  position: 'left' | 'right';
}

const SideAd: React.FC<SideAdProps> = ({ position }) => {
  const adClass = `${styles.sideAd} ${position === 'left' ? styles.left : styles.right}`;
  return (
    <div className={adClass}>
      <div className={styles.adContent}>広告スペース</div>
    </div>
  );
};

export default SideAd;
