export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  categories: string[]; // string から string[] に変更
  date: string;
  slug: string;
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
