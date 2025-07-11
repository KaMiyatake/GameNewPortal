// src/components/NewsDetail/NewsContent.tsx の完全修正版
import React, { useEffect, useState, useCallback } from 'react';
import YouTubeEmbed from '../YouTubeEmbed/YouTubeEmbed';
import XEmbed from '../XEmbed/XEmbed';
import InteractiveCharts from '../Charts/InteractiveCharts';
import AmazonProductCard from '../ProductCard/AmazonProductCard';
import ImageModal from '../ImageModal/ImageModal';
import { getProductByAsin } from '../../data/amazon-products';
import styles from './NewsDetail.module.css';

interface NewsContentProps {
  content: string;
}

const NewsContent: React.FC<NewsContentProps> = ({ content }) => {
  // 画像モーダルの状態管理
  const [modalImage, setModalImage] = useState<{ src: string; alt: string } | null>(null);
  
  // 画像クリックハンドラー（useCallbackで安定化）
  const handleImageClick = useCallback((src: string, alt: string) => {
    console.log('画像がクリックされました:', src);
    setModalImage({ src, alt });
  }, []);

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
      
      console.log('Amazon商品要素を検索中...', productElements.length, '個見つかりました');
      
      productElements.forEach((element, index) => {
        const asin = element.getAttribute('data-amazon-product');
        const layout = (element.getAttribute('data-layout') as 'compact' | 'detailed' | 'inline') || 'detailed';
        const customTitle = element.getAttribute('data-custom-title') || undefined;
        const showDescription = element.getAttribute('data-show-description') !== 'false';
        const affiliateTag = element.getAttribute('data-affiliate-tag') || 'gamesanpi-22';
        const customUrl = element.getAttribute('data-custom-url') || undefined;
        
        console.log(`Amazon商品処理 ${index + 1}:`, { asin, layout, customTitle });
        
        if (asin) {
          const product = getProductByAsin(asin);
          
          if (product) {
            console.log('商品データが見つかりました:', product);
            
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
        const maxProducts = parseInt(element.getAttribute('data-max-products') || '3', 10);
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
        const htmlTable = table as HTMLTableElement;
        
        // 既に処理済みかチェック
        if (htmlTable.parentElement?.classList.contains('responsive-table-wrapper')) {
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
        
        htmlTable.style.cssText = `
          width: 100%;
          border-collapse: collapse;
          margin: 0;
          font-size: 14px;
        `;
        
        // テーブルヘッダーのスタイル
        const headers = htmlTable.querySelectorAll('th');
        headers.forEach((header) => {
          const htmlHeader = header as HTMLTableCellElement;
          htmlHeader.style.cssText = `
            background: var(--accent-color);
            color: white;
            padding: 12px 16px;
            text-align: left;
            font-weight: 600;
            border-bottom: 2px solid var(--border-color);
          `;
        });
        
        // テーブルセルのスタイル
        const cells = htmlTable.querySelectorAll('td');
        cells.forEach((cell) => {
          const htmlCell = cell as HTMLTableCellElement;
          htmlCell.style.cssText = `
            padding: 12px 16px;
            border-bottom: 1px solid var(--border-color);
            vertical-align: top;
          `;
        });
        
        htmlTable.parentNode?.insertBefore(wrapper, htmlTable);
        wrapper.appendChild(htmlTable);
      });
    };

    // 画像の遅延読み込みとレスポンシブ対応
    const processImages = () => {
      const images = document.querySelectorAll('img');
      
      images.forEach((img) => {
        const htmlImg = img as HTMLImageElement;
        
        // 既に処理済みかチェック
        if (htmlImg.classList.contains('processed')) {
          return;
        }
        
        htmlImg.classList.add('processed');
        
        // レスポンシブ対応
        if (!htmlImg.style.maxWidth) {
          htmlImg.style.maxWidth = '100%';
          htmlImg.style.height = 'auto';
        }
        
        // 遅延読み込み
        if ('loading' in htmlImg) {
          htmlImg.loading = 'lazy';
        }
        
        // エラーハンドリング
        htmlImg.addEventListener('error', () => {
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
              <div style="font-size: 12px; margin-top: 4px;">${htmlImg.alt || 'No alt text'}</div>
            </div>
          `;
          htmlImg.parentNode?.replaceChild(placeholder, htmlImg);
        });
      });
    };

    // コードブロックのシンタックスハイライト
    const processCodeBlocks = () => {
      const codeBlocks = document.querySelectorAll('pre code');
      
      codeBlocks.forEach((block) => {
        const htmlBlock = block as HTMLElement;
        
        if (!htmlBlock.classList.contains('processed')) {
          htmlBlock.classList.add('processed');
          
          const pre = htmlBlock.parentElement as HTMLPreElement;
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
            
            htmlBlock.style.cssText = `
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
        const htmlQuote = quote as HTMLElement;
        
        if (!htmlQuote.classList.contains('processed')) {
          htmlQuote.classList.add('processed');
          
          htmlQuote.style.cssText = `
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

    // 外部リンクの処理（Amazon商品を除外）
    const processExternalLinks = () => {
      const links = document.querySelectorAll('a[href^="http"]');
      
      links.forEach((link) => {
        const htmlLink = link as HTMLAnchorElement;
        
        if (!htmlLink.classList.contains('processed')) {
          htmlLink.classList.add('processed');
          
          // Amazon商品リンクかチェック
          const isAmazonProduct = htmlLink.closest('.amazon-product-container');
          const isSidebarAmazon = htmlLink.closest('.sidebar') || htmlLink.closest('[class*="sidebar"]');
          const isAdvertisement = htmlLink.closest('.advertisement') || htmlLink.closest('[class*="advertisement"]') || htmlLink.closest('[class*="ad"]');
          const isAmazonButton = htmlLink.classList.contains('amazonButton') || htmlLink.querySelector('.amazonButton') || htmlLink.getAttribute('href')?.includes('amazon');
          
          // Amazon関連のリンクは外部リンクマークを付けない
          if (isAmazonProduct || isSidebarAmazon || isAdvertisement || isAmazonButton) {
            // セキュリティ属性のみ追加（マークは付けない）
            htmlLink.setAttribute('target', '_blank');
            htmlLink.setAttribute('rel', 'noopener noreferrer');
            console.log('Amazon関連リンクを検出、外部リンクマークを除外:', htmlLink.href);
            return;
          }
          
          // 通常の外部リンクのマーク追加
          if (!htmlLink.textContent?.includes('🔗')) {
            htmlLink.innerHTML += ' 🔗';
          }
          
          // セキュリティ属性追加
          htmlLink.setAttribute('target', '_blank');
          htmlLink.setAttribute('rel', 'noopener noreferrer');
          
          // スタイル適用
          htmlLink.style.cssText = `
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
        console.log('コンテンツ処理を開始します...');
        processYouTubeEmbeds();
        processXEmbeds();
        processInteractiveCharts();
        processAmazonProducts();
        processMultipleAmazonProducts();
        processResponsiveTables();
        processImages();
        processCodeBlocks();
        processBlockquotes();
        processExternalLinks(); // Amazon商品を除外するよう修正済み
        console.log('コンテンツ処理が完了しました');
      } catch (error) {
        console.error('コンテンツ処理中にエラーが発生しました:', error);
      }
    }, 100);

    // クリーンアップ
    return () => {
      clearTimeout(timeoutId);
    };
  }, [content]);

  // 画像クリック処理を別のuseEffectで管理
  useEffect(() => {
    const handleDocumentClick = (event: Event) => {
      const target = event.target as HTMLElement;
      
      // 画像要素がクリックされた場合
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        
        // 除外対象の画像をチェック（拡張版）
        const isAmazonProduct = img.closest('.amazon-product-container');
        const isYouTubeThumbnail = img.closest('.youtube-embed');
        const isXEmbed = img.closest('.x-embed');
        const isSidebarAmazon = img.closest('.sidebar') || img.closest('[class*="sidebar"]');
        const isAdvertisement = img.closest('.advertisement') || img.closest('[class*="advertisement"]') || img.closest('[class*="ad"]');
        
        // Amazon関連の画像は全て除外
        if (isAmazonProduct || isSidebarAmazon || isAdvertisement || isYouTubeThumbnail || isXEmbed) {
          console.log('除外対象の画像がクリックされました:', {
            isAmazonProduct: !!isAmazonProduct,
            isSidebarAmazon: !!isSidebarAmazon,
            isAdvertisement: !!isAdvertisement,
            isYouTubeThumbnail: !!isYouTubeThumbnail,
            isXEmbed: !!isXEmbed
          });
          return;
        }
        
        // 記事内の画像またはメイン画像かチェック
        const isArticleImage = img.closest(`.${styles.articleContent}`);
        const isMainImage = img.closest('.featuredImage') || img.closest('[class*="featuredImage"]') || img.closest('[class*="newsImage"]');
        
        // 記事ページのメインコンテンツ内の画像かチェック
        const isMainContentImage = img.closest('.mainContent') || img.closest('[class*="mainContent"]') || img.closest('main');
        
        if (!isArticleImage && !isMainImage && !isMainContentImage) {
          console.log('記事関連の画像ではないためスキップ');
          return;
        }
        
        event.preventDefault();
        event.stopPropagation();
        
        console.log('記事画像がクリックされました:', img.src);
        handleImageClick(img.src, img.alt || '画像');
      }
    };

    // 画像のホバー効果を管理
    const handleDocumentMouseOver = (event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        
        // 除外対象の画像をチェック（拡張版）
        const isAmazonProduct = img.closest('.amazon-product-container');
        const isYouTubeThumbnail = img.closest('.youtube-embed');
        const isXEmbed = img.closest('.x-embed');
        const isSidebarAmazon = img.closest('.sidebar') || img.closest('[class*="sidebar"]');
        const isAdvertisement = img.closest('.advertisement') || img.closest('[class*="advertisement"]') || img.closest('[class*="ad"]');
        
        // Amazon関連の画像は全て除外
        if (isAmazonProduct || isSidebarAmazon || isAdvertisement || isYouTubeThumbnail || isXEmbed) {
          return;
        }
        
        // 記事内の画像またはメイン画像かチェック
        const isArticleImage = img.closest(`.${styles.articleContent}`);
        const isMainImage = img.closest('.featuredImage') || img.closest('[class*="featuredImage"]') || img.closest('[class*="newsImage"]');
        
        // 記事ページのメインコンテンツ内の画像かチェック
        const isMainContentImage = img.closest('.mainContent') || img.closest('[class*="mainContent"]') || img.closest('main');
        
        if (!isArticleImage && !isMainImage && !isMainContentImage) {
          return;
        }
        
        // スタイルを適用
        img.style.cursor = 'pointer';
        img.style.transition = 'all 0.3s ease';
        img.style.transform = 'scale(1.02)';
        img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        img.title = img.alt ? `${img.alt} (クリックで拡大)` : 'クリックで拡大';
      }
    };

    const handleDocumentMouseOut = (event: Event) => {
      const target = event.target as HTMLElement;
      
      if (target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        
        // 除外対象の画像をチェック（拡張版）
        const isAmazonProduct = img.closest('.amazon-product-container');
        const isYouTubeThumbnail = img.closest('.youtube-embed');
        const isXEmbed = img.closest('.x-embed');
        const isSidebarAmazon = img.closest('.sidebar') || img.closest('[class*="sidebar"]');
        const isAdvertisement = img.closest('.advertisement') || img.closest('[class*="advertisement"]') || img.closest('[class*="ad"]');
        
        // Amazon関連の画像は全て除外
        if (isAmazonProduct || isSidebarAmazon || isAdvertisement || isYouTubeThumbnail || isXEmbed) {
          return;
        }
        
        // 記事内の画像またはメイン画像かチェック
        const isArticleImage = img.closest(`.${styles.articleContent}`);
        const isMainImage = img.closest('.featuredImage') || img.closest('[class*="featuredImage"]') || img.closest('[class*="newsImage"]');
        
        // 記事ページのメインコンテンツ内の画像かチェック
        const isMainContentImage = img.closest('.mainContent') || img.closest('[class*="mainContent"]') || img.closest('main');
        
        if (!isArticleImage && !isMainImage && !isMainContentImage) {
          return;
        }
        
        // スタイルをリセット
        img.style.transform = 'scale(1)';
        img.style.boxShadow = 'none';
      }
    };

    // ドキュメントレベルでイベントリスナーを追加
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('mouseover', handleDocumentMouseOver);
    document.addEventListener('mouseout', handleDocumentMouseOut);

    // クリーンアップ
    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('mouseover', handleDocumentMouseOver);
      document.removeEventListener('mouseout', handleDocumentMouseOut);
    };
  }, [handleImageClick]);

  return (
    <div className={styles.content}>
      {/* 記事内容をHTMLとして安全にレンダリング */}
      <div 
        dangerouslySetInnerHTML={{ __html: content }}
        className={styles.articleContent}
      />
      
      {/* 画像モーダル */}
      {modalImage && (
        <ImageModal
          src={modalImage.src}
          alt={modalImage.alt}
          isOpen={!!modalImage}
          onClose={() => setModalImage(null)}
        />
      )}
    </div>
  );
};

export default NewsContent;
