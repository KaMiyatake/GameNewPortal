export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  category: string;
  date: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}
