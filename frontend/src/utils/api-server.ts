// サーバーサイド用の同期API関数
import { 
  getPaginatedArticles,
  getFeaturedArticles,
  getPopularArticles,
  getArticleBySlug,
  getArticlesByTag,
} from '../data/utils/data-helpers';
import { categories } from '../data/categories/categories';
import { ArticleDetail } from '../data/utils/types';

// NewsItem形式に変換する関数
const convertToNewsItem = (article: ArticleDetail) => ({
  id: article.id,
  title: article.title,
  summary: article.summary,
  imageUrl: article.imageUrl,
  category: article.category,
  date: article.publishedAt,
  slug: article.slug,
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
  
  return {
    ...convertToNewsItem(article),
    content: article.content || '',
    author: article.author,
    tags: article.tags,
    relatedNews: [], // 関連記事は別途取得
  };
};
