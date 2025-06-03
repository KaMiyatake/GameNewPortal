import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const eldenRingNightreignPatch1011: ArticleDetail = {
  id: 25060303,
  title: '『ELDEN RING: Nightreign』パッチ1.01.1配信――ソロ報酬50%増＆自動復活など大幅調整',
  summary:
    'フロム・ソフトウェアは協力ローグライク『ELDEN RING: Nightreign』向けにパッチ1.01.1を配信。ソロプレイ時の報酬50%増加や「夜間ボス戦で1度だけ自動復活」など、ソロ救済を中心にバランスを改善している。',
  content: `
    <p>2025年6月3日、フロム・ソフトウェアは『<strong>ELDEN RING: Nightreign</strong>』の最新アップデート
    <strong>パッチ1.01.1</strong>を配信しました。本パッチでは<strong>ソロプレイ体験の底上げ</strong>と、
    発売直後から指摘されていた安定性の問題が重点的に修正されています。</p>

    <img src="${getArticleImagePath('2025', '06', 'elden-ring-nightreign-patch1011', 'screenshot-1.jpg')}" alt="パッチ1.01.1ゲームプレイシーン" />

    <h2>主な変更点</h2>
    <ul>
      <li><strong>ソロ報酬＋50％</strong>：マルチ推奨タイトルながら、単独挑戦者の攻略スピードを緩和。</li>
      <li><strong>自動復活（夜間ボス戦で1回）</strong>：倒されても&quot;Night Candle&quot;が再点火し、その場で即復帰。</li>
      <li><strong>マッチメイキング最適化</strong>：待機時のタイムアウトを短縮、再検索を自動化。</li>
      <li>メモリリークを修正し<strong>PC版のクラッシュ頻度を低減</strong>。</li>
      <li>一部武器の&nbsp;Hit&nbsp;Box 調整、テキスト誤表記を修正。</li>
    </ul>

    <img src="${getArticleImagePath('2025', '06', 'elden-ring-nightreign-patch1011', 'screenshot-2.jpg')}" alt="Nightreign キーアート" />

    <h2>次回アップデート予告</h2>
    <p>公式サイトによれば、<em>パッチ1.02</em>ではデュオ用マッチとウルトラワイド対応を
    6月下旬に実装予定とのこと。PvE バランス調整も合わせて実施される見込みです。</p>

    <p>ソロ派のプレイヤーは今回のバフで探索がグッと楽になるはず。<br />
    ぜひアップデートを適用して、新たな夜の狭間に挑みましょう。</p>
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '06', 'elden-ring-nightreign-patch1011', 'main.jpg'),
  categories: ['PlayStation', 'Xbox', 'PC'],
  tags: ['ELDEN RING', 'Nightreign', 'パッチ1.01.1', 'アップデート', 'FromSoftware'],
  publishedAt: '2025-06-03',
  slug: 'elden-ring-nightreign-patch1011',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25060301, 25060302]
};
