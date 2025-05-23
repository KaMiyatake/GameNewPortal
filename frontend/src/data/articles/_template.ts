import { ArticleDetail } from '../utils/types';

// 新しい記事を作成する際のテンプレート
export const articleTemplate: ArticleDetail = {
  id: 0, // 新しいIDを割り当て
  title: '',
  summary: '',
  content: `
    <p></p>
    
    <h2></h2>
    <p></p>
    
    <h2></h2>
    <ul>
      <li></li>
      <li></li>
    </ul>
  `,
  imageUrl: 'https://placehold.co/800x450?text=New+Article&font=montserrat',
  category: '', // 'コンソール', 'PC', 'モバイル', 'インディー', 'マルチプラットフォーム'
  tags: [],
  publishedAt: '', // YYYY-MM-DD形式
  slug: '',
  author: '',
  featured: false,
  popular: false,
  relatedArticleIds: [],
};
