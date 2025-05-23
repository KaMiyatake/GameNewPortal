// 基本的な記事データの型
export interface ArticleData {
  id: number;
  title: string;
  summary: string;
  content?: string;
  imageUrl: string;
  category: string;
  tags: string[];
  publishedAt: string;
  slug: string;
  author: string;
  featured?: boolean;
  popular?: boolean;
}

// 記事の詳細情報
export interface ArticleDetail extends ArticleData {
  content: string;
  relatedArticleIds?: number[];
}

// カテゴリ情報
export interface CategoryData {
  id: number;
  name: string;
  slug: string;
  description?: string;
}
