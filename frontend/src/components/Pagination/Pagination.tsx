import React from 'react';
import styles from './Pagination.module.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages, 
  onPageChange 
}) => {
  // ページ番号のリストを生成
  const getPageNumbers = () => {
    const pages = [];
    
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

  return (
    <div className={styles.pagination}>
      {/* 前のページボタン */}
      <button
        className={`${styles.pageButton} ${styles.prevButton} ${
          currentPage === 1 ? styles.disabled : ''
        }`}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="前のページ"
      >
        &lt;
      </button>

      {/* ページ番号ボタン */}
      {pageNumbers.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`ellipsis-${index}`} className={styles.ellipsis}>
              ...
            </span>
          );
        }

        const pageNum = page as number;
        return (
          <button
            key={pageNum}
            className={`${styles.pageButton} ${styles.numberButton} ${
              currentPage === pageNum ? styles.active : ''
            }`}
            onClick={() => onPageChange(pageNum)}
            aria-label={`ページ ${pageNum}`}
            aria-current={currentPage === pageNum ? 'page' : undefined}
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
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="次のページ"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
