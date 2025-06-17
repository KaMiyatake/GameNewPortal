require('dotenv').config({ path: '.env.local' });

async function checkVercelProject() {
  console.log('=== Vercel Project Information ===');
  
  try {
    // プロジェクト一覧を取得
    const projectsResponse = await fetch('https://api.vercel.com/v9/projects', {
      headers: {
        'Authorization': `Bearer ${process.env.VERCEL_ACCESS_TOKEN}`,
      }
    });

    if (projectsResponse.ok) {
      const projectsData = await projectsResponse.json();
      console.log('\n📋 Your Projects:');
      
      projectsData.projects.forEach((project, index) => {
        console.log(`  ${index + 1}. ${project.name} (ID: ${project.id})`);
        if (project.id === process.env.VERCEL_PROJECT_ID) {
          console.log('     ✅ This matches your VERCEL_PROJECT_ID');
        }
      });
      
      // 指定されたプロジェクトIDが存在するかチェック
      const targetProject = projectsData.projects.find(p => p.id === process.env.VERCEL_PROJECT_ID);
      
      if (targetProject) {
        console.log(`\n✅ Project found: ${targetProject.name}`);
        console.log(`   Framework: ${targetProject.framework || 'Not specified'}`);
        console.log(`   Updated: ${new Date(targetProject.updatedAt).toLocaleString()}`);
      } else {
        console.log('\n❌ Your VERCEL_PROJECT_ID does not match any of your projects');
        console.log('   Please check your .env.local file');
      }
    } else {
      console.log('Failed to fetch projects:', await projectsResponse.text());
    }
  } catch (error) {
    console.log('Error:', error.message);
  }
}

checkVercelProject().catch(console.error);
