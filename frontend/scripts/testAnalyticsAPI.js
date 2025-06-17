require('dotenv').config({ path: '.env.local' });

// 環境変数の確認とAPI接続テスト
async function testAnalyticsAPI() {
  console.log('=== Vercel Analytics API Test ===');
  
  // 環境変数の確認
  const requiredVars = ['VERCEL_ACCESS_TOKEN', 'VERCEL_PROJECT_ID'];
  const optionalVars = ['VERCEL_TEAM_ID'];
  
  console.log('\n📋 Environment Variables:');
  let allSet = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    const isSet = value && value.length > 0;
    console.log(`  ${varName}: ${isSet ? '✅ Set' : '❌ Missing'}`);
    if (!isSet) allSet = false;
  });
  
  optionalVars.forEach(varName => {
    const value = process.env[varName];
    console.log(`  ${varName}: ${value ? '✅ Set (Team mode)' : 'ℹ️  Not set (Personal account)'}`);
  });

  if (!allSet) {
    console.log('\n❌ Required environment variables are missing!');
    console.log('Please create frontend/.env.local file with:');
    console.log('VERCEL_ACCESS_TOKEN=your_token_here');
    console.log('VERCEL_PROJECT_ID=your_project_id_here');
    console.log('VERCEL_TEAM_ID=your_team_id_here  # Optional for teams');
    return;
  }

  // API接続テスト
  try {
    console.log('\n🔗 Testing API connection...');
    
    const requestBody = {
      projectId: process.env.VERCEL_PROJECT_ID,
      timeframe: '1d',
      limit: 5
    };
    
    // チーム使用時のみteamIdを追加
    if (process.env.VERCEL_TEAM_ID) {
      requestBody.teamId = process.env.VERCEL_TEAM_ID;
    }
    
    console.log('Request body:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch('https://vercel.com/api/web/insights/pages', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`  Status: ${response.status} ${response.statusText}`);
    
    if (response.ok) {
      const data = await response.json();
      console.log(`  ✅ Success! Retrieved ${data.data?.length || 0} page entries`);
      
      if (data.data && data.data.length > 0) {
        console.log('\n📊 Sample data:');
        data.data.slice(0, 3).forEach((item, index) => {
          console.log(`  ${index + 1}. ${item.path} - ${item.views} views`);
        });
      } else {
        console.log('  ℹ️  No page data available (may be due to recent deployment)');
      }
    } else {
      const errorText = await response.text();
      console.log(`  ❌ Error: ${errorText}`);
      
      if (response.status === 401) {
        console.log('  💡 Hint: Check your VERCEL_ACCESS_TOKEN');
      } else if (response.status === 403) {
        console.log('  💡 Hint: Check your VERCEL_PROJECT_ID and VERCEL_TEAM_ID');
      }
    }
  } catch (error) {
    console.log(`  ❌ Request failed: ${error.message}`);
  }
}

testAnalyticsAPI().catch(console.error);
