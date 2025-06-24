// src/utils/image-paths.ts (Next.js対応版)
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
  // slugの最初の8文字から年月日を抽出
  // 例: '25062302-death-stranding2-trailer' → '25062302'
  const dateStr = slug.substring(0, 8);
  
  if (dateStr.length !== 8) {
    throw new Error(`Invalid slug format: ${slug}. Expected format: YYMMDDNN-title`);
  }
  
  const year = `20${dateStr.substring(0, 2)}`; // 25 → 2025
  const month = dateStr.substring(2, 4);       // 06 → 06
  
  return { year, month };
};

// ★ 新機能: OGP用画像パス取得（フォールバック対応）
export const getOGPImagePath = (
  slug: string,
  preferredFilenames: string[] = ['main.jpg', 'main.png', 'hero.jpg', 'hero.png'],
  fallbackImage: string = '/ogp-default.png'
): string => {
  try {
    // 最初の候補ファイルを使用
    return getArticleImagePathFromSlug(slug, preferredFilenames[0]);
  } catch (error) {
    console.warn(`OGP画像パス生成失敗: ${slug}`, error);
    return fallbackImage;
  }
};

// ★ 新機能: サーバーサイド用画像存在チェック（動的インポート版）
export const checkImageExistsSync = (imagePath: string): boolean => {
  // クライアントサイドでは常にfalseを返す
  if (typeof window !== 'undefined') {
    return false;
  }
  
  try {
    // サーバーサイドでのみfsモジュールを動的インポート
    const fs = require('fs');
    const path = require('path');
    
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    return fs.existsSync(fullPath);
  } catch (error) {
    // requireが失敗した場合（ビルド時など）はfalseを返す
    console.warn('fs module not available:', error);
    return false;
  }
};

// ★ 新機能: サーバーサイドでのOGP画像パス取得（存在チェック付き）
export const getOGPImagePathWithFallback = (
  slug: string,
  preferredFilenames: string[] = ['main.jpg', 'main.png', 'hero.jpg', 'hero.png'],
  fallbackImage: string = '/ogp-default.png'
): string => {
  // クライアントサイドでは基本のパスを返す
  if (typeof window !== 'undefined') {
    return getOGPImagePath(slug, preferredFilenames, fallbackImage);
  }

  // サーバーサイドでファイル存在チェックを実行
  for (const filename of preferredFilenames) {
    try {
      const imagePath = getArticleImagePathFromSlug(slug, filename);
      
      if (checkImageExistsSync(imagePath)) {
        return imagePath;
      }
    } catch {
      continue;
    }
  }
  
  return fallbackImage;
};

// ★ 新機能: 複数の記事画像パスを一度に生成
export const getMultipleArticleImagePaths = (
  slug: string,
  filenames: string[]
): string[] => {
  return filenames.map(filename => {
    try {
      return getArticleImagePathFromSlug(slug, filename);
    } catch {
      return getPlaceholderImage();
    }
  });
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

// ★ 新機能: 画像情報のデバッグ表示
export const debugImagePaths = (slug: string): void => {
  if (process.env.NODE_ENV !== 'development') return;
  
  try {
    const { year, month } = parseSlugToDate(slug);
    console.log(`🖼️ 画像パス情報: ${slug}`);
    console.log(`  年月: ${year}/${month}`);
    console.log(`  メイン画像: ${getArticleImagePathFromSlug(slug)}`);
    console.log(`  OGP画像: ${getOGPImagePath(slug)}`);
    
    // サーバーサイドでのみフォールバック情報を表示
    if (typeof window === 'undefined') {
      console.log(`  フォールバック: ${getOGPImagePathWithFallback(slug)}`);
    }
  } catch (error) {
    console.error(`❌ 画像パス生成エラー: ${slug}`, error);
  }
};
