// src/data/articles/2025/06/25061202-elden-ring-nightreign.ts
import { ArticleDetail } from '../../../utils/types';
import { getArticleImagePath } from '../../../../utils/image-paths';

export const comp25061202: ArticleDetail = {
  id: 25061202,
  title: '『エルデンリング ナイトレイン』Steamで高い人気を継続中！12万人超のプレイヤーが示すコンテンツの魅力',
  summary: 'エルデンリング ナイトレインが12万人超の同時プレイヤーを維持、85点のレビュースコアと88%の推奨率でSteamでの高い人気を証明。データ分析から見える継続的な魅力とは。',
  content: `
    <p>2025年6月12日現在、『エルデンリング ナイトレイン』がSteamで非常に高い人気を維持していることが、最新のデータ分析で明らかになりました。同時接続プレイヤー数は12万人を超え、レビュー評価も85点という高スコアを記録しています。</p>
    
    <h2>Steamデータ分析結果</h2>
    <p>Steam Web APIから取得した最新データによると、『エルデンリング ナイトレイン』の現在プレイヤー数は122,898人を記録。これは全期間ピークの240,640人から約49%の減少となっているものの、30日平均の156,411人と比較しても安定した人気を維持していることを示しています。</p>
    
    <img src="${getArticleImagePath('2025', '06', '25061202-elden-ring-nightreign', 'screenshot-1.jpg')}" alt="エルデンリング ナイトレイン ゲームプレイスクリーンショット" />
    
    <h2>レビュー評価も良好</h2>
    <p>プレイヤー数だけでなく、レビュー評価も注目すべき数値を示しています。現在のレビュースコアは85点（100点満点）、推奨率は88%と、エルデンリングシリーズらしい高い評価を獲得しています。</p>
    
    <!-- インタラクティブチャート埋め込み -->
    <div 
      data-interactive-charts
      data-section-title="関連データ分析"
      data-section-description="Steam Web APIとSteamChartsから取得した最新データに基づく詳細分析"
      data-chart-configs='[
        {
          "type": "line",
          "title": "プレイヤー数推移（直近6日間）",
          "labels": ["6/7", "6/8", "6/9", "6/10", "6/11", "6/12"],
          "datasets": [{
            "label": "プレイヤー数",
            "data": [185000, 170000, 160000, 145000, 135000, 122898],
            "borderColor": "#3498db",
            "backgroundColor": "rgba(52, 152, 219, 0.1)",
            "borderWidth": 3,
            "fill": true,
            "tension": 0.4,
            "pointBackgroundColor": "#3498db",
            "pointBorderColor": "#ffffff",
            "pointBorderWidth": 2,
            "pointRadius": 6,
            "pointHoverRadius": 8
          }],
          "source": "Steam Web API, SteamCharts (2025年6月時点)",
          "yAxisFormat": "count"
        },
        {
          "type": "bar",
          "title": "レビュー評価比較",
          "labels": ["レビュースコア", "推奨率"],
          "datasets": [{
            "label": "評価",
            "data": [85, 88],
            "backgroundColor": [
              "rgba(155, 89, 182, 0.8)",
              "rgba(243, 156, 18, 0.8)"
            ],
            "borderColor": [
              "rgba(155, 89, 182, 1)",
              "rgba(243, 156, 18, 1)"
            ],
            "borderWidth": 2
          }],
          "source": "Steam, OpenCritic集計データ (2025年6月時点)",
          "yAxisMax": 100
        },
        {
          "type": "doughnut",
          "title": "プレイヤー分布分析",
          "labels": ["現在プレイヤー", "ピークからの減少"],
          "datasets": [{
            "label": "プレイヤー分布",
            "data": [122898, 117742],
            "backgroundColor": [
              "rgba(52, 152, 219, 0.8)",
              "rgba(236, 240, 241, 0.8)"
            ],
            "borderColor": [
              "rgba(52, 152, 219, 1)",
              "rgba(189, 195, 199, 1)"
            ],
            "borderWidth": 2
          }],
          "source": "SteamDB集計データ (全期間ピーク: 240,640人)"
        },
        {
          "type": "radar",
          "title": "総合パフォーマンス指標",
          "labels": ["プレイヤー数", "レビュー評価", "推奨率", "継続性", "話題性"],
          "datasets": [{
            "label": "エルデンリング ナイトレイン",
            "data": [75, 85, 88, 70, 90],
            "backgroundColor": "rgba(52, 152, 219, 0.2)",
            "borderColor": "rgba(52, 152, 219, 1)",
            "borderWidth": 2,
            "pointBackgroundColor": "rgba(52, 152, 219, 1)",
            "pointBorderColor": "#ffffff",
            "pointBorderWidth": 2,
            "pointRadius": 5,
            "pointHoverRadius": 8
          }],
          "source": "ゲーム賛否編集部 独自分析",
          "yAxisMax": 100
        }
      ]'
      data-summary-data='[
        {"label": "現在プレイヤー数", "value": "122,898人"},
        {"label": "全期間ピーク", "value": "240,640人"},
        {"label": "30日平均", "value": "156,411人"},
        {"label": "レビュースコア", "value": "85/100点"}
      ]'
    ></div>
    
    <h2>データから見える賛成の理由</h2>
    
    <h3>1. 高い現在プレイヤー数</h3>
    <p>約12.3万人の同時プレイヤーを維持していることは、ゲームの継続的な魅力を物語っています。これはSteamの人気ゲームランキングでも上位に位置する数値です。</p>
    
    <h3>2. 印象的なピーク記録</h3>
    <p>全期間最高の24万人超の同時プレイヤーを記録したことは、発売時の大きな話題性と期待値の高さを証明しています。</p>
    
    <h3>3. 安定した平均プレイヤー数</h3>
    <p>30日平均で15.6万人を維持していることは、一時的なブームではなく、継続的にプレイヤーに愛され続けているコンテンツであることを示しています。</p>
    
    <img src="${getArticleImagePath('2025', '06', '25061202-elden-ring-nightreign', 'screenshot-2.jpg')}" alt="エルデンリング ナイトレイン ボス戦スクリーンショット" />
    
    <h2>今後の展望</h2>
    <p>『エルデンリング ナイトレイン』は、従来のシリーズとは異なる新しいアプローチで多くのプレイヤーを魅了し続けています。12万人超のアクティブプレイヤーと85点の高評価は、FromSoftwareの新たな挑戦が成功していることを物語っています。</p>
    
    <p>継続的なアップデートとコンテンツ追加により、今後もこの高い人気は維持されることが期待されます。</p>
    
    <hr>
    
    <p><small><strong>出典:</strong><br>
    Steam Web API: https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/<br>
    SteamCharts: https://steamcharts.com/app/2622380<br>
    Data © SteamDB</small></p>
  `,
  imageUrl: getArticleImagePath('2025', '06', '25061202-elden-ring-nightreign', 'main.jpg'),
  categories: ['PC', 'PlayStation', 'Xbox', 'ゲーム賛否'],
  tags: ['ELDEN RING', 'FromSoftware', 'アクション', 'Steam', 'データ分析', 'プレイヤー数'],
  publishedAt: '2025-06-12',
  slug: '25061202-elden-ring-nightreign',
  author: 'ゲーム賛否編集部',
  featured: true,
  popular: true,
  relatedArticleIds: [25061201, 25061203]
};
