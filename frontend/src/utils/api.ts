import { 
  getPaginatedArticles,
  getArticlesByCategory,
  getFeaturedArticles,
  getPopularArticles,
  getArticleBySlug,
  getRelatedArticles,
  getArticlesByTag
} from '../data/utils/data-helpers';
import { categories } from '../data/categories/categories';
import { NewsItem, NewsItemDetail, Category } from '../types';

import { ArticleDetail } from '../data/utils/types';

// 記事データをNewsItem形式に変換
const convertToNewsItem = (article: ArticleDetail): NewsItem => ({
  id: article.id,
  title: article.title,
  summary: article.summary,
  imageUrl: article.imageUrl,
  category: article.category,
  date: article.publishedAt,
  slug: article.slug,
});

// 記事データをNewsItemDetail形式に変換
const convertToNewsItemDetail = (article: ArticleDetail): NewsItemDetail => ({
  ...convertToNewsItem(article),
  content: article.content || '',
  author: article.author,
  tags: article.tags,
  relatedNews: getRelatedArticles(article.id).map(convertToNewsItem),
});

// ページ付きでニュースを取得
export const getLatestNewsPaginated = async (page: number = 1, limit: number = 10) => {
  const result = getPaginatedArticles(page, limit);
  
  return {
    data: result.data.map(convertToNewsItem),
    pagination: result.pagination,
  };
};

// カテゴリ別記事取得
export const getNewsByCategory = async (categorySlug: string) => {
  const articles = getArticlesByCategory(categorySlug);
  return articles.map(convertToNewsItem);
};

// 注目記事取得
export const getFeaturedNews = async (): Promise<NewsItem[]> => {
  const articles = getFeaturedArticles();
  return articles.map(convertToNewsItem);
};

// 人気記事取得（最大10件に制限）
export const getPopularNews = async (): Promise<NewsItem[]> => {
  const articles = getPopularArticles(10); // 最大10件に制限
  return articles.map(convertToNewsItem);
};

// 記事詳細取得
export const getNewsDetail = async (slug: string): Promise<NewsItemDetail> => {
  const article = getArticleBySlug(slug);
  if (!article) {
    throw new Error('記事が見つかりませんでした');
  }
  return convertToNewsItemDetail(article);
};

// カテゴリ一覧取得
export const getCategories = async (): Promise<Category[]> => {
  return categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));
};

// 既存の関数（後方互換性）
export const getLatestNews = async (): Promise<NewsItem[]> => {
  const result = await getLatestNewsPaginated(1, 10);
  return result.data;
};

// ページネーション用の型定義
export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// タグ別記事取得
export const getNewsByTag = async (tag: string): Promise<NewsItem[]> => {
  const articles = getArticlesByTag(tag);
  return articles.map(convertToNewsItem);
};
