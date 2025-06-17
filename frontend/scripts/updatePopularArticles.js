const fs = require('fs');
const path = require('path');

async function fetchVercelAnalytics() {
  console.log('Fetching Vercel Analytics data...');
  
  try {
    const response = await fetch('https://vercel.com/api/web/insights/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        projectId: process.env.VERCEL_PROJECT_ID,
        teamId: process.env.VERCEL_TEAM_ID, // チーム使用時のみ
        timeframe: '7d', // 過去7日間
        filter: {
          path: { startsWith: '/news/' }
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Analytics API error: ${response.status}`);
    }

    const data = await response.json();
    console.log(`Retrieved ${data.data?.length || 0} analytics entries`);
    
    return data;
  } catch (error) {
    console.error('Failed to fetch analytics:', error);
    return { data: [] };
  }
}

async function updatePopularArticles() {
  const analyticsData = await fetchVercelAnalytics();
  
  if (!analyticsData.data || analyticsData.data.length === 0) {
    console.log('No analytics data available, keeping existing popular articles');
    return;
  }
  
  // パスからスラッグを抽出してランキング作成
  const popularSlugs = analyticsData.data
    .filter(item => item.path.startsWith('/news/') && item.path !== '/news/')
    .sort((a, b) => b.views - a.views)
    .slice(0, 15) // 余裕を持って15件取得
    .map(item => ({
      slug: item.path.replace('/news/', ''),
      views: item.views,
      visitors: item.visitors
    }));

  // 既存ファイルの読み込み（エラー時は空配列）
  let existingData = { articles: [] };
  const outputPath = path.join(__dirname, '../src/data/popularArticles.json');
  
  try {
    const existingContent = fs.readFileSync(outputPath, 'utf8');
    existingData = JSON.parse(existingContent);
  } catch (error) {
    console.log('No existing popular articles file, creating new one');
  }

  // 新しいデータを作成
  const newData = {
    lastUpdated: new Date().toISOString(),
    dataSource: 'vercel-analytics',
    timeframe: '7d',
    articles: popularSlugs
  };

  // ファイルに書き込み
  fs.writeFileSync(outputPath, JSON.stringify(newData, null, 2));
  
  console.log(`✅ Updated popular articles: ${popularSlugs.length} articles`);
  console.log('Top 5 popular articles:');
  popularSlugs.slice(0, 5).forEach((article, index) => {
    console.log(`  ${index + 1}. ${article.slug} (${article.views} views)`);
  });
}

// スクリプト実行
updatePopularArticles().catch(console.error);
