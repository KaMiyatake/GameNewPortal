import { allArticles, articlesById, articlesBySlug } from '../articles';
import { ArticleDetail } from './types';

// ページネーション用
export const getPaginatedArticles = (page: number, limit: number) => {
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    data: allArticles.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(allArticles.length / limit),
      totalItems: allArticles.length,
      itemsPerPage: limit,
    },
  };
};

// カテゴリ別記事取得
export const getArticlesByCategory = (categorySlug: string) => {
  return allArticles.filter(article => 
    article.category.toLowerCase() === categorySlug.toLowerCase()
  );
};

// 注目記事取得
export const getFeaturedArticles = () => {
  return allArticles.filter(article => article.featured);
};

// 人気記事取得
export const getPopularArticles = () => {
  return allArticles.filter(article => article.popular);
};

// 関連記事取得
export const getRelatedArticles = (articleId: number): ArticleDetail[] => {
  const article = articlesById[articleId];
  if (!article || !article.relatedArticleIds) return [];
  
  return article.relatedArticleIds
    .map(id => articlesById[id])
    .filter(Boolean);
};

// スラッグから記事取得
export const getArticleBySlug = (slug: string): ArticleDetail | null => {
  return articlesBySlug[slug] || null;
};

// タグ別記事取得
export const getArticlesByTag = (tag: string) => {
  return allArticles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

// 検索機能
export const searchArticles = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.summary.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};
