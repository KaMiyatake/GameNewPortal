// src/utils/image-paths-server.ts (サーバーサイド専用)
import fs from 'fs';
import path from 'path';
import { getArticleImagePathFromSlug } from './image-paths';

// サーバーサイド用画像存在チェック
export const checkImageExistsSync = (imagePath: string): boolean => {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath);
    return fs.existsSync(fullPath);
  } catch {
    return false;
  }
};

// サーバーサイドでのOGP画像パス取得（存在チェック付き）
export const getOGPImagePathWithFallback = (
  slug: string,
  preferredFilenames: string[] = ['main.jpg', 'main.png', 'hero.jpg', 'hero.png'],
  fallbackImage: string = '/og-image.png'
): string => {
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
