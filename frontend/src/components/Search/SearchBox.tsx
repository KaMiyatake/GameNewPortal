// src/components/Search/SearchBox.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import styles from './SearchBox.module.css';

interface SearchBoxProps {
  onClose?: () => void;
  className?: string;
}

const SearchBox: React.FC<SearchBoxProps> = ({ onClose, className }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // 検索ボックスを展開
  const handleExpand = () => {
    setIsExpanded(true);
  };

  // 検索ボックスを閉じる
  const handleClose = () => {
    setIsExpanded(false);
    setSearchQuery('');
    onClose?.();
  };

  // 検索実行
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    
    try {
      await router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      handleClose();
    } catch (error) {
      console.error('検索エラー:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Enterキーでの検索
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch(e as unknown as React.FormEvent);
    } else if (e.key === 'Escape') {
      handleClose();
    }
  };

  // 展開時にフォーカス
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // 展開時のDOM制御（ドロップダウン無効化含む）
  useEffect(() => {
    if (isExpanded) {
      // bodyのスクロールを無効化
      document.body.style.overflow = 'hidden';
      
      // ヘッダー要素にデータ属性を追加
      const header = document.querySelector('header');
      if (header) {
        header.setAttribute('data-search-expanded', 'true');
      }
      
      // 全てのドロップダウンを強制的に閉じる
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdownContent');
        if (dropdownContent) {
          (dropdownContent as HTMLElement).style.display = 'none';
          (dropdownContent as HTMLElement).style.opacity = '0';
          (dropdownContent as HTMLElement).style.pointerEvents = 'none';
        }
      });
    } else {
      // bodyのスクロールを復活
      document.body.style.overflow = '';
      
      // ヘッダー要素からデータ属性を削除
      const header = document.querySelector('header');
      if (header) {
        header.removeAttribute('data-search-expanded');
      }
      
      // ドロップダウンの制限を解除
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdownContent');
        if (dropdownContent) {
          (dropdownContent as HTMLElement).style.display = '';
          (dropdownContent as HTMLElement).style.opacity = '';
          (dropdownContent as HTMLElement).style.pointerEvents = '';
        }
      });
    }

    // クリーンアップ
    return () => {
      document.body.style.overflow = '';
      const header = document.querySelector('header');
      if (header) {
        header.removeAttribute('data-search-expanded');
      }
      
      // ドロップダウンの制限を解除
      const dropdowns = document.querySelectorAll('.dropdown');
      dropdowns.forEach(dropdown => {
        const dropdownContent = dropdown.querySelector('.dropdownContent');
        if (dropdownContent) {
          (dropdownContent as HTMLElement).style.display = '';
          (dropdownContent as HTMLElement).style.opacity = '';
          (dropdownContent as HTMLElement).style.pointerEvents = '';
        }
      });
    };
  }, [isExpanded]);

  // 強化されたクリック制御
  useEffect(() => {
    if (!isExpanded) return;

    const handleGlobalClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // 検索コンテナ内のクリックは無視
      if (containerRef.current?.contains(target)) {
        return;
      }
      
      // その他すべてのクリックで検索を閉じる
      handleClose();
    };

    const handleGlobalMousedown = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // 検索コンテナ外のマウスダウンで検索を閉じる
      if (containerRef.current && !containerRef.current.contains(target)) {
        event.preventDefault(); // ドロップダウンなどの動作を防ぐ
        handleClose();
      }
    };

    // 複数のイベントで確実にキャッチ
    document.addEventListener('click', handleGlobalClick, true);
    document.addEventListener('mousedown', handleGlobalMousedown, true);
    
    return () => {
      document.removeEventListener('click', handleGlobalClick, true);
      document.removeEventListener('mousedown', handleGlobalMousedown, true);
    };
  }, [isExpanded]);

  // オーバーレイクリックでの閉じる処理
  const handleOverlayClick = (e: React.MouseEvent) => {
    // オーバーレイ部分のクリックで閉じる
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <>
      <div 
        ref={containerRef}
        className={`${styles.searchContainer} ${className || ''} ${isExpanded ? styles.expanded : ''}`}
      >
        {!isExpanded ? (
          // 検索アイコンボタン（閉じている状態）
          <button
            className={styles.searchButton}
            onClick={handleExpand}
            aria-label="検索を開く"
            type="button"
          >
            <svg 
              className={styles.searchIcon}
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        ) : (
          // 検索フォーム（展開している状態）
          <form 
            className={styles.searchForm}
            onSubmit={handleSearch}
          >
            <div className={styles.inputContainer}>
              <svg 
                className={styles.searchIconInInput}
                viewBox="0 0 24 24" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="記事を検索..."
                className={styles.searchInput}
                disabled={isLoading}
              />
              
              <button
                type="button"
                onClick={handleClose}
                className={styles.closeButton}
                aria-label="検索を閉じる"
              >
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            
            <button
              type="submit"
              className={styles.submitButton}
              disabled={!searchQuery.trim() || isLoading}
            >
              {isLoading ? (
                <div className={styles.spinner} />
              ) : (
                '検索'
              )}
            </button>
          </form>
        )}
      </div>
      
      {/* 展開時のオーバーレイ */}
      {isExpanded && (
        <div 
          className={styles.searchOverlay}
          onClick={handleOverlayClick}
          role="button"
          tabIndex={-1}
          aria-label="検索を閉じる"
        />
      )}
    </>
  );
};

export default SearchBox;
