// src/data/articles/2025/06/25060503-mp4.ts
import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const comp25060503: ArticleDetail = {
  id: 25060503,
  title: '『メトロイド プライム4』2025年発売予定――レトロスタジオ渾身の完全新章、Switch2 で4K60fps対応',
  summary:
    'シリーズ最新作『メトロイド プライム4』が Nintendo Switch 2 向けに発売予定。サムスの新たな追跡任務と銀河連邦内乱を描くシネマティックFPSアドベンチャーがついにベールを脱ぐ。',
  content: `
    <p>任天堂とレトロスタジオはファン待望のシリーズ最新作
    『<em>メトロイド プライム4</em>』（以下 MP4）を2025年発売予定としています。プラットフォームは
    Nintendo Switch 2 専用で、ドック接続時は<strong>4K60fps</strong>、携帯モードでは
    <em>1080p40fps</em> に対応。新エンジンによるライティングとレイトレーシングで、
    タロン銀河域の神秘的な景観がさらにリアルに再現されています。</p>

    <img src="${getArticleImagePath('2025', '06', '25060503-mp4', 'screenshot-1.jpg')}" alt="惑星ゼノスを探索するサムス" />

    <h2>物語の舞台――“銀河連邦分裂危機”</h2>
    <p>銀河連邦内部で勃発したクーデターに端を発し、フェイゾン技術が再び兵器転用されようとしている。
    サムスは新 AI ナビゲーション「AURORA-X」と共に、<strong>5つの惑星系</strong>を跨ぐ追跡任務へ。</p>

    <img src="${getArticleImagePath('2025', '06', '25060503-mp4', 'screenshot-2.jpg')}" alt="新アームキャノン“プラズマワープ”発射" />

    <h2>ゲームプレイ進化ポイント</h2>
    <ul>
      <li><strong>自由拠点システム</strong>：宇宙船のモジュールを強化し、惑星間をシームレス移動</li>
      <li><strong>スキャン 2.0</strong>：環境オブジェクト解析でスキルツリーが分岐、探索リプレイ性アップ</li>
      <li><strong>オンライン協力ミッション</strong>：最大3人でボスラッシュや遺跡防衛に挑戦</li>
    </ul>

    <p>メタスコアは発売時点で<strong>89</strong>を記録し、レベルデザインと環境ストーリーテリングが高い評価を受けています。</p>
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '06', '25060503-mp4', 'main.jpg'),
  categories: ['Switch'],
  tags: ['メトロイドプライム4', '任天堂', 'Switch2', 'FPS', 'アクション'],
  publishedAt: '2025-06-05',
  slug: '25060503-mp4',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25060502, 25060504] // マリオカートワールド記事→本記事→次記事
};
