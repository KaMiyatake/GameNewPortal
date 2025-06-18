// scripts/updatePopularArticles.js
const fs = require('fs');
const path = require('path');

// 人気度スコア計算関数
function calculatePopularityScore(article) {
  const now = new Date();
  const publishDate = new Date(article.publishedAt);
  const daysSincePublish = (now - publishDate) / (1000 * 60 * 60 * 24);
  
  // 基本スコア: 新しい記事ほど高スコア
  let score = Math.max(0, 100 - daysSincePublish * 2);
  
  // 週間での重み付け（新しい記事により高いボーナス）
  if (daysSincePublish <= 1) score += 30;        // 1日以内
  else if (daysSincePublish <= 3) score += 20;   // 3日以内
  else if (daysSincePublish <= 7) score += 10;   // 1週間以内
  
  // カテゴリボーナス（人気が高いとされるカテゴリ）
  if (article.categories && article.categories.includes('ゲーム賛否')) score += 25;
  if (article.categories && article.categories.includes('eスポーツ')) score += 20;
  if (article.categories && article.categories.includes('業界ニュース')) score += 15;
  if (article.categories && article.categories.includes('PlayStation')) score += 12;
  if (article.categories && article.categories.includes('Switch')) score += 10;
  if (article.categories && article.categories.includes('エンタメ')) score += 8;
  
  // タグボーナス（話題性の高いキーワード）
  const popularTags = ['発売日', '新作', 'アップデート', 'DLC', '優勝', '大会', 'Steam', 'PC版', 'Nintendo', 'PlayStation', 'Switch'];
  if (article.tags) {
    const tagBonus = article.tags.filter(tag => 
      popularTags.some(pt => tag.includes(pt))
    ).length * 5;
    score += tagBonus;
  }
  
  // 既存のpopularフラグがtrueの場合はボーナス
  if (article.popular) score += 15;
  
  // featuredフラグがtrueの場合もボーナス
  if (article.featured) score += 10;
  
  return Math.round(Math.max(0, score));
}

// 記事データを直接読み取る関数（修正版）
function loadAllArticles() {
  const articlesData = [];
  
  try {
    // 正しいパスを指定
    const articlesBaseDir = path.join(__dirname, '../src/data/articles');
    
    // 2025フォルダの存在確認
    const year2025Dir = path.join(articlesBaseDir, '2025');
    if (!fs.existsSync(year2025Dir)) {
      console.error(`❌ ディレクトリが見つかりません: ${year2025Dir}`);
      return articlesData;
    }
    
    const months = fs.readdirSync(year2025Dir);
    console.log(`📁 見つかった月フォルダ: ${months.join(', ')}`);
    
    for (const month of months) {
      const monthDir = path.join(year2025Dir, month);
      if (!fs.statSync(monthDir).isDirectory()) {
        console.log(`⏭️  スキップ (ディレクトリではない): ${month}`);
        continue;
      }
      
      const files = fs.readdirSync(monthDir);
      console.log(`📂 ${month}月のファイル数: ${files.length}`);
      
      for (const file of files) {
        if (file.endsWith('.ts') && !file.includes('index')) {
          try {
            const filePath = path.join(monthDir, file);
            const content = fs.readFileSync(filePath, 'utf8');
            
            // TypeScriptコードから記事データを抽出
            const exportMatch = content.match(/export const (\w+): ArticleDetail = ({[\s\S]*?});/);
            if (exportMatch) {
              const articleStr = exportMatch[2];
              
              // 各フィールドを正規表現で抽出
              const idMatch = articleStr.match(/id:\s*(\d+),/);
              const titleMatch = articleStr.match(/title:\s*['`"](.*?)['`"],/s);
              const summaryMatch = articleStr.match(/summary:\s*['`"](.*?)['`"],/s);
              const publishedAtMatch = articleStr.match(/publishedAt:\s*['`"](.*?)['`"],/);
              const slugMatch = articleStr.match(/slug:\s*['`"](.*?)['`"],/);
              const popularMatch = articleStr.match(/popular:\s*(true|false),/);
              const featuredMatch = articleStr.match(/featured:\s*(true|false),/);
              
              // カテゴリ配列の抽出（修正版）
              const categoriesMatch = articleStr.match(/categories:\s*\[(.*?)\],/s);
              let categories = [];
              if (categoriesMatch) {
                const categoriesStr = categoriesMatch[1];
                categories = categoriesStr
                  .split(',')
                  .map(c => c.trim().replace(/['"`]/g, ''))
                  .filter(c => c.length > 0);
              }
              
              // タグ配列の抽出（修正版）
              const tagsMatch = articleStr.match(/tags:\s*\[(.*?)\],/s);
              let tags = [];
              if (tagsMatch) {
                const tagsStr = tagsMatch[1];
                tags = tagsStr
                  .split(',')
                  .map(t => t.trim().replace(/['"`]/g, ''))
                  .filter(t => t.length > 0);
              }
              
              if (titleMatch && publishedAtMatch && slugMatch && idMatch) {
                const article = {
                  id: parseInt(idMatch[1]),
                  title: titleMatch[1],
                  summary: summaryMatch ? summaryMatch[1] : '',
                  publishedAt: publishedAtMatch[1],
                  slug: slugMatch[1],
                  categories: categories,
                  tags: tags,
                  popular: popularMatch ? popularMatch[1] === 'true' : false,
                  featured: featuredMatch ? featuredMatch[1] === 'true' : false,
                };
                
                articlesData.push(article);
                console.log(`✅ 記事を読み込み: ${article.title.substring(0, 30)}...`);
              } else {
                console.warn(`⚠️  必須フィールドが見つからない: ${file}`);
              }
            } else {
              console.warn(`⚠️  記事データが見つからない: ${file}`);
            }
          } catch (error) {
            console.warn(`❌ 記事ファイル読み込みエラー: ${file}`, error.message);
          }
        }
      }
    }
  } catch (error) {
    console.error('❌ 記事データ読み込みエラー:', error);
  }
  
  return articlesData;
}

// メイン処理
async function updatePopularArticles() {
  try {
    console.log('🔄 記事データを読み込み中...');
    console.log(`📍 作業ディレクトリ: ${process.cwd()}`);
    console.log(`📍 スクリプトディレクトリ: ${__dirname}`);
    
    // 記事データを読み込み
    const allArticles = loadAllArticles();
    console.log(`📚 ${allArticles.length}件の記事を読み込みました`);
    
    if (allArticles.length === 0) {
      console.error('❌ 記事データが見つかりませんでした');
      console.log('💡 以下を確認してください:');
      console.log('  - src/data/articles/2025/ フォルダが存在するか');
      console.log('  - 月別のフォルダ (05, 06など) が存在するか');
      console.log('  - .tsファイルが存在するか');
      return;
    }
    
    // 人気度スコアを計算
    console.log('📊 人気度スコアを計算中...');
    const articlesWithScore = allArticles.map(article => ({
      ...article,
      popularityScore: calculatePopularityScore(article)
    }));
    
    // スコア順にソートして上位10件を取得
    const topArticles = articlesWithScore
      .sort((a, b) => b.popularityScore - a.popularityScore)
      .slice(0, 10);
    
    // 人気記事データを作成
    const popularArticlesData = {
      lastUpdated: new Date().toISOString(),
      dataSource: 'calculated-score',
      timeframe: 'dynamic',
      calculationMethod: 'recency + category + tags + existing_flags',
      articles: topArticles.map(article => ({
        id: article.id,
        slug: article.slug,
        title: article.title,
        popularityScore: article.popularityScore,
        daysSincePublish: Math.floor((new Date() - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24)),
        categories: article.categories,
        tags: article.tags.slice(0, 3) // 上位3タグのみ保存
      }))
    };
    
    // 出力ディレクトリを作成（存在しない場合）
    const outputDir = path.join(__dirname, '../src/data');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // ファイルに保存
    const outputPath = path.join(outputDir, 'popularArticles.json');
    fs.writeFileSync(outputPath, JSON.stringify(popularArticlesData, null, 2));
    
    console.log('✅ 人気記事を更新しました');
    console.log(`💾 保存先: ${outputPath}`);
    console.log('🏆 トップ10記事:');
    topArticles.forEach((article, index) => {
      const days = Math.floor((new Date() - new Date(article.publishedAt)) / (1000 * 60 * 60 * 24));
      console.log(`  ${index + 1}. ${article.title.substring(0, 50)}...`);
      console.log(`     スコア: ${article.popularityScore}, 公開: ${days}日前`);
      console.log(`     カテゴリ: ${article.categories.join(', ')}`);
      console.log('');
    });

    
  } catch (error) {
    console.error('❌ 人気記事更新エラー:', error);
  }
}

// スクリプト実行
if (require.main === module) {
  updatePopularArticles();
}

module.exports = { updatePopularArticles, calculatePopularityScore };
