export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  date: string;
  slug: string; // URLスラッグ用
}

export interface NewsItemDetail extends NewsItem {
  content: string;
  author: string;
  relatedNews: NewsItem[];
  tags: string[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
