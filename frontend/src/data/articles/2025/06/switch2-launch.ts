import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const switch2Launch: ArticleDetail = {
  id: 25060501,
  title: 'Nintendo Switch 2 本日発売！ 4K＆120fps対応の次世代ハイブリッド機がついに登場',
  summary:
    '6月5日、任天堂の新型ゲーム機「Nintendo Switch 2」が世界同時発売。4K出力・120fps描画・大型1080p液晶ディスプレイを備え、初日ラインアップとして『マリオカート ワールド』など 12 本がリリース。',
  content: `
    <p>任天堂は<strong>2025年6月5日</strong>、次世代ハイブリッドゲーム機
    <strong>「Nintendo Switch 2」</strong>（以下 Switch2）を発売しました。先代 Switch の携帯／据置スタイルを踏襲しつつ、
    <em>最大4K120fps</em> 出力をサポートし、内蔵ストレージは 256GB に拡張。新設計の<strong>Joy-Con 2</strong>は磁気接続となり、
    HD振動も高精細化しています。</p>

    <img src="${getArticleImagePath('2025', '06', 'switch2-launch', 'screenshot-1.jpg')}" alt="Switch2 本体とJoy-Con 2" />

    <h2>主なスペック</h2>
    <ul>
      <li>CPU：NVIDIA Tegra T239 Ampere カスタム</li>
      <li>メモリ：16GB LPDDR5</li>
      <li>ディスプレイ：8.0インチ 1080p HDR OLED（携帯モード）</li>
      <li>ドック：HDMI 2.1、4K120fps/8K60fps 出力対応</li>
      <li>ストレージ：256GB（microSDXC 最大 2TB 拡張）</li>
      <li>無線：Wi-Fi 7 / Bluetooth 5.4 / NFC</li>
    </ul>

    <img src="${getArticleImagePath('2025', '06', 'switch2-launch', 'screenshot-2.jpg')}" alt="4K120fps対応のゲームプレイ画面" />

    <h2>ローンチタイトル一覧（一部）</h2>
    <ol>
      <li>『マリオカート ワールド』</li>
      <li>『ゼルダの伝説 時の王女』</li>
      <li>『ポケットモンスター クリスタルダスク』</li>
      <li>『メトロイド プライム4』</li>
      <li>『スプラトゥーン3 Turbo』</li>
      <li>『ELDEN RING: Nightreign』（Switch2最適化版）</li>
    </ol>

    <h2>旧Switch からの移行も簡単</h2>
    <p>初回セットアップ時に旧 Switch 本体を近づけるだけで、<strong>セーブデータ・ユーザー・eショップ残高</strong>を
    ワイヤレス転送できます。また、物理ソフトは後方互換により 4Kアップスケールでプレイ可能。</p>

    <img src="${getArticleImagePath('2025', '06', 'switch2-launch', 'screenshot-3.jpg')}" alt="セットアップUIと転送画面" />

    <h2>今後のアップデートロードマップ</h2>
    <p>任天堂は 2025年秋に<strong>VRモード</strong>（別売ヘッドセット）と<strong>クラウドセーブ自動同期</strong>を
    ファームウェアアップデートで実装予定と発表しています。</p>
  `,
  // メイン画像
  imageUrl: getArticleImagePath('2025', '06', 'switch2-launch', 'main.jpg'),
  categories: ['Switch'],
  tags: ['Nintendo Switch 2', '新ハード', 'ローンチ', '任天堂'],
  publishedAt: '2025-06-05',
  slug: 'switch2-launch',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25060301, 25060502] // 発売直前記事 → 今回 → 6/5夜の追加記事想定
};
