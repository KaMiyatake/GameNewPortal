import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const comp25060502: ArticleDetail = {
  id: 25060502,
  title: '『マリオカート ワールド』本日発売！ シリーズ初の最大20人の対戦を実現',
  summary:
    '任天堂は2025年6月5日、Nintendo Switch 2 向け完全新作『マリオカート ワールド』を発売しました。シリーズ初のクロスプレイと120fps対応で、世界規模のレースが開幕します。',
  content: `
    <p>任天堂は<strong>2025年6月5日</strong>、Nintendo Switch 2 のローンチタイトルとして
    『<em>マリオカート ワールド</em>』を発売しました。本作は世界各都市をモチーフにした
    <em>48コース</em>を収録し、最大20人が同時に走る対戦を実現。
    4K120fps（ドック接続時）にも対応し、高精細なレース体験を提供します。</p>

    <img src="${getArticleImagePath('2025', '06', '25060502-mk-world', 'screenshot-1.jpg')}" alt="ニューヨークコースを走るマリオとリンク" />

    <h2>主な新要素</h2>
    <ul>
      <li><strong>ワールドツアーモード</strong>：東京、ニューヨーク、パリなどを週替わりで巡るライブサービス型イベント</li>
      <li><strong>キャラクター数 45体</strong>：リンク、カービィ、インクリングなどゲスト枠が大幅拡充</li>
      <li><strong>カートカスタム</strong>：タイヤ径やバッテリー出力など細部まで調整し、保存＆共有できる</li>
    </ul>

    <img src="${getArticleImagePath('2025', '06', '25060502-mk-world', 'screenshot-2.jpg')}" alt="20人同時レースのスタートシーン" />

    <h2>Switch 2 ならではの機能</h2>
    <p>新型<strong>Joy-Con 2</strong>の精密HD振動でドリフトの路面感覚が手元に伝わるほか、
    本体内蔵の空間オーディオによりエンジン音と環境音が立体的に聞こえます。</p>

    <p>発売初日から<strong>クロスプレイβ</strong>が有効化されており、ソフトを持っていないフレンドも
    <em>ゲストパス（7日間）</em>で体験可能。シリーズファンはもちろん、新規ユーザーも参加しやすい設計です。</p>
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '06', '25060502-mk-world', 'main.jpg'),
  categories: ['Switch'],
  tags: ['マリオカート', '任天堂', 'Switch2', 'レース', 'ローンチ'],
  publishedAt: '2025-06-05',
  slug: '25060502-mk-world',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25060501, 25060503] // 直前の記事 ・ 次の記事
};
