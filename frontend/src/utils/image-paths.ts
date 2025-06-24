// src/utils/image-paths.ts (共通関数のみ)
// 画像パスの基本設定
export const IMAGE_BASE_PATH = '/images';

// 記事画像のパス生成（既存）
export const getArticleImagePath = (
  year: string, 
  month: string, 
  slug: string, 
  filename: string = 'main.png'
): string => {
  return `${IMAGE_BASE_PATH}/articles/${year}/${month}/${slug}/${filename}`;
};

// ★ 新機能: slugから記事画像パスを自動生成
export const getArticleImagePathFromSlug = (
  slug: string, 
  filename: string = 'main.jpg'
): string => {
  const { year, month } = parseSlugToDate(slug);
  return getArticleImagePath(year, month, slug, filename);
};

// ★ 新機能: slugから年月を解析
export const parseSlugToDate = (slug: string): { year: string; month: string } => {
  const dateStr = slug.substring(0, 8);
  
  if (dateStr.length !== 8) {
    throw new Error(`Invalid slug format: ${slug}. Expected format: YYMMDDNN-title`);
  }
  
  const year = `20${dateStr.substring(0, 2)}`;
  const month = dateStr.substring(2, 4);
  
  return { year, month };
};

// ★ 新機能: OGP用画像パス取得（ファイル存在チェックなし版）
export const getOGPImagePath = (
  slug: string,
  filename: string = 'main.jpg'
): string => {
  try {
    return getArticleImagePathFromSlug(slug, filename);
  } catch (error) {
    console.warn(`OGP画像パス生成失敗: ${slug}`, error);
    return '/ogp-default.png';
  }
};

// 既存機能（変更なし）
export const getCategoryImagePath = (categorySlug: string): string => {
  return `${IMAGE_BASE_PATH}/categories/${categorySlug}.jpg`;
};

export const getHeroImagePath = (filename: string): string => {
  return `${IMAGE_BASE_PATH}/hero/${filename}`;
};

export const getCommonImagePath = (filename: string): string => {
  return `${IMAGE_BASE_PATH}/common/${filename}`;
};

export const getPlaceholderImage = (width: number = 600, height: number = 338): string => {
  return `${IMAGE_BASE_PATH}/common/placeholder-${width}x${height}.jpg`;
};

export const checkImageExists = async (imagePath: string): Promise<boolean> => {
  if (typeof window === 'undefined') return true;
  
  try {
    const response = await fetch(imagePath, { method: 'HEAD' });
    return response.ok;
  } catch {
    return false;
  }
};
