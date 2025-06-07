import { articles202505 } from './2025/05';
import { articles202506 } from './2025/06';
import { ArticleDetail } from '../utils/types';

// 全記事を日付順（新しい順）でエクスポート
export const allArticles: ArticleDetail[] = [
  ...articles202505,
  ...articles202506
].sort((a, b) => b.id - a.id); // ID順にソート
//].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()); // 日付順にソート

// ID別の記事マップ
export const articlesById = allArticles.reduce((acc, article) => {
  acc[article.id] = article;
  return acc;
}, {} as Record<number, ArticleDetail>);

// スラッグ別の記事マップ
export const articlesBySlug = allArticles.reduce((acc, article) => {
  acc[article.slug] = article;
  return acc;
}, {} as Record<string, ArticleDetail>);
