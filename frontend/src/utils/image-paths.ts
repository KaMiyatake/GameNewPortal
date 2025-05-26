// 画像パスの基本設定
export const IMAGE_BASE_PATH = '/images';

// 記事画像のパス生成
export const getArticleImagePath = (
  year: string, 
  month: string, 
  slug: string, 
  filename: string = 'main.png'
): string => {
  return `${IMAGE_BASE_PATH}/articles/${year}/${month}/${slug}/${filename}`;
};

// カテゴリ画像のパス生成
export const getCategoryImagePath = (categorySlug: string): string => {
  return `${IMAGE_BASE_PATH}/categories/${categorySlug}.jpg`;
};

// ヒーロー画像のパス生成
export const getHeroImagePath = (filename: string): string => {
  return `${IMAGE_BASE_PATH}/hero/${filename}`;
};

// 共通画像のパス生成
export const getCommonImagePath = (filename: string): string => {
  return `${IMAGE_BASE_PATH}/common/${filename}`;
};

// プレースホルダー画像のパス
export const getPlaceholderImage = (width: number = 600, height: number = 338): string => {
  return `${IMAGE_BASE_PATH}/common/placeholder-${width}x${height}.jpg`;
};

// 画像の存在チェック（開発用）
export const checkImageExists = async (imagePath: string): Promise<boolean> => {
  if (typeof window === 'undefined') return true; // サーバーサイドでは常にtrue
  
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
