// scripts/generate-ogp-image.js
const fs = require('fs');
const path = require('path');

// OGP画像生成ヘルパー（手動での画像作成ガイド）
console.log(`
🖼️ OGP画像作成ガイド

既存ロゴ: public/GameSanpiLogo.png
推奨OGP画像: public/og-image.png

推奨サイズ: 1200×630px (16:9比率)
最大ファイルサイズ: 2MB以内
形式: PNG, JPG

作成方法：
1. Canva, Figma, Photoshop等で1200×630のキャンバス作成
2. 背景色を設定（サイトのテーマカラー）
3. GameSanpiLogo.pngを中央に配置
4. サイト名「ゲーム賛否」を追加
5. キャッチコピー「賛否両論で読むゲームメディア」を追加
6. public/og-image.png として保存

各記事専用のOGP画像：
- 記事タイトル入りの画像
- public/images/ogp/ フォルダに保存
- ファイル名: [記事slug].png
`);
