export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description: string;
  color?: string;
}

// ArticleDetailを複数カテゴリ対応に変更
export interface ArticleDetail {
  id: number;
  title: string;
  summary: string;
  content: string;
  imageUrl: string;
  categories: string[]; // string から string[] に変更
  tags: string[];
  publishedAt: string;
  slug: string;
  author: string;
  featured: boolean;
  popular: boolean;
  relatedArticleIds: number[];
}
