// components/RelatedArticles/SmartRelatedArticles.tsx
import React from 'react';
import Link from 'next/link';
import { NewsItem } from '../../types';
import styles from './SmartRelatedArticles.module.css';

interface SmartRelatedArticlesProps {
  relatedArticles: NewsItem[];
  currentArticleId: number;
  showDebugInfo?: boolean;
  displayMode?: 'auto-first' | 'manual-first' | 'auto-only' | 'manual-only';
}

const SmartRelatedArticles: React.FC<SmartRelatedArticlesProps> = ({
  relatedArticles,
  currentArticleId,
  showDebugInfo = false,
  displayMode = 'auto-first'
}) => {
  if (relatedArticles.length === 0) {
    return null;
  }

  const getModeText = (mode: string) => {
    switch (mode) {
      case 'auto-first': return '自動生成優先';
      case 'manual-first': return '手動設定優先';
      case 'auto-only': return '自動生成のみ';
      case 'manual-only': return '手動設定のみ';
      default: return '自動生成優先';
    }
  };

  return (
    <section className={styles.relatedArticles}>
      <h2 className={styles.title}>関連記事</h2>
      
      {showDebugInfo && process.env.NODE_ENV === 'development' && (
        <div className={styles.debugInfo}>
          <small>
            {getModeText(displayMode)} - {relatedArticles.length}件表示
            (記事ID: {currentArticleId})
          </small>
        </div>
      )}
      
      <div className={styles.articlesGrid}>
        {relatedArticles.map((article, index) => (
          <Link key={article.id} href={`/news/${article.slug}`}>
            <article className={styles.articleCard}>
              {/* デバッグ情報 */}
              {showDebugInfo && process.env.NODE_ENV === 'development' && (
                <div className={styles.cardDebugInfo}>
                  <span className={styles.debugBadge}>#{index + 1}</span>
                </div>
              )}
              
              <div className={styles.imageContainer}>
                <img 
                  src={article.imageUrl} 
                  alt={article.title}
                  className={styles.articleImage}
                />
              </div>
              <div className={styles.articleContent}>
                <h3 className={styles.articleTitle}>{article.title}</h3>
                <p className={styles.articleSummary}>{article.summary}</p>
                <div className={styles.articleMeta}>
                  <span className={styles.articleDate}>{article.date}</span>
                  <div className={styles.articleCategories}>
                    {article.categories.slice(0, 2).map((category) => (
                      <span key={category} className={styles.categoryTag}>
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SmartRelatedArticles;
