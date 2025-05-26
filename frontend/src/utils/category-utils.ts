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

// カテゴリ名からスラッグへ変換
export const getCategorySlug = (categoryName: string): string => {
  return categoryToSlugMap[categoryName] || categoryName.toLowerCase();
};

// スラッグからカテゴリ名へ変換
export const getCategoryName = (slug: string): string => {
  return slugToCategoryMap[slug.toLowerCase()] || slug;
};

// カテゴリリンクのURLを生成
export const getCategoryUrl = (categoryName: string): string => {
  const slug = getCategorySlug(categoryName);
  return `/category/${slug}`;
};
