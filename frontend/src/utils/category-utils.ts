// カテゴリ名からスラッグへの変換マップ
const categoryToSlugMap: { [key: string]: string } = {
  'コンソール': 'console',
  'PC': 'pc',
  'モバイル': 'mobile',
  'インディー': 'indie',
  'マルチプラットフォーム': 'multi'
};

// スラッグからカテゴリ名への変換マップ
const slugToCategoryMap: { [key: string]: string } = {
  'console': 'コンソール',
  'pc': 'PC',
  'mobile': 'モバイル',
  'indie': 'インディー',
  'multi': 'マルチプラットフォーム'
};

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
