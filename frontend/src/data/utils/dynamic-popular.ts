// src/data/utils/dynamic-popular.ts
import fs from 'fs';
import path from 'path';
import { ArticleDetail } from './types';
import { articlesBySlug, allArticles } from '../articles';

export const getDynamicPopularArticles = (limit: number = 10): ArticleDetail[] => {
  try {
    const popularArticlesPath = path.join(process.cwd(), 'src/data/popularArticles.json');
    
    if (!fs.existsSync(popularArticlesPath)) {
      console.warn('popularArticles.json が見つかりません');
      return getFallbackPopularArticles(limit);
    }
    
    const popularData = JSON.parse(fs.readFileSync(popularArticlesPath, 'utf8'));
    
    if (!popularData.articles || !Array.isArray(popularData.articles)) {
      console.warn('popularArticles.json の形式が正しくありません');
      return getFallbackPopularArticles(limit);
    }
    
    // スラッグから記事を取得
    const popularArticles = popularData.articles
      .slice(0, limit)
      .map((item: any) => articlesBySlug[item.slug])
      .filter(Boolean);
    
    return popularArticles;
    
  } catch (error) {
    console.error('動的人気記事取得エラー:', error);
    return getFallbackPopularArticles(limit);
  }
};

// フォールバック用の人気記事取得
const getFallbackPopularArticles = (limit: number): ArticleDetail[] => {
  return allArticles
    .filter(article => article.popular)
    .slice(0, limit);
};
