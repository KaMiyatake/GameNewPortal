import { allArticles, articlesById, articlesBySlug } from '../articles';
import { getCategoryName } from '../../utils/category-utils';
import { ArticleDetail } from './types';
// data/utils/data-helpers.ts に追加
import { SmartRelatedArticlesManager } from '../../utils/smart-related-articles';

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

// カテゴリ別記事取得（ページ付き）
export const getPaginatedArticlesByCategory = (
  categorySlug: string,
  page: number,
  limit: number
) => {
  const articles = getArticlesByCategory(categorySlug);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: articles.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(articles.length / limit),
      totalItems: articles.length,
      itemsPerPage: limit,
    },
  };
};

// カテゴリ別記事取得（複数カテゴリ対応版）
export const getArticlesByCategory = (categorySlug: string) => {
  // スラッグからカテゴリ名に変換
  const targetCategory = getCategoryName(categorySlug);
  
  if (!targetCategory) {
    console.warn(`未知のカテゴリスラッグ: ${categorySlug}`);
    return [];
  }
  
  // 複数カテゴリ配列内での検索
  return allArticles.filter(article => 
    article.categories && article.categories.includes(targetCategory)
  );
};

// 注目記事取得
export const getFeaturedArticles = () => {
  return allArticles.filter(article => article.featured);
};

// 人気記事取得（件数制限を追加）
export const getPopularArticles = (limit: number = 10) => {
  return allArticles
    .filter(article => article.popular)
    .slice(0, limit);
};

// スマート関連記事管理システムを初期化
const smartRelatedManager = new SmartRelatedArticlesManager(allArticles);

// 関連記事取得
// export const getRelatedArticles = (articleId: number): ArticleDetail[] => {
//   const article = articlesById[articleId];
//   if (!article || !article.relatedArticleIds) return [];
  
//   return article.relatedArticleIds
//     .map(id => articlesById[id])
//     .filter(Boolean);
// };

// 既存の関連記事取得関数を更新（自動生成優先）
export const getRelatedArticles = (articleId: number): ArticleDetail[] => {
  const article = articlesById[articleId];
  if (!article) return [];
  
  // 自動生成優先でスマート関連記事システムを使用
  return smartRelatedManager.getSmartRelatedArticles(article, 4);
};

// 新しい関数：詳細制御版
export const getRelatedArticlesAdvanced = (
  articleId: number,
  options: {
    limit?: number;
    autoFirst?: boolean;
    autoCount?: number;
    manualCount?: number;
  } = {}
): ArticleDetail[] => {
  const article = articlesById[articleId];
  if (!article) return [];
  
  return smartRelatedManager.getSmartRelatedArticlesAdvanced(article, options);
};

// 新しい関数：自動生成のみ
export const getAutoRelatedArticles = (
  articleId: number,
  limit: number = 4
): ArticleDetail[] => {
  const article = articlesById[articleId];
  if (!article) return [];
  
  return smartRelatedManager.getSmartRelatedArticlesAdvanced(article, {
    limit,
    autoFirst: true,
    autoCount: limit,
    manualCount: 0
  });
};

// 新しい関数：手動設定のみ
export const getManualRelatedArticles = (articleId: number): ArticleDetail[] => {
  const article = articlesById[articleId];
  if (!article || !article.relatedArticleIds) return [];
  
  return article.relatedArticleIds
    .map(id => articlesById[id])
    .filter(Boolean);
};

// 新しい関数：関連記事を指定件数で取得
export const getSmartRelatedArticles = (
  articleId: number, 
  limit: number = 4
): ArticleDetail[] => {
  const article = articlesById[articleId];
  if (!article) return [];
  
  return smartRelatedManager.getSmartRelatedArticles(article, limit);
};

// デバッグ用：関連記事のスコア情報付きで取得
export const getRelatedArticlesWithScores = (articleId: number) => {
  const article = articlesById[articleId];
  if (!article) return [];
  
  // 開発環境でのみ使用
  if (process.env.NODE_ENV === 'development') {
    return smartRelatedManager.getSmartRelatedArticles(article, 10);
  }
  
  return smartRelatedManager.getSmartRelatedArticles(article, 4);
};

// スラッグから記事取得
export const getArticleBySlug = (slug: string): ArticleDetail | null => {
  return articlesBySlug[slug] || null;
};

// 検索機能（複数カテゴリ対応）
export const searchArticles = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.summary.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    (article.categories && article.categories.some(cat => cat.toLowerCase().includes(lowerQuery)))
  );
};

// タグ別記事取得
export const getArticlesByTag = (tag: string) => {
  return allArticles.filter(article =>
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
};

// タグ別記事取得（ページ付き）
export const getPaginatedArticlesByTag = (
  tag: string,
  page: number,
  limit: number
) => {
  const articles = getArticlesByTag(tag);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: articles.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(articles.length / limit),
      totalItems: articles.length,
      itemsPerPage: limit,
    },
  };
};

// 全タグ取得（使用回数順）
export const getAllTags = () => {
  const tagCounts: Record<string, number> = {};
  
  allArticles.forEach(article => {
    article.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  
  return Object.entries(tagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
};

// 人気タグ取得（上位N個）
export const getPopularTags = (limit: number = 10) => {
  return getAllTags().slice(0, limit);
};

// 関連タグ取得（指定したタグと一緒に使われることが多いタグ）
export const getRelatedTags = (targetTag: string, limit: number = 5) => {
  const articlesWithTag = getArticlesByTag(targetTag);
  const relatedTagCounts: Record<string, number> = {};
  
  articlesWithTag.forEach(article => {
    article.tags.forEach(tag => {
      if (tag.toLowerCase() !== targetTag.toLowerCase()) {
        relatedTagCounts[tag] = (relatedTagCounts[tag] || 0) + 1;
      }
    });
  });
  
  return Object.entries(relatedTagCounts)
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};

// カテゴリ統計取得（複数カテゴリ対応）
export const getCategoryStats = () => {
  const categoryStats: Record<string, number> = {};
  
  allArticles.forEach(article => {
    if (article.categories) {
      article.categories.forEach(category => {
        categoryStats[category] = (categoryStats[category] || 0) + 1;
      });
    }
  });
  
  return Object.entries(categoryStats)
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
};
