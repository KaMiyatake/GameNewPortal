import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import styles from './ThemeToggle.module.css';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className={styles.themeToggle}
      onClick={toggleTheme}
      aria-label={`${theme === 'light' ? 'ダーク' : 'ライト'}モードに切り替え`}
      title={`${theme === 'light' ? 'ダーク' : 'ライト'}モードに切り替え`}
    >
      <div className={styles.toggleContainer}>
        <div className={`${styles.toggleIcon} ${styles.sunIcon} ${theme === 'light' ? styles.active : ''}`}>
          ☀️
        </div>
        <div className={`${styles.toggleIcon} ${styles.moonIcon} ${theme === 'dark' ? styles.active : ''}`}>
          🌙
        </div>
        <div className={`${styles.toggleSlider} ${theme === 'dark' ? styles.dark : ''}`}></div>
      </div>
    </button>
  );
};

export default ThemeToggle;
