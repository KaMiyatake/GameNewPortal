// src/features/articles/2025/06/sf6-elena-y12.ts
import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const sf6ElenaY12: ArticleDetail = {
  id: 25060501,
  title: '『ストリートファイター6』にエレナ参戦、“Years 1-2 Fighters Edition”も発売決定',
  summary:
    'カプコンは『ストリートファイター6』にシリーズ人気キャラ「エレナ」を6月5日に追加すると発表。同日にはYear1とYear2の全追加キャラ＆ステージを収録した完全版“Years 1-2 Fighters Edition”も発売される。',
  content: `
    <p>カプコンは2025年6月5日（木）、『ストリートファイター6』のDLC第6弾キャラクターとして「<strong>エレナ</strong>」を実装し、同時に<strong>“Years 1-2 Fighters Edition”</strong>（以下Y12FE）を発売すると発表しました。</p>

    <img src="${getArticleImagePath('2025','06','sf6-elena-y12','main.jpg')}" alt="Years 1-2 Fighters Edition キービジュアル" />

    <h2>エレナの特徴とバトルスタイル</h2>
    <p>『ストIII』シリーズ以来の参戦となるエレナは、<em>長いリーチの足技</em>とリズミカルな連撃が持ち味。<br />
    シリーズおなじみの回復スーパーアーツ「Healing」も<strong>Driveシステムに最適化</strong>され再登場します。</p>

    <img src="${getArticleImagePath('2025','06','sf6-elena-y12','screenshot-1.jpg')}" alt="エレナのバトルシーン" />

    <h2>“Years 1-2 Fighters Edition” とは？</h2>
    <ul>
      <li>Year1＋Year2キャラクターパス（計 8 体）</li>
      <li>追加ステージ 4 つ（Year2 まで）</li>
      <li>初期 18 キャラの <code>Outfit 1 Color 3-10</code></li>
    </ul>

    <p>これから始めるプレイヤー向けの<strong>オールインワンパッケージ</strong>で、Switch 2 版を含む全プラットフォームに同時発売されます。</p>

    <img src="${getArticleImagePath('2025','06','sf6-elena-y12','screenshot-2.jpg')}" alt="Y12FE パッケージアート" />
  `,
  imageUrl: getArticleImagePath('2025', '06', 'sf6-elena-y12'),
  categories: ['PS5', 'Xbox', 'PC', 'Switch'],
  tags: ['ストリートファイター6', 'エレナ', 'DLC', 'Fighting', 'カプコン'],
  publishedAt: '2025-06-05',
  slug: 'sf6-elena-y12',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: false,
  relatedArticleIds: [25060304, 25052802]
};
