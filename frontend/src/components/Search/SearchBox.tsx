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
      // 検索結果ページに遷移
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

    // 展開時のbodyスクロール制御
    useEffect(() => {
    if (isExpanded) {
        // 検索展開時はbodyのスクロールを無効化
        document.body.style.overflow = 'hidden';
    } else {
        // 検索閉じた時はbodyのスクロールを復活
        document.body.style.overflow = '';
    }

    // クリーンアップ
    return () => {
        document.body.style.overflow = '';
    };
    }, [isExpanded]);

  // 外部クリックで閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isExpanded &&
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isExpanded]);

  return (
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
  );
};

export default SearchBox;
