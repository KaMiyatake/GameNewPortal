// scripts/create-article.js
// 記事作成スクリプト
// how to use
// node scripts/create-article.js

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function createArticle() {
  const title = await question('記事タイトル: ');
  const slug = await question('スラッグ (例: my-new-article): ');
  const category = await question('カテゴリ (コンソール/PC/モバイル/インディー/マルチプラットフォーム): ');
  const author = await question('著者名: ');
  const year = new Date().getFullYear().toString();
  const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
  const date = new Date().toISOString().split('T')[0];

  // 新しいIDを生成
  const newId = await getNextId();

  // 画像フォルダを作成
  const imagePath = path.join(process.cwd(), 'public', 'images', 'articles', year, month, slug);
  fs.mkdirSync(imagePath, { recursive: true });
  console.log(`画像フォルダを作成しました: ${imagePath}`);

  // 記事ファイルを作成
  const articleContent = generateArticleTemplate(newId, title, slug, category, author, year, month, date);
  const articlePath = path.join(process.cwd(), 'src', 'data', 'articles', year, month, `${slug}.ts`);
  
  fs.writeFileSync(articlePath, articleContent);
  console.log(`記事ファイルを作成しました: ${articlePath}`);

  // インデックスファイルの更新指示
  console.log('\n次の手順:');
  console.log(`1. ${imagePath} に画像ファイル（main.jpg）を配置してください`);
  console.log(`2. src/data/articles/${year}/${month}/index.ts を更新してください`);
  console.log(`3. 記事内容を ${articlePath} で編集してください`);

  rl.close();
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function getNextId() {
  // 既存の記事からIDを取得して、最大値+1を返す
  // 簡略化のため、手動で指定してもらう
  const id = await question('記事ID (既存のIDと重複しない数値): ');
  return parseInt(id);
}

function generateArticleTemplate(id, title, slug, category, author, year, month, date) {
  return `import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const ${slug.replace(/-/g, '')} = {
  id: ${id},
  title: '${title}',
  summary: '記事の要約をここに記述してください。',
  content: \`
    <p>記事の本文をここに記述します。</p>
    
    <h2>セクション見出し</h2>
    <p>セクションの内容をここに記述します。</p>
  \`,
  imageUrl: getArticleImagePath('${year}', '${month}', '${slug}'),
  category: '${category}',
  tags: ['タグ1', 'タグ2'],
  publishedAt: '${date}',
  slug: '${slug}',
  author: '${author}',
  featured: false,
  popular: false,
  relatedArticleIds: [],
};
`;
}

createArticle().catch(console.error);
