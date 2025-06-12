// src/components/Charts/InteractiveCharts.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import Chart from 'chart.js/auto';
import styles from './InteractiveCharts.module.css';
import type { TooltipItem, ChartOptions, ChartConfiguration, Chart as ChartType } from 'chart.js';

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

interface ThemeColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  purple: string;
  text: string;
  textSecondary: string;
  grid: string;
  gridLight: string;
  tooltip: string;
  tooltipBorder: string;
}

const InteractiveCharts: React.FC<InteractiveChartsProps> = ({
  configs,
  sectionTitle = "関連データ分析",
  sectionDescription = "最新データに基づく詳細分析",
  summaryData
}) => {
  const chartRefs = useRef<(HTMLCanvasElement | null)[]>([]);
  const chartInstancesRef = useRef<Chart[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ダークモード用カラーパレット
  const getThemeColors = useCallback((): ThemeColors => {
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
  }, [isDarkMode]);

    // 型拡張: Chart.jsの内部プロパティ用
    interface ExtendedChart extends ChartType {
    _destroyed?: boolean;
    }

  // 対策① - "存在確認付き"で安全に破棄
  const destroyCharts = useCallback(() => {
    chartInstancesRef.current.forEach((chart) => {
      try {
        const extendedChart = chart as ExtendedChart;
        /* 
         * ① Chart インスタンスが生きているか
         * ② ctx と canvas がまだ残っているか
         * ③ まだ destroy 済みでないか
         */
        if (
          chart &&
          !extendedChart._destroyed &&             // v4 では _destroyed が立つ
          chart.ctx &&                       // ctx が null でない
          chart.ctx.canvas                   // canvas が null でない
        ) {
          chart.destroy();
        }
      } catch (err) {
        console.warn('Chart destruction error:', err);
      }
    });

    // 参照をクリア
    chartInstancesRef.current = [];
  }, []);

  // モバイル検出（デバウンス付き）- レスポンシブのみでchartは再生成しない
  useEffect(() => {
    const checkMobile = () => {
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      
      resizeTimeoutRef.current = setTimeout(() => {
        const newIsMobile = window.innerWidth < 768;
        setIsMobile(newIsMobile);
      }, 150);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, []);

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

  // Y軸フォーマット関数
  const formatYAxisValue = useCallback((value: number, format?: string) => {
    switch (format) {
      case 'count':
        return value.toLocaleString() + '人';
      case 'percentage':
        return value + '%';
      default:
        return value.toLocaleString();
    }
  }, []);

  // データセット色調整関数
  const adjustDatasetColors = useCallback((
    dataset: ChartDataset, 
    chartType: string, 
    colors: ThemeColors
  ): ChartDataset => {
    const adjustedDataset = { ...dataset };
    
    if (chartType === 'line') {
      adjustedDataset.borderColor = adjustedDataset.borderColor || colors.primary;
      adjustedDataset.backgroundColor = adjustedDataset.backgroundColor || 
        `${colors.primary}20`;
      adjustedDataset.pointBackgroundColor = adjustedDataset.pointBackgroundColor || colors.primary;
      adjustedDataset.pointBorderColor = adjustedDataset.pointBorderColor || 
        (isDarkMode ? '#161b22' : '#ffffff');
    } else if (chartType === 'bar') {
      if (!adjustedDataset.backgroundColor) {
        adjustedDataset.backgroundColor = [
          `${colors.purple}cc`,
          `${colors.warning}cc`
        ];
      }
      if (!adjustedDataset.borderColor) {
        adjustedDataset.borderColor = [
          colors.purple,
          colors.warning
        ];
      }
    } else if (chartType === 'doughnut' || chartType === 'pie') {
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
    } else if (chartType === 'radar') {
      adjustedDataset.backgroundColor = adjustedDataset.backgroundColor || 
        `${colors.primary}33`;
      adjustedDataset.borderColor = adjustedDataset.borderColor || colors.primary;
      adjustedDataset.pointBackgroundColor = adjustedDataset.pointBackgroundColor || colors.primary;
      adjustedDataset.pointBorderColor = adjustedDataset.pointBorderColor || 
        (isDarkMode ? '#161b22' : '#ffffff');
    }

    return adjustedDataset;
  }, [isDarkMode]);

  // チャートオプション生成関数
  const createChartOptions = useCallback((config: ChartConfig, colors: ThemeColors): Partial<ChartOptions> => {
    const commonOptions: Partial<ChartOptions> = {
      responsive: true,
      maintainAspectRatio: false,
      resizeDelay: 200,
      
      layout: {
        padding: {
          left: isMobile ? 5 : 10,
          right: isMobile ? 5 : 10,
          top: isMobile ? 5 : 10,
          bottom: isMobile ? 5 : 10
        }
      },
      
      devicePixelRatio: typeof window !== 'undefined' ? 
        Math.min(window.devicePixelRatio || 1, 2) : 1,
      
      plugins: {
        legend: {
          display: config.type !== 'line',
          position: config.type === 'doughnut' ? 'bottom' : 'top',
          labels: {
            padding: isMobile ? 10 : 20,
            usePointStyle: config.type === 'doughnut',
            color: colors.text,
            font: {
              family: "'Segoe UI', 'Roboto', sans-serif",
              size: isMobile ? 10 : 12
            },
            boxWidth: isMobile ? 10 : 12
          }
        },
        tooltip: {
          backgroundColor: colors.tooltip,
          titleColor: '#ffffff',
          bodyColor: '#ffffff',
          borderColor: colors.tooltipBorder,
          borderWidth: 1,
          titleFont: {
            family: "'Segoe UI', 'Roboto', sans-serif",
            size: isMobile ? 11 : 13
          },
          bodyFont: {
            family: "'Segoe UI', 'Roboto', sans-serif",
            size: isMobile ? 10 : 12
          },
          caretPadding: isMobile ? 5 : 10,
            callbacks: {
            label: function(context: TooltipItem<'line' | 'bar' | 'doughnut' | 'radar' | 'pie'>) {
                let value: number;
                
                if ('y' in context.parsed) {
                // 折れ線グラフ・棒グラフの場合
                value = (context.parsed as { y: number }).y;
                } else {
                // ドーナツ・円・レーダーチャートの場合
                value = context.parsed as number;
                }

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
        duration: isMobile ? 800 : (config.type === 'bar' ? 1500 : 2000),
        easing: config.type === 'bar' ? 'easeOutBounce' : 'easeInOutQuart'
      },
      
      events: isMobile ? 
        ['touchstart', 'touchmove', 'touchend'] : 
        ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'],
      
      interaction: {
        intersect: false,
        mode: isMobile ? 'nearest' : 'index'
      }
    };

    // タイプ別オプション
    let typeSpecificOptions: Partial<ChartOptions> = {};
    
    if (config.type === 'line' || config.type === 'bar') {
      typeSpecificOptions = {
        scales: {
          y: {
            beginAtZero: config.type === 'bar',
            max: config.yAxisMax,
            border: { display: false },
            grid: {
              color: colors.grid,
              drawOnChartArea: true
            },
            ticks: {
              color: colors.textSecondary,
              font: {
                family: "'Segoe UI', 'Roboto', sans-serif",
                size: isMobile ? 9 : 11
              },
              maxTicksLimit: isMobile ? 5 : 8,
              callback: function(value) {
                return formatYAxisValue(Number(value), config.yAxisFormat);
              }
            }
          },
          x: {
            border: { display: false },
            grid: {
              display: config.type === 'line' ? false : true,
              color: colors.gridLight,
              drawOnChartArea: true
            },
            ticks: {
              color: colors.textSecondary,
              font: {
                family: "'Segoe UI', 'Roboto', sans-serif",
                size: isMobile ? 9 : 11
              },
              maxRotation: isMobile ? 45 : 0
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
            grid: { color: colors.grid },
            angleLines: { color: colors.grid },
            pointLabels: {
              color: colors.text,
              font: {
                size: isMobile ? 10 : 12,
                family: "'Segoe UI', 'Roboto', sans-serif"
              }
            },
            ticks: { display: false }
          }
        }
      };
    }

    return { ...commonOptions, ...typeSpecificOptions };
  }, [isMobile, formatYAxisValue]);

  // 対策② - Chart.js に任せて "自前 destroy" を極力減らす
  // チャート作成・更新（configs、isDarkModeの変更時のみ再生成）
  useEffect(() => {
    const colors = getThemeColors();

    configs.forEach((config, index) => {
      const canvas = chartRefs.current[index];
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx || !canvas.parentElement) return;

      // データセットの色をテーマに応じて調整
      const adjustedDatasets = config.datasets.map((dataset) => 
        adjustDatasetColors(dataset, config.type, colors)
      );

      const newData = {
        labels: config.labels,
        datasets: adjustedDatasets
      };

      const newOptions = createChartOptions(config, colors);

      // 既存チャートがあればデータとオプションを更新
      if (chartInstancesRef.current[index]) {
        try {
          const existingChart = chartInstancesRef.current[index] as ExtendedChart;
          if (
            existingChart &&
            !existingChart._destroyed &&
            existingChart.ctx &&
            existingChart.ctx.canvas
          ) {
            existingChart.data = newData;
            existingChart.options = newOptions as ChartOptions;
            existingChart.update();
            return;
          }
        } catch (error) {
          console.warn('Chart update error, recreating:', error);
          // エラーの場合は既存チャートを削除して新規作成
          try {
            if (chartInstancesRef.current[index]) {
              chartInstancesRef.current[index].destroy();
            }
          } catch (destroyError) {
            console.warn('Chart destroy error:', destroyError);
          }
        }
      }

      // 新規チャート作成
      try {
        const chartConfig: ChartConfiguration = {
          type: config.type,
          data: newData,
          options: newOptions as ChartOptions
        };

        const chart = new Chart(ctx, chartConfig);
        chartInstancesRef.current[index] = chart;
      } catch (error) {
        console.error('Chart creation error:', error);
      }
    });

    // 不要になったチャートインスタンスを削除
    if (chartInstancesRef.current.length > configs.length) {
      const excessCharts = chartInstancesRef.current.splice(configs.length);
      excessCharts.forEach(chart => {
        try {
          const extendedChart = chart as ExtendedChart;
          if (
            chart &&
            !extendedChart._destroyed &&
            chart.ctx &&
            chart.ctx.canvas
          ) {
            chart.destroy();
          }
        } catch (error) {
          console.warn('Excess chart destruction error:', error);
        }
      });
    }

  }, [configs, isDarkMode, getThemeColors, adjustDatasetColors, createChartOptions]); // isMobileを依存配列から除外

  // アンマウント時のクリーンアップのみ
  useEffect(() => {
    return () => {
      destroyCharts();
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [destroyCharts]);

  return (
    <div className={styles.chartsWrapper}>
      <div className={styles.sectionTitle}>
        <h2>{sectionTitle}</h2>
        <p>{sectionDescription}</p>
      </div>

      <div className={styles.chartsGrid}>
        {configs.map((config, index) => (
          <div key={`chart-${index}`} className={styles.chartSection}>
            <h3 className={styles.chartTitle}>{config.title}</h3>
            <div className={styles.chartContainer}>
              <canvas 
                ref={(el) => {
                  if (el) {
                    chartRefs.current[index] = el;
                  }
                }}
                className={styles.chartCanvas}
                aria-label={`${config.title}のグラフ`}
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
              <div key={`summary-${index}`} className={styles.dataItem}>
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
