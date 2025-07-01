// src/components/NewsDetail/NewsContent.tsx
import React, { useEffect } from 'react';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';
import XEmbed from '../XEmbed/XEmbed';
import InteractiveCharts from '../Charts/InteractiveCharts';
import AmazonProductCard from '../ProductCard/AmazonProductCard';
import { getProductByAsin } from '../../data/amazon-products';
import styles from './NewsDetail.module.css';

interface NewsContentProps {
  content: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ content }) => {
  useEffect(() => {
    // YouTube埋め込みプレースホルダーを実際のコンポーネントに置換
    const processYouTubeEmbeds = () => {
      const embedElements = document.querySelectorAll('[data-youtube-embed]');
      
      embedElements.forEach((element) => {
        const videoId = element.getAttribute('data-youtube-embed');
        const title = element.getAttribute('data-title') || 'YouTube video';
        
        if (videoId) {
          const container = document.createElement('div');
          element.parentNode?.replaceChild(container, element);
          
          import('react-dom/client').then(({ createRoot }) => {
            const root = createRoot(container);
            root.render(
              React.createElement(YouTubeEmbed, {
                videoId,
                title,
                width: 560,
                height: 315
              })
            );
          });
        }
      });
    };

    // X埋め込みプレースホルダーを実際のコンポーネントに置換
    const processXEmbeds = () => {
      const embedElements = document.querySelectorAll('[data-x-embed]');
      
      embedElements.forEach((element) => {
        const tweetUrl = element.getAttribute('data-x-embed') ?? undefined;
        const username = element.getAttribute('data-username') ?? undefined;
        const displayName = element.getAttribute('data-display-name') ?? undefined;
        const content = element.getAttribute('data-content') ?? undefined;
        const timestamp = element.getAttribute('data-timestamp') ?? undefined;
        const embedType = (element.getAttribute('data-embed-type') as 'full' | 'simple' | 'quote') ?? 'full';
        
        if (tweetUrl) {
          const container = document.createElement('div');
          element.parentNode?.replaceChild(container, element);
          
          import('react-dom/client').then(({ createRoot }) => {
            const root = createRoot(container);
            root.render(
              React.createElement(XEmbed, {
                tweetUrl,
                username,
                displayName,
                content,
                timestamp,
                embedType
              })
            );
          });
        }
      });
    };

    // インタラクティブチャート埋め込みを処理
    const processInteractiveCharts = () => {
      const chartElements = document.querySelectorAll('[data-interactive-charts]');
      
      chartElements.forEach((element) => {
        const configsJson = element.getAttribute('data-chart-configs');
        const sectionTitle = element.getAttribute('data-section-title') || "関連データ分析";
        const sectionDescription = element.getAttribute('data-section-description') || "最新データに基づく詳細分析";
        const summaryDataJson = element.getAttribute('data-summary-data');
        
        if (configsJson) {
          try {
            const configs = JSON.parse(configsJson);
            const summaryData = summaryDataJson ? JSON.parse(summaryDataJson) : undefined;
            
            const container = document.createElement('div');
            element.parentNode?.replaceChild(container, element);
            
            import('react-dom/client').then(({ createRoot }) => {
              const root = createRoot(container);
              root.render(
                React.createElement(InteractiveCharts, {
                  configs,
                  sectionTitle,
                  sectionDescription,
                  summaryData
                })
              );
            });
          } catch (error) {
            console.error('チャート設定のパースに失敗しました:', error);
          }
        }
      });
    };

    // Amazon商品埋め込みプレースホルダーを実際のコンポーネントに置換
    const processAmazonProducts = () => {
      const productElements = document.querySelectorAll('[data-amazon-product]');
      
      productElements.forEach((element) => {
        const asin = element.getAttribute('data-amazon-product');
        const layout = (element.getAttribute('data-layout') as 'compact' | 'detailed' | 'inline') || 'detailed';
        const customTitle = element.getAttribute('data-custom-title') || undefined;
        const showDescription = element.getAttribute('data-show-description') !== 'false';
        const affiliateTag = element.getAttribute('data-affiliate-tag') || 'gamesanpi-22';
        const customUrl = element.getAttribute('data-custom-url') || undefined;
        
        if (asin) {
          const product = getProductByAsin(asin);
          
          if (product) {
            const container = document.createElement('div');
            container.className = 'amazon-product-container';
            element.parentNode?.replaceChild(container, element);
            
            import('react-dom/client').then(({ createRoot }) => {
              const root = createRoot(container);
              root.render(
                React.createElement(AmazonProductCard, {
                  product,
                  layout,
                  customTitle,
                  showDescription,
                  affiliate: {
                    tag: affiliateTag,
                    customUrl
                  }
                })
              );
            });
          } else {
            // 商品が見つからない場合のエラーハンドリング
            console.warn(`Amazon商品が見つかりませんでした: ASIN ${asin}`);
            const errorContainer = document.createElement('div');
            errorContainer.className = 'amazon-product-error';
            errorContainer.innerHTML = `
              <div style="
                padding: 16px;
                background: #fff3cd;
                border: 1px solid #ffeaa7;
                border-radius: 8px;
                color: #856404;
                font-size: 14px;
                margin: 16px 0;
              ">
                <strong>⚠️ 商品情報エラー:</strong> 指定された商品（ASIN: ${asin}）が見つかりませんでした。
              </div>
            `;
            element.parentNode?.replaceChild(errorContainer, element);
          }
        }
      });
    };

    // 複数商品表示プレースホルダーを処理
    const processMultipleAmazonProducts = () => {
      const multiProductElements = document.querySelectorAll('[data-amazon-products]');
      
      multiProductElements.forEach((element) => {
        const asinsJson = element.getAttribute('data-amazon-products');
        const layout = (element.getAttribute('data-layout') as 'compact' | 'detailed' | 'inline') || 'compact';
        const maxProducts = parseInt(element.getAttribute('data-max-products') || '3');
        const sectionTitle = element.getAttribute('data-section-title') || '関連商品';
        const affiliateTag = element.getAttribute('data-affiliate-tag') || 'gamesanpi-22';
        
        if (asinsJson) {
          try {
            const asins: string[] = JSON.parse(asinsJson);
            const products = asins
              .map(asin => getProductByAsin(asin))
              .filter((product): product is NonNullable<typeof product> => product !== null)
              .slice(0, maxProducts);
            
            if (products.length > 0) {
              const container = document.createElement('div');
              container.className = 'amazon-products-container';
              element.parentNode?.replaceChild(container, element);
              
              import('react-dom/client').then(({ createRoot }) => {
                const root = createRoot(container);
                root.render(
                  React.createElement('div', {
                    style: {
                      margin: '24px 0',
                      padding: '20px',
                      background: 'var(--card-background)',
                      borderRadius: '12px',
                      border: '1px solid var(--border-color)'
                    }
                  }, [
                    React.createElement('h3', {
                      key: 'title',
                      style: {
                        margin: '0 0 16px 0',
                        fontSize: '1.125rem',
                        fontWeight: '600',
                        color: 'var(--text-primary)'
                      }
                    }, sectionTitle),
                    React.createElement('div', {
                      key: 'products',
                      style: {
                        display: 'grid',
                        gap: '16px',
                        gridTemplateColumns: layout === 'detailed' 
                          ? '1fr' 
                          : 'repeat(auto-fit, minmax(280px, 1fr))'
                      }
                    }, products.map((product, index) =>
                      React.createElement(AmazonProductCard, {
                        key: `${product.asin}-${index}`,
                        product,
                        layout,
                        affiliate: {
                          tag: affiliateTag
                        }
                      })
                    ))
                  ])
                );
              });
            }
          } catch (error) {
            console.error('複数商品表示のパースに失敗しました:', error);
          }
        }
      });
    };

    // レスポンシブテーブル変換を処理
    const processResponsiveTables = () => {
      const tables = document.querySelectorAll('table');
      
      tables.forEach((table) => {
        // 既に処理済みかチェック
        if (table.parentElement?.classList.contains('responsive-table-wrapper')) {
          return;
        }
        
        const wrapper = document.createElement('div');
        wrapper.className = 'responsive-table-wrapper';
        wrapper.style.cssText = `
          overflow-x: auto;
          margin: 16px 0;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background: var(--card-background);
        `;
        
        table.style.cssText = `
          width: 100%;
          border-collapse: collapse;
          margin: 0;
          font-size: 14px;
        `;
        
        // テーブルヘッダーのスタイル
        const headers = table.querySelectorAll('th');
        headers.forEach((header) => {
          header.style.cssText = `
            background: var(--accent-color);
            color: white;
            padding: 12px 16px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid var(--border-color);
          `;
        });
        
        // テーブルセルのスタイル
        const cells = table.querySelectorAll('td');
        cells.forEach((cell) => {
          cell.style.cssText = `
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
          `;
        });
        
        table.parentNode?.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      });
    };

    // 画像の遅延読み込みとレスポンシブ対応
    const processImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img) => {
        // 既に処理済みかチェック
        if (img.classList.contains('processed')) {
          return;
        }
        
        img.classList.add('processed');
        
        // レスポンシブ対応
        if (!img.style.maxWidth) {
          img.style.maxWidth = '100%';
          img.style.height = 'auto';
        }
        
        // 遅延読み込み
        if ('loading' in img) {
          img.loading = 'lazy';
        }
        
        // エラーハンドリング
        img.addEventListener('error', () => {
          const placeholder = document.createElement('div');
          placeholder.style.cssText = `
            display: flex;
            align-items: center;
            justify-content: center;
            background: #f8f9fa;
            border: 2px dashed #dee2e6;
            border-radius: 8px;
            min-height: 200px;
            color: #6c757d;
            font-size: 14px;
            margin: 16px 0;
          `;
          placeholder.innerHTML = `
            <div style="text-align: center;">
              <div style="font-size: 2rem; margin-bottom: 8px;">🖼️</div>
              <div>画像を読み込めませんでした</div>
              <div style="font-size: 12px; margin-top: 4px;">${img.alt || 'No alt text'}</div>
            </div>
          `;
          img.parentNode?.replaceChild(placeholder, img);
        });
      });
    };

    // コードブロックのシンタックスハイライト
    const processCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll('pre code');
      
      codeBlocks.forEach((block) => {
        if (!block.classList.contains('processed')) {
          block.classList.add('processed');
          
          const pre = block.parentElement as HTMLPreElement;
          if (pre) {
            pre.style.cssText = `
              background: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              padding: 16px;
              overflow-x: auto;
              margin: 16px 0;
              font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
              font-size: 14px;
              line-height: 1.5;
            `;
            
            (block as HTMLElement).style.cssText = `
              color: #495057;
              background: none;
              padding: 0;
              margin: 0;
            `;
          }
        }
      });
    };

    // 引用ブロックのスタイリング
    const processBlockquotes = () => {
      const blockquotes = document.querySelectorAll('blockquote');
      
      blockquotes.forEach((quote) => {
        if (!quote.classList.contains('processed')) {
          quote.classList.add('processed');
          
          quote.style.cssText = `
            border-left: 4px solid var(--accent-color);
            background: var(--card-background);
            padding: 16px 20px;
            margin: 20px 0;
            border-radius: 0 8px 8px 0;
            font-style: italic;
            color: var(--text-secondary);
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          `;
        }
      });
    };

    // 外部リンクの処理
    const processExternalLinks = () => {
      const links = document.querySelectorAll('a[href^="http"]');
      
      links.forEach((link) => {
        if (!link.classList.contains('processed')) {
          link.classList.add('processed');
          
          // 外部リンクのマーク追加
          if (!link.textContent?.includes('🔗')) {
            link.innerHTML += ' 🔗';
          }
          
          // セキュリティ属性追加
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
          
          // スタイル適用
          (link as HTMLElement).style.cssText = `
            color: var(--accent-color);
            text-decoration: underline;
            text-decoration-color: var(--accent-color);
            text-underline-offset: 2px;
          `;
        }
      });
    };

    // DOM更新後に実行
    const timeoutId = setTimeout(() => {
      try {
        processYouTubeEmbeds();
        processXEmbeds();
        processInteractiveCharts();
        processAmazonProducts();
        processMultipleAmazonProducts();
        processResponsiveTables();
        processImages();
        processCodeBlocks();
        processBlockquotes();
        processExternalLinks();
      } catch (error) {
        console.error('コンテンツ処理中にエラーが発生しました:', error);
      }
    }, 100);

    // クリーンアップ
    return () => {
      clearTimeout(timeoutId);
    };
  }, [content]);

  return (
    <div className={styles.content}>
      {/* 記事内容をHTMLとして安全にレンダリング */}
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        className={styles.articleContent}
      />
    </div>
  );
};

export default NewsContent;
