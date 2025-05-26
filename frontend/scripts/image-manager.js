const fs = require('fs');
const path = require('path');

// 記事用の画像フォルダを作成
function createArticleImageFolder(year, month, slug) {
  const folderPath = path.join(
    process.cwd(),
    'public',
    'images',
    'articles',
    year,
    month,
    slug
  );
  
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
    console.log(`Created folder: ${folderPath}`);
  }
}

// 画像のリサイズ（Sharp使用）
async function resizeImage(inputPath, outputPath, width, height) {
  try {
    const sharp = require('sharp');
    
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({ quality: 85 })
      .toFile(outputPath);
      
    console.log(`Resized image: ${outputPath}`);
  } catch (error) {
    console.error('Error resizing image:', error);
  }
}

// 使用例
createArticleImageFolder('2025', '05', 'zelda-totk-new-dlc');

module.exports = {
  createArticleImageFolder,
  resizeImage
};
