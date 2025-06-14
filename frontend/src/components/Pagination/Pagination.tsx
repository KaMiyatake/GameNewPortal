import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showInfo?: boolean; // ページ情報表示オプション
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange,
  showInfo = false
}) => {
  // ページ番号のリストを生成
  const getPageNumbers = () => {
    const pages = [];
    
    // 1ページしかない場合は空配列を返す
    if (totalPages <= 1) return [];
    
    // 常に最初のページを表示
    pages.push(1);
    
    // 現在のページの前後1つを計算
    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);
    
    // 最初のページと現在のページ範囲の間に省略記号が必要か
    if (startPage > 2) {
      pages.push('...');
    }
    
    // 現在のページ周辺のページを追加
    for (let i = startPage; i <= endPage; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }
    
    // 現在のページ範囲と最後のページの間に省略記号が必要か
    if (endPage < totalPages - 1) {
      pages.push('...');
    }
    
    // 最後のページを表示（最初のページと同じでない場合）
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();

  // ページ変更ハンドラー（現在ページの場合は何もしない）
  const handlePageChange = (page: number) => {
    if (page === currentPage) return; // 現在ページの場合は移動しない
    onPageChange(page);
  };

  // 1ページしかない場合は何も表示しない
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={styles.paginationWrapper}>
      {/* ページ情報表示 */}
      {showInfo && (
        <div className={styles.pageInfo}>
          <span>
            ページ {currentPage} / {totalPages}
          </span>
        </div>
      )}
      
      <div className={styles.pagination}>
        {/* 前のページボタン */}
        <button
          className={`${styles.pageButton} ${styles.prevButton} ${
            currentPage === 1 ? styles.disabled : ''
          }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="前のページ"
          title="前のページ"
        >
          <span className={styles.buttonText}>前へ</span>
        </button>

        {/* ページ番号ボタン */}
        {pageNumbers.map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                ⋯
              </span>
            );
          }

          const pageNum = page as number;
          const isCurrentPage = currentPage === pageNum;
          
          return (
            <button
              key={pageNum}
              className={`${styles.pageButton} ${styles.numberButton} ${
                isCurrentPage ? styles.active : ''
              } ${isCurrentPage ? styles.current : ''}`}
              onClick={() => handlePageChange(pageNum)}
              disabled={isCurrentPage} // 現在ページは無効化
              aria-label={isCurrentPage ? `現在のページ ${pageNum}` : `ページ ${pageNum}`}
              aria-current={isCurrentPage ? 'page' : undefined}
              title={isCurrentPage ? `現在のページ ${pageNum}` : `ページ ${pageNum}に移動`}
            >
              {pageNum}
            </button>
          );
        })}

        {/* 次のページボタン */}
        <button
          className={`${styles.pageButton} ${styles.nextButton} ${
            currentPage === totalPages ? styles.disabled : ''
          }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="次のページ"
          title="次のページ"
        >
          <span className={styles.buttonText}>次へ</span>
        </button>
      </div>

      {/* 追加のページ情報（モバイル時） */}
      {/* <div className={styles.mobilePageInfo}>
        <span className={styles.currentPageIndicator}>
          {currentPage} / {totalPages}
        </span>
      </div> */}
    </div>
  );
};

export default Pagination;
