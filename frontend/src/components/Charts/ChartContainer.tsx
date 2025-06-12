undefined// src/components/Charts/ChartContainer.tsx
import React, { useEffect, useRef } from 'react';
//import Chart from 'chart.js/auto';
import styles from './ChartContainer.module.css';

interface ChartContainerProps {
  chartId: string;
  title: string;
  source?: string;
  children: React.ReactNode;
}

const ChartContainer: React.FC<ChartContainerProps> = ({ 
  chartId, 
  title, 
  source, 
  children 
}) => {
  return (
    <div className={styles.chartSection}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartContainer}>
        {children}
      </div>
      {source && (
        <p className={styles.chartSource}>出典: {source}</p>
      )}
    </div>
  );
};

export default ChartContainer;