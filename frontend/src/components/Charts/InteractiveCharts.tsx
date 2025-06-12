// src/components/Charts/InteractiveCharts.tsx
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import styles from './InteractiveCharts.module.css';
import { TooltipItem } from 'chart.js';

interface ChartDataset {
  label: string;
  data: number[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  fill?: boolean;
  tension?: number;
  pointBackgroundColor?: string;
  pointBorderColor?: string;
  pointBorderWidth?: number;
  pointRadius?: number;
  pointHoverRadius?: number;
}

interface ChartConfig {
  type: 'line' | 'bar' | 'doughnut' | 'radar' | 'pie';
  title: string;
  labels: string[];
  datasets: ChartDataset[];
  source?: string;
  yAxisLabel?: string;
  yAxisMax?: number;
  yAxisFormat?: 'number' | 'percentage' | 'count';
}

interface InteractiveChartsProps {
  configs: ChartConfig[];
  sectionTitle?: string;
  sectionDescription?: string;
  summaryData?: Array<{
    label: string;
    value: string;
  }>;
}

const InteractiveCharts: React.FC<InteractiveChartsProps> = ({
  configs,
  sectionTitle = "関連データ分析",
  sectionDescription = "最新データに基づく詳細分析",
  summaryData
}) => {
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);

  useEffect(() => {
    const charts: Chart[] = [];

    configs.forEach((config, index) => {
      const canvas = chartRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Y軸フォーマット関数
      const formatYAxisValue = (value: number) => {
        switch (config.yAxisFormat) {
          case 'count':
            return value.toLocaleString() + '人';
          case 'percentage':
            return value + '%';
          default:
            return value.toLocaleString();
        }
      };

    // 共通オプション
    const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
        display: config.type !== 'line',
        position: config.type === 'doughnut' ? 'bottom' as const : 'top' as const,
        labels: {
            padding: 20,
            usePointStyle: config.type === 'doughnut'
        }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: '#3498db',
          borderWidth: 1,
          callbacks: {
            label: function(context: TooltipItem<'line' | 'bar' | 'doughnut' | 'radar' | 'pie'>) {
              const value = context.parsed.y || context.parsed;
              switch (config.yAxisFormat) {
                case 'count':
                  return `${context.label}: ${value.toLocaleString()}人`;
                case 'percentage':
                  return `${context.label}: ${value}%`;
                default:
                  return `${context.label}: ${value.toLocaleString()}`;
              }
            }
          }
        }
    },
    animation: {
        duration: config.type === 'bar' ? 1500 : 2000,
        easing: config.type === 'bar' ? 'easeOutBounce' as const : 'easeInOutQuart' as const
    }
    };

      // タイプ別の特別なオプション
      let typeSpecificOptions = {};
      
      if (config.type === 'line' || config.type === 'bar') {
        typeSpecificOptions = {
          scales: {
            y: {
              beginAtZero: config.type === 'bar',
              max: config.yAxisMax,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              ticks: {
                callback: function(value: number): string {
                  return formatYAxisValue(value);
                }
              }
            },
            x: {
              grid: {
                display: config.type === 'line' ? false : true,
                color: 'rgba(0, 0, 0, 0.05)'
              }
            }
          }
        };
      } else if (config.type === 'radar') {
        typeSpecificOptions = {
          scales: {
            r: {
              beginAtZero: true,
              max: config.yAxisMax || 100,
              grid: {
                color: 'rgba(0, 0, 0, 0.1)'
              },
              pointLabels: {
                font: {
                  size: 12
                }
              },
              ticks: {
                display: false
              }
            }
          }
        };
      }

      const chart = new Chart(ctx, {
        type: config.type,
        data: {
          labels: config.labels,
          datasets: config.datasets
        },
        options: {
          ...commonOptions,
          ...typeSpecificOptions
        }
      });

      charts.push(chart);
    });

    // クリーンアップ
    return () => {
      charts.forEach(chart => chart.destroy());
    };
  }, [configs]);

  return (
    <div className={styles.chartsWrapper}>
      <div className={styles.sectionTitle}>
        <h2>{sectionTitle}</h2>
        <p>{sectionDescription}</p>
      </div>

      <div className={styles.chartsGrid}>
        {configs.map((config, index) => (
          <div key={index} className={styles.chartSection}>
            <h3 className={styles.chartTitle}>{config.title}</h3>
            <div className={styles.chartContainer}>
              <canvas 
                ref={el => {
                  if (el) {
                    chartRefs.current[index] = el;
                  }
                }}
                className={styles.chartCanvas}
              />
            </div>
            {config.source && (
              <p className={styles.chartSource}>出典: {config.source}</p>
            )}
          </div>
        ))}
      </div>

      {summaryData && (
        <div className={styles.analysisNote}>
          <h3>分析結果サマリー</h3>
          <div className={styles.dataGrid}>
            {summaryData.map((item, index) => (
              <div key={index} className={styles.dataItem}>
                <span className={styles.dataLabel}>{item.label}</span>
                <span className={styles.dataValue}>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveCharts;
