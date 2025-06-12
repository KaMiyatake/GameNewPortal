// src/components/Charts/InteractiveCharts.tsx
import React, { useEffect, useRef, useState } from 'react';
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
  const [isDarkMode, setIsDarkMode] = useState(false);

  // ダークモード検出
  useEffect(() => {
    const checkDarkMode = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDarkMode(theme === 'dark');
    };

    checkDarkMode();

    // テーマ変更の監視
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, { 
      attributes: true, 
      attributeFilter: ['data-theme'] 
    });

    return () => observer.disconnect();
  }, []);

  // ダークモード用カラーパレット
  const getThemeColors = () => {
    if (isDarkMode) {
      return {
        // ダークモード配色
        primary: '#58a6ff',
        secondary: '#8b5cf6', 
        success: '#39d353',
        warning: '#f0883e',
        danger: '#f85149',
        purple: '#a5a5ff',
        text: '#e1e1e1',
        textSecondary: '#8b949e',
        grid: 'rgba(139, 148, 158, 0.2)',
        gridLight: 'rgba(139, 148, 158, 0.1)',
        tooltip: 'rgba(22, 27, 34, 0.95)',
        tooltipBorder: '#58a6ff'
      };
    } else {
      return {
        // ライトモード配色
        primary: '#3498db',
        secondary: '#9b59b6',
        success: '#2ecc71',
        warning: '#f39c12',
        danger: '#e74c3c',
        purple: '#8e44ad',
        text: '#1f2937',
        textSecondary: '#6b7280',
        grid: 'rgba(0, 0, 0, 0.1)',
        gridLight: 'rgba(0, 0, 0, 0.05)',
        tooltip: 'rgba(0, 0, 0, 0.8)',
        tooltipBorder: '#3498db'
      };
    }
  };

  useEffect(() => {
    const charts: Chart[] = [];
    const colors = getThemeColors();

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

      // データセットの色をテーマに応じて調整
      const adjustedDatasets = config.datasets.map((dataset, datasetIndex) => {
        const adjustedDataset = { ...dataset };
        
        // デフォルト色の適用
        if (config.type === 'line') {
          adjustedDataset.borderColor = adjustedDataset.borderColor || colors.primary;
          adjustedDataset.backgroundColor = adjustedDataset.backgroundColor || 
            `${colors.primary}20`; // 透明度20%
          adjustedDataset.pointBackgroundColor = adjustedDataset.pointBackgroundColor || colors.primary;
          adjustedDataset.pointBorderColor = adjustedDataset.pointBorderColor || 
            (isDarkMode ? '#161b22' : '#ffffff');
        } else if (config.type === 'bar') {
          if (!adjustedDataset.backgroundColor) {
            adjustedDataset.backgroundColor = [
              `${colors.purple}cc`, // 透明度80%
              `${colors.warning}cc`
            ];
          }
          if (!adjustedDataset.borderColor) {
            adjustedDataset.borderColor = [
              colors.purple,
              colors.warning
            ];
          }
        } else if (config.type === 'doughnut' || config.type === 'pie') {
          if (!adjustedDataset.backgroundColor) {
            adjustedDataset.backgroundColor = [
              `${colors.primary}cc`,
              `${colors.gridLight}cc`
            ];
          }
          if (!adjustedDataset.borderColor) {
            adjustedDataset.borderColor = [
              colors.primary,
              colors.textSecondary
            ];
          }
        } else if (config.type === 'radar') {
          adjustedDataset.backgroundColor = adjustedDataset.backgroundColor || 
            `${colors.primary}33`; // 透明度20%
          adjustedDataset.borderColor = adjustedDataset.borderColor || colors.primary;
          adjustedDataset.pointBackgroundColor = adjustedDataset.pointBackgroundColor || colors.primary;
          adjustedDataset.pointBorderColor = adjustedDataset.pointBorderColor || 
            (isDarkMode ? '#161b22' : '#ffffff');
        }

        return adjustedDataset;
      });

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
              usePointStyle: config.type === 'doughnut',
              color: colors.text,
              font: {
                family: "'Segoe UI', 'Roboto', sans-serif"
              }
            }
          },
          tooltip: {
            backgroundColor: colors.tooltip,
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: colors.tooltipBorder,
            borderWidth: 1,
            titleFont: {
              family: "'Segoe UI', 'Roboto', sans-serif"
            },
            bodyFont: {
              family: "'Segoe UI', 'Roboto', sans-serif"
            },
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
                color: colors.grid,
                drawBorder: false
              },
              ticks: {
                color: colors.textSecondary,
                font: {
                  family: "'Segoe UI', 'Roboto', sans-serif"
                },
                callback: function(value: number): string {
                  return formatYAxisValue(value);
                }
              }
            },
            x: {
              grid: {
                display: config.type === 'line' ? false : true,
                color: colors.gridLight,
                drawBorder: false
              },
              ticks: {
                color: colors.textSecondary,
                font: {
                  family: "'Segoe UI', 'Roboto', sans-serif"
                }
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
                color: colors.grid
              },
              angleLines: {
                color: colors.grid
              },
              pointLabels: {
                color: colors.text,
                font: {
                  size: 12,
                  family: "'Segoe UI', 'Roboto', sans-serif"
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
          datasets: adjustedDatasets
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
  }, [configs, isDarkMode]); // isDarkModeを依存配列に追加

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
