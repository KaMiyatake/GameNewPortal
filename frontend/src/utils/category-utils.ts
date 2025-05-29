import { categories } from '../data/categories/categories';

// カテゴリ名からスラッグへの変換マップを動的に生成
const categoryToSlugMap = categories.reduce<{ [key: string]: string }>((acc, category) => {
  acc[category.name] = category.slug;
  return acc;
}, {});

// スラッグからカテゴリ名への変換マップを動的に生成
const slugToCategoryMap = categories.reduce<{ [key: string]: string }>((acc, category) => {
  acc[category.slug] = category.name;
  return acc;
}, {});

// カテゴリ名から色への変換マップを動的に生成
const categoryToColorMap = categories.reduce<{ [key: string]: string }>((acc, category) => {
  acc[category.name] = category.color || '#666';
  return acc;
}, {});

// カテゴリ名からスラッグへ変換
export const getCategorySlug = (categoryName?: string): string => {
  if (!categoryName) return '';
  return categoryToSlugMap[categoryName] || categoryName.toLowerCase();
};

// スラッグからカテゴリ名へ変換
export const getCategoryName = (slug?: string): string => {
  if (!slug) return '';
  return slugToCategoryMap[slug.toLowerCase()] || slug;
};

// カテゴリ名から色を取得
export const getCategoryColor = (categoryName?: string): string => {
  if (!categoryName) return '#666';
  return categoryToColorMap[categoryName] || '#666';
};

// カテゴリリンクのURLを生成
export const getCategoryUrl = (categoryName?: string): string => {
  if (!categoryName) return '/category/all';
  const slug = getCategorySlug(categoryName);
  return `/category/${slug}`;
};

// 全カテゴリ一覧を取得（デバッグ用）
export const getAllCategories = () => {
  return categories;
};

// カテゴリが存在するかチェック
export const isCategoryExists = (categoryName: string): boolean => {
  return categoryToSlugMap.hasOwnProperty(categoryName);
};
