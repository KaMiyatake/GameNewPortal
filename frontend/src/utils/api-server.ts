// サーバーサイド用の同期API関数
import { 
  getPaginatedArticles,
  getPaginatedArticlesByCategory,
  getPaginatedArticlesByTag,
  getFeaturedArticles,
  getPopularArticles,
  getArticleBySlug,
  getArticlesByTag,
  getRelatedArticles,
  getArticlesByCategory,  // 追加
} from '../data/utils/data-helpers';
import { categories } from '../data/categories/categories';
import { ArticleDetail } from '../data/utils/types';

// NewsItem形式に変換する関数（複数カテゴリ対応）
const convertToNewsItem = (article: ArticleDetail) => ({
  id: article.id,
  title: article.title,
  summary: article.summary,
  imageUrl: article.imageUrl,
  categories: article.categories, // category → categories に変更
  date: article.publishedAt,
  slug: article.slug,
});

// NewsItemDetail形式に変換する関数
const convertToNewsItemDetail = (article: ArticleDetail) => ({
  ...convertToNewsItem(article),
  content: article.content || '',
  author: article.author,
  tags: article.tags,
  relatedNews: getRelatedArticles(article.id).map(convertToNewsItem),
});

// タグ別記事取得（同期版）
export const getNewsByTagSync = (tag: string) => {
  const articles = getArticlesByTag(tag);
  return articles.map(convertToNewsItem);
};

// サーバーサイド用の同期関数
export const getLatestNewsPaginatedSync = (page: number = 1, limit: number = 10) => {
  const result = getPaginatedArticles(page, limit);
  return {
    data: result.data.map(convertToNewsItem),
    pagination: result.pagination,
  };
};

export const getFeaturedNewsSync = () => {
  const articles = getFeaturedArticles();
  return articles.map(convertToNewsItem);
};

export const getPopularNewsSync = () => {
  const articles = getPopularArticles(10);
  return articles.map(convertToNewsItem);
};

export const getCategoriesSync = () => {
  return categories.map(cat => ({
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
  }));
};

export const getNewsDetailSync = (slug: string) => {
  const article = getArticleBySlug(slug);
  if (!article) throw new Error('記事が見つかりませんでした');
  
  return convertToNewsItemDetail(article);
};

// カテゴリ別記事取得（同期版）
export const getNewsByCategorySync = (categorySlug: string) => {
  const articles = getArticlesByCategory(categorySlug);
  return articles.map(convertToNewsItem);
};

// カテゴリ別記事取得（ページ付き・同期版）
export const getNewsByCategoryPaginatedSync = (
  categorySlug: string,
  page: number = 1,
  limit: number = 10
) => {
  const result = getPaginatedArticlesByCategory(categorySlug, page, limit);
  return {
    data: result.data.map(convertToNewsItem),
    pagination: result.pagination,
  };
};

// タグ別記事取得（ページ付き・同期版）
export const getNewsByTagPaginatedSync = (
  tag: string,
  page: number = 1,
  limit: number = 10
) => {
  const result = getPaginatedArticlesByTag(tag, page, limit);
  return {
    data: result.data.map(convertToNewsItem),
    pagination: result.pagination,
  };
};