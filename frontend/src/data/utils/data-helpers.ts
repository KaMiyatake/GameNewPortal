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
  // カテゴリスラッグとカテゴリ名の対応表
  const categoryMap: { [key: string]: string } = {
    'console': 'コンソール',
    'pc': 'PC',
    'mobile': 'モバイル',
    'indie': 'インディー',
    'multi': 'マルチプラットフォーム'
  };
  
  // スラッグを小文字に変換してマッピング
  const normalizedSlug = categorySlug.toLowerCase();
  const targetCategory = categoryMap[normalizedSlug];
  
  if (!targetCategory) {
    console.warn(`未知のカテゴリスラッグ: ${categorySlug}`);
    return [];
  }
  
  // 完全一致で検索
  return allArticles.filter(article => article.category === targetCategory);
};

// 注目記事取得
export const getFeaturedArticles = () => {
  return allArticles.filter(article => article.featured);
};

// 人気記事取得（件数制限を追加）
export const getPopularArticles = (limit: number = 10) => {
  return allArticles
    .filter(article => article.popular)
    .slice(0, limit); // 指定された件数で制限
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

// // タグ別記事取得
// export const getArticlesByTag = (tag: string) => {
//   return allArticles.filter(article => 
//     article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
//   );
// };

// 検索機能
export const searchArticles = (query: string) => {
  const lowerQuery = query.toLowerCase();
  return allArticles.filter(article => 
    article.title.toLowerCase().includes(lowerQuery) ||
    article.summary.toLowerCase().includes(lowerQuery) ||
    article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};

// タグ別記事取得
export const getArticlesByTag = (tag: string) => {
  return allArticles.filter(article => 
    article.tags.some(t => t.toLowerCase() === tag.toLowerCase())
  );
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