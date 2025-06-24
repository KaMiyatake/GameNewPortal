// scripts/generate-x-posts.js (ニュース投稿形式修正版)
const path = require('path');

class XPostGenerator {
  constructor() {
    this.baseUrl = 'https://gamesanpi.com';
    this.categoryEmojis = {
      'PlayStation': '🎮',
      'Switch': '🕹️', 
      'PC': '💻',
      'モバイル': '📱',
      'Xbox': '🎯',
      'ゲーム賛否': '⚖️',
      'VR': '🥽',
      'エンタメ': '🎭',
      '業界ニュース': '📰',
      'eスポーツ': '🏆'
    };
    
    this.loadArticleData();
  }

  loadArticleData() {
    try {
      delete require.cache[require.resolve('../src/data/articles/index.ts')];
      const { allArticles, articlesBySlug } = require('../src/data/articles/index.ts');
      
      this.allArticles = allArticles;
      this.articlesBySlug = articlesBySlug;
      
      console.log(`✅ ${this.allArticles.length}件の記事データを読み込みました`);
      
    } catch (error) {
      console.error('❌ 記事データの読み込みに失敗:', error.message);
      this.createSampleData();
    }
  }

  createSampleData() {
    console.log('📝 サンプルデータで実行中...');
    
    this.allArticles = [
      {
        id: 25062302,
        title: '『DEATH STRANDING 2: ON THE BEACH』最新ゲームプレイトレーラー公開！荒廃した世界と進化した戦闘システムが明らかに',
        summary: 'コジマプロダクションの最新作『DEATH STRANDING 2: ON THE BEACH』の新たなゲームプレイトレーラーが公開され、進化した戦闘システムや新要素が明らかになりました。',
        categories: ['PlayStation', 'PC'],
        tags: ['デススト2', 'コジマプロダクション', 'PS5', 'アクション'],
        slug: '25062302-death-stranding2-trailer',
        publishedAt: '2025-06-23',
        author: 'ゲーム賛否編集部'
      }
    ];
    
    this.articlesBySlug = {
      '25062302-death-stranding2-trailer': this.allArticles[0]
    };
  }

  generatePostVariations(article) {
    const variations = [];
    
    // パターン1: シンプルニュース投稿（修正版）
    variations.push(this.generateNewsPost(article));
    
    // パターン2: 議論誘発型
    variations.push(this.generateEngagementPost(article));
    
    // パターン3: 質問型
    variations.push(this.generateQuestionPost(article));
    
    return variations;
  }

  // 修正版: シンプルなニュース投稿
  generateNewsPost(article) {
    const url = `${this.baseUrl}/news/${article.slug}`;
    const hashtags = this.generateHashtags(article);
    
    const content = `${article.title}

詳細はこちら↓
${url}

${hashtags}`;

    return {
      type: 'ニュース投稿',
      content: content,
      length: content.length,
      estimatedEngagement: 'Medium',
      bestTime: '平日 8-12時, 19-21時'
    };
  }

  generateEngagementPost(article) {
    const emoji = this.categoryEmojis[article.categories[0]] || '🎮';
    const url = `${this.baseUrl}/news/${article.slug}`;
    const hashtags = this.generateHashtags(article);
    
    const content = `🔥 話題沸騰中！

${article.title}

この件について皆さんはどう思いますか？
コメントで教えてください👇

${hashtags}
${url}`;

    return {
      type: '議論誘発型',
      content: content,
      length: content.length,
      estimatedEngagement: 'High',
      bestTime: '平日 12-13時, 20-22時'
    };
  }

  generateQuestionPost(article) {
    const emoji = this.categoryEmojis[article.categories[0]] || '🎮';
    const url = `${this.baseUrl}/news/${article.slug}`;
    const hashtags = this.generateHashtags(article);
    
    const questions = this.generateContextualQuestions(article);
    
    const content = `${emoji} ${article.title}

${questions.main}

👍 賛成
👎 反対  
🤔 どちらとも言えない

詳細はこちら↓
${url}

${hashtags}`;

    return {
      type: '質問投票型',
      content: content,
      length: content.length,
      estimatedEngagement: 'Very High',
      bestTime: '平日 19-21時, 休日 15-17時',
      pollSuggestion: true
    };
  }

  generateContextualQuestions(article) {
    const title = article.title.toLowerCase();
    
    if (title.includes('価格') || title.includes('値上げ') || title.includes('セール')) {
      return {
        main: 'この価格設定についてどう思いますか？',
        sub: 'ゲームの適正価格って難しいですよね🤔'
      };
    }
    
    if (title.includes('発売') || title.includes('リリース')) {
      return {
        main: '期待度はいかがですか？',
        sub: '楽しみにしていた方も多いのでは？✨'
      };
    }
    
    if (title.includes('トレーラー') || title.includes('公開')) {
      return {
        main: 'このトレーラーを見てどう感じましたか？',
        sub: '期待が高まりますね！🎮'
      };
    }
    
    if (title.includes('アップデート') || title.includes('パッチ')) {
      return {
        main: 'このアップデートをどう評価しますか？',
        sub: 'プレイヤーの反応が気になります🎮'
      };
    }
    
    if (title.includes('賛否') || title.includes('評価')) {
      return {
        main: 'この件についてどちら派ですか？',
        sub: '賛否が分かれそうな話題ですね⚖️'
      };
    }
    
    return {
      main: 'この件についてどう思いますか？',
      sub: 'ゲーム業界の動向として注目ですね👀'
    };
  }

  generateHashtags(article) {
    const baseHashtags = ['#ゲーム賛否', '#ゲームニュース'];
    let hashtags = [...baseHashtags];
    
    const categoryHashtags = {
      'PlayStation': ['#PlayStation', '#PS5'],
      'Switch': ['#NintendoSwitch', '#Nintendo'],
      'PC': ['#PCゲーム', '#Steam'],
      'Xbox': ['#Xbox', '#GamePass'],
      'ゲーム賛否': ['#賛否両論', '#ゲームレビュー'],
      'eスポーツ': ['#eスポーツ', '#eSports'],
      'VR': ['#VRゲーム', '#VR'],
      'モバイル': ['#スマホゲーム', '#モバイルゲーム'],
      'エンタメ': ['#エンタメ', '#ゲームエンタメ'],
      '業界ニュース': ['#ゲーム業界', '#業界ニュース']
    };
    
    article.categories.forEach(category => {
      if (categoryHashtags[category]) {
        hashtags.push(...categoryHashtags[category]);
      }
    });
    
    const popularGameTags = ['デススト', 'FF14', 'エルデンリング', 'ポケモン', 'マリオ', 'コジマプロダクション'];
    article.tags.forEach(tag => {
      if (popularGameTags.some(popTag => tag.includes(popTag))) {
        hashtags.push(`#${tag}`);
      }
    });
    
    return hashtags.slice(0, 6).join(' ');
  }

  generateLatestArticlePosts() {
    if (!this.allArticles || this.allArticles.length === 0) {
      console.log('❌ 記事データが見つかりません');
      return [];
    }
    
    const latestArticle = this.allArticles[0];
    return this.generatePostVariations(latestArticle);
  }

  generatePostsForArticle(slug) {
    if (!this.articlesBySlug) {
      console.log('❌ 記事データが読み込まれていません');
      return [];
    }
    
    const article = this.articlesBySlug[slug];
    
    if (!article) {
      console.log(`❌ 記事が見つかりません: ${slug}`);
      console.log('📋 利用可能な記事一覧（最新10件）:');
      
      Object.keys(this.articlesBySlug).slice(0, 10).forEach(availableSlug => {
        const availableArticle = this.articlesBySlug[availableSlug];
        console.log(`  - ${availableSlug}`);
        console.log(`    ${availableArticle.title.substring(0, 50)}...`);
      });
      
      return [];
    }
    
    return this.generatePostVariations(article);
  }

  listAllArticles() {
    if (!this.allArticles) {
      console.log('❌ 記事データが読み込まれていません');
      return;
    }
    
    console.log(`📚 全記事一覧 (${this.allArticles.length}件):`);
    console.log('='.repeat(80));
    
    this.allArticles.slice(0, 20).forEach((article, index) => {
      console.log(`${index + 1}. ${article.slug}`);
      console.log(`   ${article.title.substring(0, 60)}...`);
      console.log(`   カテゴリ: ${article.categories.join(', ')}`);
      console.log(`   公開日: ${article.publishedAt}`);
      console.log('');
    });
    
    if (this.allArticles.length > 20) {
      console.log(`... 他 ${this.allArticles.length - 20} 件`);
    }
  }

  generateScheduledPosts() {
    return {
      morning: {
        type: '朝の挨拶',
        content: `☀️ おはようございます！

今日も最新のゲーム情報をお届けします✨
気になる記事があったらコメントで教えてくださいね👇

#ゲーム賛否 #朝のゲーム情報 #おはよう
${this.baseUrl}`,
        bestTime: '08:00-09:00'
      },
      
      lunch: {
        type: 'ランチタイム',
        content: `🍽️ お昼休みの皆さん！

ランチタイムにサクッと読める
今日の注目記事をチェック👇

何か面白いゲーム情報あったら教えてください😊

#ゲーム賛否 #ランチタイム #ゲーム情報
${this.baseUrl}`,
        bestTime: '12:00-13:00'
      },
      
      evening: {
        type: '夕方まとめ',
        content: `🌆 今日もお疲れ様でした！

本日の人気記事をまとめました📊
見逃した記事はありませんか？

明日も最新情報をお届けします！

#ゲーム賛否 #今日のまとめ #お疲れ様
${this.baseUrl}`,
        bestTime: '18:00-19:00'
      }
    };
  }
}

// CLI実行部分
const generator = new XPostGenerator();
const command = process.argv[2];
const param = process.argv[3];

switch (command) {
  case 'latest':
    console.log('📝 最新記事の投稿案生成中...\n');
    const latestPosts = generator.generateLatestArticlePosts();
    if (latestPosts.length > 0) {
      latestPosts.forEach((post, index) => {
        console.log(`\n🎯 パターン${index + 1}: ${post.type}`);
        console.log(`予想エンゲージメント: ${post.estimatedEngagement}`);
        console.log(`最適投稿時間: ${post.bestTime}`);
        if (post.pollSuggestion) {
          console.log('💡 投票機能の使用を推奨');
        }
        console.log('---');
        console.log(post.content);
        console.log(`文字数: ${post.length}/280`);
        console.log('='.repeat(50));
      });
    }
    break;
    
  case 'article':
    if (!param) {
      console.log('❌ 記事のslugを指定してください');
      console.log('例: npm run x-helper article 25062302-death-stranding2-trailer');
      console.log('\n📋 記事一覧を表示するには: npm run x-helper list');
      break;
    }
    
    console.log(`📝 記事「${param}」の投稿案生成中...\n`);
    const articlePosts = generator.generatePostsForArticle(param);
    if (articlePosts.length > 0) {
      articlePosts.forEach((post, index) => {
        console.log(`\n🎯 パターン${index + 1}: ${post.type}`);
        console.log(`予想エンゲージメント: ${post.estimatedEngagement}`);
        console.log(`最適投稿時間: ${post.bestTime}`);
        if (post.pollSuggestion) {
          console.log('💡 投票機能の使用を推奨');
        }
        console.log('---');
        console.log(post.content);
        console.log(`文字数: ${post.length}/280`);
        console.log('='.repeat(50));
      });
    }
    break;
    
  case 'list':
    generator.listAllArticles();
    break;
    
  case 'scheduled':
    console.log('📅 定期投稿用コンテンツ生成中...\n');
    const scheduledPosts = generator.generateScheduledPosts();
    Object.entries(scheduledPosts).forEach(([key, post]) => {
      console.log(`\n🕐 ${post.type} (${post.bestTime})`);
      console.log('---');
      console.log(post.content);
      console.log(`文字数: ${post.content.length}/280`);
      console.log('='.repeat(50));
    });
    break;
    
  default:
    console.log(`
🎮 ゲーム賛否 X投稿支援ツール

使用方法:
  npm run x-helper latest              # 最新記事の投稿案生成
  npm run x-helper article [slug]      # 特定記事の投稿案生成  
  npm run x-helper list                # 全記事一覧表示
  npm run x-helper scheduled           # 定期投稿用コンテンツ生成

例:
  npm run x-helper latest
  npm run x-helper article 25062302-death-stranding2-trailer
  npm run x-helper list
  npm run x-helper scheduled
`);
}

module.exports = XPostGenerator;
