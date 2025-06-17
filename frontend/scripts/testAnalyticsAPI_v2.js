require('dotenv').config({ path: '.env.local' });

async function testAnalyticsAPI() {
  console.log('=== Vercel Analytics API Test (Updated) ===');
  
  // 最新のVercel Analytics APIエンドポイントを試行
  const endpoints = [
    {
      name: 'Analytics API v1',
      url: `https://api.vercel.com/v1/analytics/pages/${process.env.VERCEL_PROJECT_ID}`,
      method: 'GET',
      params: new URLSearchParams({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7日前
        to: new Date().toISOString(),
        limit: '10'
      })
    },
    {
      name: 'Analytics API v2 (Web Vitals)',
      url: `https://api.vercel.com/v1/analytics/web-vitals/${process.env.VERCEL_PROJECT_ID}`,
      method: 'GET',
      params: new URLSearchParams({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
        limit: '10'
      })
    },
    {
      name: 'Analytics Events API',
      url: `https://api.vercel.com/v1/analytics/events/${process.env.VERCEL_PROJECT_ID}`,
      method: 'GET',
      params: new URLSearchParams({
        from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
        to: new Date().toISOString(),
        limit: '10'
      })
    },
    {
      name: 'Legacy Analytics API',
      url: 'https://vercel.com/api/web/insights/pages',
      method: 'POST',
      body: {
        projectId: process.env.VERCEL_PROJECT_ID,
        timeframe: '7d',
        limit: 10
      }
    }
  ];

  for (const endpoint of endpoints) {
    console.log(`\n🔗 Testing: ${endpoint.name}`);
    
    try {
      let url = endpoint.url;
      let requestOptions = {
        method: endpoint.method,
        headers: {
          'Authorization': `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        }
      };

      // GETリクエストの場合はURLにパラメータを追加
      if (endpoint.method === 'GET' && endpoint.params) {
        url += '?' + endpoint.params.toString();
      }
      
      // POSTリクエストの場合はbodyを追加
      if (endpoint.method === 'POST' && endpoint.body) {
        requestOptions.body = JSON.stringify(endpoint.body);
      }
      
      console.log(`   URL: ${url}`);
      
      const response = await fetch(url, requestOptions);
      console.log(`   Status: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        const data = await response.json();
        console.log(`   ✅ Success!`);
        
        // レスポンス構造を確認
        console.log(`   📊 Response keys: ${Object.keys(data).join(', ')}`);
        
        if (data.data && Array.isArray(data.data)) {
          console.log(`   📈 Data entries: ${data.data.length}`);
          if (data.data.length > 0) {
            console.log('   📝 Sample entries:');
            data.data.slice(0, 3).forEach((item, index) => {
              console.log(`     ${index + 1}. ${JSON.stringify(item).substring(0, 100)}...`);
            });
          }
        } else if (data.pages && Array.isArray(data.pages)) {
          console.log(`   📈 Pages entries: ${data.pages.length}`);
          if (data.pages.length > 0) {
            console.log('   📝 Sample pages:');
            data.pages.slice(0, 3).forEach((item, index) => {
              console.log(`     ${index + 1}. ${item.path || item.url} - ${item.views || item.pageviews} views`);
            });
          }
        } else {
          console.log(`   📋 Raw response: ${JSON.stringify(data).substring(0, 200)}...`);
        }
        
        return; // 成功したら終了
      } else {
        const errorText = await response.text();
        console.log(`   ❌ Error: ${errorText.substring(0, 200)}`);
      }
    } catch (error) {
      console.log(`   ❌ Request failed: ${error.message}`);
    }
  }
  
  console.log('\n❌ All Analytics API endpoints failed');
  console.log('💡 This might mean:');
  console.log('   1. Analytics is not enabled for your project');
  console.log('   2. No analytics data available yet (need some page visits)');
  console.log('   3. API endpoints have changed');
}

testAnalyticsAPI().catch(console.error);
