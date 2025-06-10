// src/utils/search-utils.ts
import { allArticles } from '../data/articles';
import { ArticleDetail } from '../data/utils/types';

export interface SearchResult extends ArticleDetail {
  relevanceScore: number;
  matchedFields: string[];
}

/**
 * 拡張されたフリーワード検索
 * @param query 検索クエリ
 * @param options 検索オプション
 */
export const searchArticles = (
  query: string,
  options: {
    includeContent?: boolean;
    caseSensitive?: boolean;
    exactMatch?: boolean;
  } = {}
): SearchResult[] => {
  if (!query || !query.trim()) {
    return [];
  }

  const {
    includeContent = false,
    caseSensitive = false,
    exactMatch = false
  } = options;

  const searchTerm = caseSensitive ? query.trim() : query.trim().toLowerCase();
  const searchWords = exactMatch ? [searchTerm] : searchTerm.split(/\s+/);

  const results: SearchResult[] = [];

  allArticles.forEach(article => {
    let relevanceScore = 0;
    const matchedFields: string[] = [];

    // 検索対象のフィールドとその重み
    const searchFields = [
      { field: 'title', content: article.title, weight: 10 },
      { field: 'summary', content: article.summary, weight: 5 },
      { field: 'tags', content: article.tags.join(' '), weight: 3 },
      { field: 'categories', content: article.categories?.join(' ') || '', weight: 2 },
    ];

    // コンテンツ検索が有効な場合
    if (includeContent && article.content) {
      searchFields.push({ 
        field: 'content', 
        content: article.content, 
        weight: 1 
      });
    }

    // 各フィールドでの検索
    searchFields.forEach(({ field, content, weight }) => {
      const targetContent = caseSensitive ? content : content.toLowerCase();
      
      if (exactMatch) {
        // 完全一致検索
        if (targetContent.includes(searchTerm)) {
          relevanceScore += weight * 2;
          matchedFields.push(field);
        }
      } else {
        // 部分一致検索
        searchWords.forEach(word => {
          if (targetContent.includes(word)) {
            relevanceScore += weight;
            if (!matchedFields.includes(field)) {
              matchedFields.push(field);
            }
          }
        });
      }
    });

    // 完全タイトルマッチにボーナス
    const titleContent = caseSensitive ? article.title : article.title.toLowerCase();
    if (titleContent === searchTerm) {
      relevanceScore += 20;
    }

    // マッチした場合のみ結果に追加
    if (relevanceScore > 0) {
      results.push({
        ...article,
        relevanceScore,
        matchedFields
      });
    }
  });

  // 関連度でソート
  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
};

/**
 * ページネーション付き検索
 */
export const searchArticlesPaginated = (
  query: string,
  page: number = 1,
  limit: number = 10,
  options?: Parameters<typeof searchArticles>[1]
) => {
  const searchResults = searchArticles(query, options);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return {
    data: searchResults.slice(startIndex, endIndex),
    pagination: {
      currentPage: page,
      totalPages: Math.ceil(searchResults.length / limit),
      totalItems: searchResults.length,
      itemsPerPage: limit,
    },
    query: query.trim(),
  };
};

/**
 * 検索クエリのハイライト用
 */
export const highlightSearchTerms = (
  text: string,
  query: string,
  className: string = 'search-highlight'
): string => {
  if (!query || !text) return text;

  const searchWords = query.trim().toLowerCase().split(/\s+/);
  let highlightedText = text;

  searchWords.forEach(word => {
    const regex = new RegExp(`(${word})`, 'gi');
    highlightedText = highlightedText.replace(
      regex,
      `<span class="${className}">$1</span>`
    );
  });

  return highlightedText;
};

/**
 * 人気検索ワード管理（localStorage使用）
 */
export const getPopularSearchTerms = (): string[] => {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem('popularSearchTerms');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const addSearchTerm = (term: string): void => {
  if (typeof window === 'undefined' || !term.trim()) return;
  
  try {
    const current = getPopularSearchTerms();
    const updated = [term.trim(), ...current.filter(t => t !== term.trim())].slice(0, 10);
    localStorage.setItem('popularSearchTerms', JSON.stringify(updated));
  } catch (error) {
    console.error('検索履歴の保存に失敗:', error);
  }
};
