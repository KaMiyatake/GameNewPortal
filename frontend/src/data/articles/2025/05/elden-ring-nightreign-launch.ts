import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const eldenRingNightreignLaunch: ArticleDetail = {
  id: 25053001,
  title: '『ELDEN RING: Nightreign』ついに発売――最大3人協力のローグライク冒険が開幕',
  summary:
    'フロム・ソフトウェアの新作『ELDEN RING: Nightreign』が2025年5月30日に発売。マルチプレイ重視のローグライク構造とシリーズ屈指の高難度ボスが特徴で、発売初週で200万本を突破した。​',
  content: `
    <p>バンダイナムコエンターテインメントとフロム・ソフトウェアは<strong>2025年5月30日</strong>、『<em>ELDEN RING: Nightreign</em>』を
    <strong>PS5／Xbox Series X|S／PC（Steam）</strong> 向けに世界同時リリースしました。
    本作は『ELDEN RING』の世界観を引き継ぎつつ、<em>最大3人協力</em>の
    <strong>ローグライクRPG</strong> へと進化したスタンドアロン作品です。</p>

    <img src="${getArticleImagePath('2025', '05', 'elden-ring-nightreign-launch', 'screenshot-1.jpg')}" alt="Nightreign ローンチトレーラー場面" />

    <h2>ゲームのポイント</h2>
    <ul>
      <li>周回ごとに生成が変わる<strong>「狭間の夜域」</strong>を探索し、ボスを討伐して灯火を取り戻す。</li>
      <li>3人チームの連携を重視した<strong>連携アーツ</strong>と、奥深いビルド要素を搭載。</li>
      <li>ソロプレイ用に<strong>敵配置や報酬量を調整</strong>し、一人でも攻略しやすい設計。</li>
    </ul>

    <img src="${getArticleImagePath('2025', '05', 'elden-ring-nightreign-launch', 'screenshot-2.jpg')}" alt="最大3人協力バトル" />

    <h2>好調な初動――200万本を突破</h2>
    <p>発売初週で<strong>200万本</strong>を販売し、早くもSteam同時接続25万を記録。フロム作品としては
    『ELDEN RING』に次ぐスピードでユーザー数を伸ばしています。​</p>

    <h2>評価は概ね良好、課題は「ソロ難度」</h2>
    <p>Metacritic スコアは<strong>78</strong>。協力プレイの革新性が高く評価される一方、マップバリエーションの少なさと
    クロスプレイ非対応が課題として挙げられています。​</p>

    <h2>今後のアップデート予定</h2>
    <p>公式ロードマップによると、6月上旬に<strong>パッチ1.01.1</strong>（ソロ報酬強化・自動復活追加）が配信予定。
    さらに年内に大型DLC第1弾が予告されています。</p>
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '05', 'elden-ring-nightreign-launch', 'main.jpg'),
  categories: ['PlayStation', 'Xbox', 'PC'],
  tags: ['ELDEN RING', 'Nightreign', 'ローグライク', 'フロム・ソフトウェア', '発売'],
  publishedAt: '2025-05-30',
  slug: 'elden-ring-nightreign-launch',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25052901, 25060301] // 発売前プレビュー & 6/3パッチ記事
};
