import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const deltaruneCh34Launch: ArticleDetail = {
  id: 25060302,
  title: '『DELTARUNE』チャプター3＆4が6月5日に発売、全プラットフォームへ展開',
  summary:
    'トビー・フォックス氏は、長らく開発中だった『DELTARUNE』チャプター3と4を 2025年6月5日（木）に同時リリースすると発表しました。Nintendo Switch 2 のローンチタイトルとしても登場し、Steam／PS4／PS5 版は同時配信となります。',
  content: `
    <p>開発者 <strong>Toby Fox</strong> 氏は本日、『DELTARUNE』チャプター3＆4を収録した有料パッケージ版を<strong>6月5日</strong>に発売すると正式発表しました。価格は4,980円（税込）で、購入後に予定されているチャプター5以降は<strong>無料アップデート</strong>として追加されます。</p>

    <img src="${getArticleImagePath('2025', '06', 'deltarune-ch34-launch', 'screenshot-1.jpg')}" alt="チャプター3のゲームプレイシーン" />

    <h2>Switch 2 向けの最適化</h2>
    <p>Switch 2 版は 60fps 対応に加え、HD振動でバトル演出を強化。セーブデータは Switch（初代）ともクロスセーブが可能です。</p>

    <img src="${getArticleImagePath('2025', '06', 'deltarune-ch34-launch', 'screenshot-2.jpg')}" alt="チャプター4のバトル画面" />

    <h2>今後のロードマップ</h2>
    <ul>
      <li>チャプター5：2026年内予定（無料アップデート）</li>
      <li>チャプター6以降：未発表（開発進行中）</li>
      <li>物理パッケージ版：2025年冬にFangamerより発売</li>
    </ul>
    <p>PC 版（Steam）は発売日から <em>Steam Cloud</em> と <em>Steam Deck Verified</em> をサポート予定です。</p>
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '06', 'deltarune-ch34-launch', 'main.jpg'),
  categories: ['Switch', 'PC', 'PlayStation'],
  tags: ['DELTARUNE', 'トビー・フォックス', 'インディーRPG', 'チャプター3', 'チャプター4'],
  publishedAt: '2025-06-05',
  slug: 'deltarune-ch34-launch',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25060301, 25060303]
};
