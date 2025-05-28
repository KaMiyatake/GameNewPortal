import { ArticleDetail } from '../../../utils/types';

export const metroidPrime4Update: ArticleDetail = {
  id: 101,
  title: '『メトロイドプライム4』開発状況が明らかに',
  summary: '任天堂が『メトロイドプライム4』の開発進捗を報告。新たなビジュアルと共にゲームプレイの詳細が公開。',
  content: `
    <p>任天堂は本日、『メトロイドプライム4』の最新開発情報を公開しました。</p>
    <h2>新たなビジュアルエンジン</h2>
    <p>Unreal Engine 5を採用し、シリーズ史上最高のビジュアルを実現。</p>
    <h2>ゲームプレイの特徴</h2>
    <ul>
      <li>新たなスキャンシステム</li>
      <li>進化したモーフボール機能</li>
      <li>AIによる適応型難易度調整</li>
    </ul>
  `,
  imageUrl: 'https://placehold.co/800x450?text=Metroid+Prime+4&font=montserrat',
  category: 'Nintendo Switch',
  tags: ['メトロイド', '任天堂', 'FPS', 'アクション'],
  publishedAt: '2025-04-25',
  slug: 'metroid-prime-4-update',
  author: '鈴木次郎',
  featured: true,
  popular: true,
  relatedArticleIds: [1, 7]
};