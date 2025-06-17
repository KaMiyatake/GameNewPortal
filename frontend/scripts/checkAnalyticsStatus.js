require('dotenv').config({ path: '.env.local' });

async function checkAnalyticsStatus() {
  console.log('=== Analytics Status Check ===');
  
  try {
    // プロジェクト詳細を取得してAnalytics設定を確認
    const response = await fetch(`https://api.vercel.com/v9/projects/${process.env.VERCEL_PROJECT_ID}`, {
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      }
    });

    if (response.ok) {
      const project = await response.json();
      
      console.log(`\n📋 Project: ${project.name}`);
      console.log(`   ID: ${project.id}`);
      console.log(`   Framework: ${project.framework}`);
      console.log(`   Created: ${new Date(project.createdAt).toLocaleString()}`);
      console.log(`   Updated: ${new Date(project.updatedAt).toLocaleString()}`);
      
      // Analytics関連の設定を確認
      if (project.analytics) {
        console.log(`\n✅ Analytics configuration found:`);
        console.log(`   ${JSON.stringify(project.analytics, null, 2)}`);
      } else {
        console.log(`\n❌ No analytics configuration found`);
        console.log(`   💡 You may need to enable Analytics in Vercel Dashboard`);
      }
      
      // デプロイメント情報も確認
      console.log(`\n🚀 Recent deployments:`);
      if (project.targets && project.targets.production) {
        console.log(`   Production: ${project.targets.production.url}`);
      }
      
    } else {
      console.log('Failed to fetch project details:', await response.text());
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

checkAnalyticsStatus().catch(console.error);
