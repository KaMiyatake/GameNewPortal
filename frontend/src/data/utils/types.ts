// 既存の型定義に color プロパティを追加
export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description: string;
  color?: string; // 新規追加
}

// その他の既存型定義はそのまま維持
export interface ArticleDetail {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  category: string;
  tags: string[];
  publishedAt: string;
  slug: string;
  author: string;
  featured: boolean;
  popular: boolean;
  relatedArticleIds: number[];
}
