# ゲーム最新情報 取得先カタログ

## 1. 目的

`docs/news-collection-batch-design.md` で定義したゲーム最新情報収集バッチについて、監視対象とする公式情報源、取得方法、優先度、フィルター、実装上の注意を定義する。

本書のURLと提供形式は2026年8月4日時点の調査結果である。Webサイトやフィードは予告なく変更される可能性があるため、実装時と定期的な運用監査時に疎通確認を行う。

## 2. 選定原則

情報源は次の条件を満たすものを採用する。

- ゲーム会社、プラットフォーム運営者、ゲーム公式サイトなどの一次情報である
- 発表元とURLの所有者が明確である
- 公開日時、タイトル、個別記事URLを取得できる
- robots.txt、利用規約、アクセス制限に反しない方法で取得できる
- 一定期間継続して監視する価値がある
- 他社ニュースメディア、まとめサイト、リーク情報サイトではない

RSS／Atomがある場合は最優先で使用する。次に公式サイトマップ、静的HTML一覧、公開APIの順で検討する。ブラウザ実行が必要なJavaScript依存ページは初期対象から外すか、公開されている内部APIを調査してから追加する。

## 3. 優先度の定義

| 優先度 | 意味 |
| --- | --- |
| P0 | ローカルMVPで最初に実装・検証する |
| P1 | P0安定後に追加する有力情報源 |
| P2 | 個別アダプター、API調査、ノイズ対策が必要 |
| P3 | 費用、認証、運用負荷を確認して将来検討する |

取得方式の確度は次のように表す。

| 確度 | 意味 |
| --- | --- |
| 確認済み | 公式一覧またはフィードURLと現在の応答形式を確認済み |
| 要PoC | 公式一覧は確認済みだが、ローカルバッチからの抽出テストが必要 |
| 要調査 | API、認証、ページ構造など追加調査が必要 |

## 4. 初期導入候補一覧

| ID | 情報源 | 優先度 | 取得方式 | 確度 | 主対象 |
| --- | --- | --- | --- | --- | --- |
| `playstation-blog-jp` | PlayStation.Blog 日本語 | P0 | RSS | 確認済み | PlayStation、新作、アップデート |
| `xbox-wire-jp` | Xbox Wire Japan | P0 | RSS | 確認済み | Xbox、PC、Game Pass |
| `capcom-product-news` | カプコン プレスリリース | P0 | RSS | 確認済み | カプコン新作、発売、販売実績、eスポーツ |
| `nintendo-topics` | Nintendo トピックス | P0 | HTML一覧 | 要PoC | Switch、Switch 2、任天堂タイトル |
| `sega-game-topics` | セガ ゲームトピックス | P0 | HTML一覧 | 要PoC | セガ／アトラス販売タイトル、PC、家庭用、モバイル |
| `konami-games-news` | KONAMI ゲーム企業ニュース | P0 | HTML一覧 | 要PoC | KONAMI新作、発売、eスポーツ |
| `fromsoftware-press` | フロム・ソフトウェア Press Release | P0 | HTML一覧 | 要PoC | フロム・ソフトウェア作品 |
| `koeitecmo-product-news` | コーエーテクモ ニュース | P1 | HTML一覧＋PDF | 要PoC | 商品・IP、発売、販売実績 |
| `level5-news` | レベルファイブ お知らせ | P1 | HTML一覧 | 要PoC | レベルファイブ作品、モバイル |
| `square-enix-topics` | スクウェア・エニックス トピックス | P1 | HTML一覧 | 要PoC | スクエニ作品、モバイル、PC、家庭用 |
| `atlus-news` | アトラス公式ニュース | P1 | HTML一覧 | 要PoC | アトラス作品 |
| `bandainamco-news` | バンダイナムコエンターテインメント 新着情報 | P2 | JavaScript/API調査 | 要調査 | 家庭用、モバイル、eスポーツ |
| `ubisoft-news-jp` | Ubisoft公式ニュース | P2 | HTML/API調査 | 要調査 | Ubisoft作品、アップデート、eスポーツ |
| `ea-news-jp` | EA公式ニュース | P2 | HTML/API調査 | 要調査 | EA作品、Apex、スポーツ、モバイル |

## 5. P0情報源

### 5.1 PlayStation.Blog 日本語

- ID: `playstation-blog-jp`
- 公式ページ: <https://blog.ja.playstation.com/>
- RSS: <https://blog.ja.playstation.com/feed/>
- 発行元: ソニー・インタラクティブエンタテインメント
- 取得方式: RSS 2.0
- 既定カテゴリ: `PlayStation`
- 言語: 日本語
- 優先度: P0
- 想定アクセス頻度: 6時間ごと

#### 採用理由

- 日本語の公式PlayStation情報をまとめて取得できる
- 新作、発売、アップデート、PlayStation Plus、周辺サービスを広くカバーする
- RSSが提供され、差分取得を安定して実装しやすい

#### フィルター

加点候補:

- `発表`、`発売日`、`配信`、`新作`、`トレーラー`
- `アップデート`、`DLC`、`オープンベータ`
- `PlayStation Plus` の新規ラインナップ

減点または除外候補:

- 試遊レビュー、インタビューだけの記事
- 月間ダウンロードランキング
- セール情報だけの記事
- 既発表作品の一般的な攻略・紹介記事

#### 注意

PlayStation.BlogにはSIE自身の発表だけでなく、サードパーティー寄稿、特集、レビューも含まれる。すべてを同じ信頼度・ニュース価値として扱わず、著者と記事種別を保存する。

### 5.2 Xbox Wire Japan

- ID: `xbox-wire-jp`
- 公式ページ: <https://news.xbox.com/ja-jp/>
- RSS: <https://news.xbox.com/ja-jp/feed/>
- 発行元: Microsoft／Xbox
- 取得方式: RSS 2.0
- 既定カテゴリ: `Xbox`, `PC`
- 言語: 日本語
- 優先度: P0
- 想定アクセス頻度: 6時間ごと

#### 採用理由

- Xbox、PC、Game Passの公式発表を取得できる
- 海外発表の日本語版が掲載される
- RSSを使用できる

#### フィルター

加点候補:

- 新作発表、発売日、Game Pass追加
- Xbox／PC版の追加
- 大型ショーケースの発表まとめ

減点候補:

- 海外版公開から時間が経過した翻訳記事
- 日本国内で利用できるか不明なサービス・価格情報
- 一般的な開発者インタビュー

#### 注意

記事内に「米国時間」「英語記事を基にした」旨が記載される場合がある。原発表日時と日本語版公開日時を分けて保持し、同じ発表の英語版と日本語版を重複候補として関連付ける。

### 5.3 カプコン プレスリリース

- ID: `capcom-product-news`
- 公式一覧: <https://www.capcom.co.jp/ir/category/news/ir>
- RSS: <https://www.capcom.co.jp/ir/news/feed>
- 発行元: 株式会社カプコン
- 取得方式: RSS 2.0
- 既定カテゴリ: `業界ニュース`
- 言語: 日本語
- 優先度: P0
- 想定アクセス頻度: 6時間ごと

#### 採用理由

- 新作発表、発売日、販売本数、eスポーツなど記事価値の高い発表が多い
- 企業公式のプレスリリースで事実関係が明確
- RSSが公式一覧から案内されている

#### フィルター

採用対象:

- ページ上の分類が `製品・サービス`
- ゲーム関連のeスポーツ発表
- 新規IP、発売日、販売本数、大型展開

原則除外:

- `決算・業績`
- `企業・人事`
- ゲームとの関連が薄いサステナビリティ情報

#### 注意

RSSにIR・人事なども含まれる可能性があるため、カテゴリまたは個別記事メタデータでフィルターする。販売本数発表は記事候補になるが、発売・アップデート情報より初期点を低くする。

### 5.4 Nintendo トピックス

- ID: `nintendo-topics`
- 公式一覧: <https://www.nintendo.com/jp/topics/>
- 発行元: 任天堂株式会社
- 取得方式: 静的HTML一覧アダプター
- 既定カテゴリ: `Switch`
- 言語: 日本語
- 優先度: P0
- 想定アクセス頻度: 6時間ごと

#### 採用理由

- Nintendo Switch／Switch 2の国内公式発表を広くカバーする
- 新作、Direct、発売日、アップデート、Nintendo Switch Online情報を取得できる
- 一覧にタイトル、日付、個別記事リンクが表示される

#### フィルター

加点候補:

- `発売`、`配信`、`Direct`、`アップデート`
- 新ハード、サービス変更、新作ソフト

減点または除外候補:

- 毎週のニンテンドーeショップ新作一覧
- セールだけの記事
- グッズ、イベント、カラオケ無料開放
- `Hello! インディー`など紹介記事は、新規発表を含む場合だけ候補化

#### 注意

トップページには注目記事、最新記事、ランキングなど同じ記事が複数箇所に現れる可能性がある。DOM位置ではなくcanonical URLで重複排除する。公式サイトマップの利用可否もPoC時に確認する。

### 5.5 セガ ゲームトピックス

- ID: `sega-game-topics`
- 公式一覧: <https://www.sega.jp/game/topics/?code=1-12->
- 全トピックス: <https://www.sega.jp/topics/>
- 個別記事URL形式: `https://www.sega.jp/topics/detail/YYMMDD_N/`
- 発行元: 株式会社セガ
- 取得方式: HTML一覧アダプター。サイトマップ利用可否も検証する
- 既定カテゴリ: 記事タグから `PC`, `PlayStation`, `Switch`, `Xbox`, `モバイル`, `eスポーツ` へ変換
- 言語: 日本語
- 優先度: P0
- 想定アクセス頻度: 6時間ごと

#### 採用理由

- 現サイトで既にセガ公式発表を記事の根拠として使用している
- PC、家庭用、モバイル、eスポーツを横断して取得できる
- 一覧に日付、タイトル、タグがある

#### フィルター

優先タグ:

- `PCゲーム`
- `家庭用ゲーム`
- `スマホゲーム`
- `お知らせ`のうちゲーム内容に関係するもの

原則除外タグ・語句:

- `物販`、`トイ`、`プライズ`
- 小規模な店舗コラボ
- セールだけの記事
- 定例ガチャ・定例イベント

#### 注意

セガ配信タイトルだけでなく他社開発・海外作品の国内向け発表も含む。元開発会社の発表と重複する可能性があるため、ゲーム名、発売日、トレーラーIDを使った類似判定が重要となる。

### 5.6 KONAMI ゲーム企業ニュース

- ID: `konami-games-news`
- 公式一覧: <https://www.konami.com/games/corporate/ja/news/>
- 個別記事URL形式: `https://www.konami.com/games/corporate/ja/news/{release|topics}/YYYYMMDD/`
- 発行元: 株式会社コナミデジタルエンタテインメント
- 取得方式: HTML一覧アダプター。サイトマップ利用可否も検証する
- 既定カテゴリ: 記事内容から判定
- 言語: 日本語
- 優先度: P0
- 想定アクセス頻度: 6時間ごと

#### 採用理由

- 新作、発売日、サービス開始、eスポーツを企業公式発表として取得できる
- 個別記事に日付、製品情報、対応機種、公式サイトURLが含まれることが多い

#### フィルター

加点候補:

- `発売決定`、`配信開始`、`サービス開始`
- 新作、追加機種、大型大会

減点または除外候補:

- 定例ゲーム内キャンペーン
- 小規模なライセンス・グッズ情報
- タイトルと関係の薄い企業情報

#### 注意

個別記事URLに `release` と `topics` があるため、両方を対象にする。URL構造だけでニュース価値を決めない。

### 5.7 フロム・ソフトウェア Press Release

- ID: `fromsoftware-press`
- 公式一覧: <https://www.fromsoftware.jp/ww/pressrelease.html>
- 発行元: 株式会社フロム・ソフトウェア
- 取得方式: HTML一覧アダプター
- 既定カテゴリ: `PC`, `PlayStation`, `Xbox`, `Switch`から記事ごとに判定
- 言語: 英語中心
- 優先度: P0
- 想定アクセス頻度: 12時間ごと

#### 採用理由

- 同社タイトルの発売、DLC、販売本数を一次情報として取得できる
- 更新頻度は高くないが、1件あたりの記事価値が高い
- 一覧構造が比較的単純

#### フィルター

加点候補:

- 新作、発売日、DLC、対応機種、発売延期

減点候補:

- 販売本数のみの発表
- ゲーム内容に直接関係しない企業情報

#### 注意

英語発表であっても日本企業の一次情報として扱えるが、記事化時には日本国内の発売日・対応機種を別の公式情報でも確認する。

## 6. P1情報源

### 6.1 コーエーテクモ ニュース

- ID: `koeitecmo-product-news`
- 公式一覧: <https://www.koeitecmo.co.jp/news/>
- 発行元: 株式会社コーエーテクモホールディングス
- 取得方式: HTML一覧＋リンク先PDF
- 対象分類: `商品・IP`
- 優先度: P1

一覧にはIR、人事、企業情報も混在するため、`商品・IP`だけを基本対象とする。発表本文がPDFの場合は、一覧タイトルと日付で一次候補を作り、記事化候補に選ばれたものだけPDF本文を抽出する。全PDFを毎回解析しない。

### 6.2 レベルファイブ お知らせ

- ID: `level5-news`
- 公式サイト: <https://www.level5.co.jp/news/>
- 個別記事URL形式: `https://www.level5.co.jp/news/YYYYMMDD[_NN]/`
- 発行元: 株式会社レベルファイブ
- 取得方式: HTML一覧アダプター
- 優先度: P1

新作、発売、サービス開始は採用対象とする。ゲーム内の定例イベント、ガチャ、キャンペーンは原則として減点する。日本語版と英語版の同一記事が存在する場合は日本語版を主候補とする。

### 6.3 スクウェア・エニックス トピックス

- ID: `square-enix-topics`
- 公式一覧: <https://www.jp.square-enix.com/topics/>
- 製品一覧補助: <https://www.jp.square-enix.com/game/>
- 発行元: 株式会社スクウェア・エニックス
- 取得方式: HTML一覧アダプター
- 優先度: P1

ゲーム以外に出版、音楽、グッズ、イベント、e-STORE情報が大量に含まれるため、ゲームカテゴリとゲームタイトルのリンクを持つ記事を優先する。`e-STORE`、漫画、商品、月間カレンダーだけの記事は原則除外する。

製品一覧はニュース取得元ではなく、正式タイトル、発売日、対応機種を照合する補助情報源として利用する。

### 6.4 アトラス公式ニュース

- ID: `atlus-news`
- 公式一覧: <https://www.atlus.co.jp/news/>
- 発行元: 株式会社アトラス
- 取得方式: HTML一覧アダプター
- 優先度: P1

カテゴリが `ゲーム情報` の記事を中心に取得する。セール、メンテナンス、既知不具合、小規模キャンペーンは減点する。セガのトピックスと同一発表が掲載される可能性があるため、公式動画ID、ゲーム名、発表日時で類似判定する。

## 7. P2情報源

### 7.1 バンダイナムコエンターテインメント 新着情報

- ID: `bandainamco-news`
- 公式一覧: <https://www.bandainamcoent.co.jp/search/news/>
- 発行元: 株式会社バンダイナムコエンターテインメント
- 優先度: P2

一覧はJavaScriptテンプレートとして配信され、初期HTMLだけでは記事データを取得できない。ブラウザ自動操作を導入する前に、ページが使用している公開HTTP API、利用条件、レート制限を調査する。安定した取得方法が確認できるまで有効化しない。

### 7.2 Ubisoft公式ニュース

- ID: `ubisoft-news-jp`
- 公式一覧: <https://www.ubisoft.com/ja-jp/news>
- 発行元: Ubisoft
- 優先度: P2

日本語ページにも英語記事、パッチノート、Twitch Drops、週次更新、物販などが大量に含まれる。新作発表、発売日、大型アップデート、日本語発表に絞るフィルターと、ページが使用するAPIの調査が必要となる。

### 7.3 EA公式ニュース

- ID: `ea-news-jp`
- 公式一覧: <https://www.ea.com/ja-jp/news>
- 発行元: Electronic Arts
- 優先度: P2

新作、シーズン、大型アップデートは有力候補になる。一方、企業ストーリー、スポーツ関連企画、開発者紹介も含まれるため、ゲーム名とニュース価値キーワードによるフィルターが必要となる。

## 8. P3情報源

### 8.1 公式YouTubeチャンネル

- 取得候補: YouTubeチャンネルフィードまたはYouTube Data API
- フィード形式: `https://www.youtube.com/feeds/videos.xml?channel_id={CHANNEL_ID}`
- 優先度: P3

対象チャンネルは公式サイトからリンクされていることを確認して許可リストへ登録する。チャンネル表示名や検索結果だけで公式判定しない。

初期候補:

- Nintendo公式チャンネル
- PlayStation Japan
- Xbox Japan
- セガ公式チャンネル
- カプコン公式チャンネル
- スクウェア・エニックス
- バンダイナムコエンターテインメント
- KONAMI公式
- アトラス公式
- フロム・ソフトウェア

チャンネルIDは実装前の個別監査で確定する。キーワード横断検索はクォータ消費と誤検出が増えるため使用しない。タイトル、公開日時、動画IDだけで候補化し、説明欄本文の保存量を制限する。

### 8.2 X公式アカウント

- 取得候補: X API Recent Searchまたはユーザー投稿取得
- 優先度: P3

Xは速報性が高い一方、認証、料金、レート制限、仕様変更の影響を受ける。RSS／公式サイト／YouTubeで不足する情報が明確になった時点で導入を判断する。

公式アカウントの判定は、公式サイトからのリンクまたは公式発表で確認する。検索結果や認証バッジだけに依存しない。

## 9. 初期設定案

ローカルMVPでは、まず次の7情報源を有効化する。

```json
{
  "schemaVersion": 1,
  "sources": [
    {
      "id": "playstation-blog-jp",
      "name": "PlayStation.Blog 日本語",
      "publisher": "Sony Interactive Entertainment",
      "type": "rss",
      "url": "https://blog.ja.playstation.com/feed/",
      "enabled": true,
      "official": true,
      "locale": "ja-JP",
      "defaultCategories": ["PlayStation"],
      "timeoutMs": 15000,
      "requestIntervalMs": 1000
    },
    {
      "id": "xbox-wire-jp",
      "name": "Xbox Wire Japan",
      "publisher": "Microsoft",
      "type": "rss",
      "url": "https://news.xbox.com/ja-jp/feed/",
      "enabled": true,
      "official": true,
      "locale": "ja-JP",
      "defaultCategories": ["Xbox", "PC"],
      "timeoutMs": 15000,
      "requestIntervalMs": 1000
    },
    {
      "id": "capcom-product-news",
      "name": "カプコン プレスリリース",
      "publisher": "CAPCOM",
      "type": "rss",
      "url": "https://www.capcom.co.jp/ir/news/feed",
      "enabled": true,
      "official": true,
      "locale": "ja-JP",
      "defaultCategories": ["業界ニュース"],
      "timeoutMs": 15000,
      "requestIntervalMs": 1000
    },
    {
      "id": "nintendo-topics",
      "name": "Nintendo トピックス",
      "publisher": "Nintendo",
      "type": "html-nintendo-topics",
      "url": "https://www.nintendo.com/jp/topics/",
      "enabled": true,
      "official": true,
      "locale": "ja-JP",
      "defaultCategories": ["Switch"],
      "timeoutMs": 15000,
      "requestIntervalMs": 1500
    },
    {
      "id": "sega-game-topics",
      "name": "セガ ゲームトピックス",
      "publisher": "SEGA",
      "type": "html-sega-topics",
      "url": "https://www.sega.jp/game/topics/?code=1-12-",
      "enabled": true,
      "official": true,
      "locale": "ja-JP",
      "defaultCategories": [],
      "timeoutMs": 15000,
      "requestIntervalMs": 1500
    },
    {
      "id": "konami-games-news",
      "name": "KONAMI ゲーム企業ニュース",
      "publisher": "Konami Digital Entertainment",
      "type": "html-konami-news",
      "url": "https://www.konami.com/games/corporate/ja/news/",
      "enabled": true,
      "official": true,
      "locale": "ja-JP",
      "defaultCategories": [],
      "timeoutMs": 15000,
      "requestIntervalMs": 1500
    },
    {
      "id": "fromsoftware-press",
      "name": "FromSoftware Press Release",
      "publisher": "FromSoftware",
      "type": "html-fromsoftware-press",
      "url": "https://www.fromsoftware.jp/ww/pressrelease.html",
      "enabled": true,
      "official": true,
      "locale": "en",
      "defaultCategories": [],
      "timeoutMs": 15000,
      "requestIntervalMs": 1500
    }
  ]
}
```

このJSONは設定案であり、実装前の疎通PoCと利用条件確認を通過した情報源だけを実際の `sources.json` で有効にする。

## 10. 情報源固有ルール

情報源ごとの除外語を共通ルールへ混在させず、設定またはアダプターで管理する。

```json
{
  "sourceId": "sega-game-topics",
  "excludeKeywords": [
    "セール開催中",
    "コラボグッズ",
    "ラッキーくじ",
    "プライズ"
  ],
  "preferredLabels": [
    "PCゲーム",
    "家庭用ゲーム",
    "スマホゲーム"
  ]
}
```

除外語に一致しただけで完全削除せず、初期運用中は低スコア候補として記録する。誤除外がないことを確認してから自動除外へ変更する。

## 11. URLと情報源の監査

### 実装時監査

各情報源を有効化する前に次を確認する。

1. URLが公式ドメインである
2. HTTPSで正常応答する
3. RSS／XML／HTMLの形式が想定どおりである
4. 最新10件からタイトル、日付、個別URLを抽出できる
5. 同じ入力を2回処理して重複しない
6. robots.txtとサイト利用条件を確認する
7. 取得間隔とUser-Agentを設定する
8. 一覧から過去ページへの導線を確認する
9. canonical URLを取得できる
10. 画像を自動転載しないことを確認する

### 定期監査

月1回または連続失敗3回の時点で次を確認する。

- フィードURLの変更
- HTTPステータスとContent-Type
- DOM／XML構造変更
- 最新記事が取得できているか
- 更新件数が不自然に0件または急増していないか
- 利用規約やAPI条件の変更
- 情報源ごとの採用率

## 12. 導入順序

### Step 1: RSSのみ

1. PlayStation.Blog 日本語
2. Xbox Wire Japan
3. カプコン プレスリリース

RSS共通コレクター、重複判定、スコアリング、レポート出力を完成させる。

### Step 2: 国内公式HTML

4. Nintendo トピックス
5. セガ ゲームトピックス
6. KONAMI ゲーム企業ニュース
7. フロム・ソフトウェア Press Release

共通HTML抽出へ過度に一般化せず、情報源別アダプターとして実装する。

### Step 3: 対象拡張

8. コーエーテクモ
9. レベルファイブ
10. スクウェア・エニックス
11. アトラス

Step 1・2の採用率と取得漏れを確認した後に追加する。

### Step 4: API・高ノイズ媒体

12. バンダイナムコエンターテインメント
13. Ubisoft
14. EA
15. 公式YouTube
16. 必要であればX API

## 13. 完了条件

情報源カタログからMVP実装へ進む条件は次のとおりとする。

- P0の7情報源について公式性を確認済み
- RSS 3件のローカル疎通・解析PoCが成功
- HTML 4件から最新10件を抽出できる
- 各情報源の除外ルールが設定化されている
- 取得頻度とタイムアウトが確定している
- robots.txtと利用条件の確認記録がある
- 取得結果に画像転載を含めない
- 既存記事とのURL重複判定ができる

P0の一部が利用条件または技術上の理由で取得できない場合は、その情報源だけを無効化し、他の情報源のMVP実装を妨げない。
