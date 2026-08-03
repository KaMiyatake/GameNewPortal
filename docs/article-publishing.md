# 記事追加メモ

## 基本方針

記事はリポジトリ内の TypeScript データとして管理します。公開前に、本文の根拠となる一次情報と画像の利用条件を確認してください。

- 情報源は公式サイト、公式プレスリリース、公式 X、公式 YouTube を優先する。
- 画像は、利用許諾が明確な公式プレス素材だけを使う。他メディアや画像検索結果の転載はしない。
- 公式画像を使えない場合は、公式投稿・動画を埋め込むか、作品固有のロゴ・キャラクターを含まないオリジナルのイメージ画像を用意する。
- オリジナルのイメージ画像を使うときは、本文中に公式スクリーンショットではないことを記載する。

## 事前に集める情報

- 正式タイトル、発表日、発売日・配信日、対応プラットフォーム、価格、ジャンル
- 公式発表ページと、必要に応じて公式 X / YouTube の URL
- 記事タイトル、要約、カテゴリ、タグ、本文、著者名
- メイン画像と本文画像の出典・利用条件
- 関連記事候補（任意）

## 追加手順

以下では、2026年8月3日公開・スラッグ `26080301-example-news` を例にします。

1. ID とスラッグを決める

   - 形式は `YYMMDDNN`。同日に複数記事を出す場合は末尾の連番を増やします。
   - ID: `26080301`
   - slug: `26080301-example-news`

2. 記事データを作成する

   - `frontend/src/data/articles/2026/08/26080301-example-news.ts` を作成します。
   - 直近の記事を雛形にし、`ArticleDetail` の必須項目をすべて設定します。
   - `categories` は配列です。`PlayStation`、`Switch`、`PC`、`モバイル`、`Xbox`、`ゲーム賛否`、`VR`、`エンタメ`、`業界ニュース`、`eスポーツ` の既存名称をそのまま使います。
   - 本文は HTML 文字列です。公式リンク、YouTube、X 埋め込みに対応しています。

3. 画像を配置する

   - メイン画像は `frontend/public/images/articles/2026/08/26080301-example-news/main.jpg` に置きます。
   - 本文画像も同じディレクトリに置き、`getArticleImagePath()` で参照します。
   - `imageUrl` は `getArticleImagePath('2026', '08', '26080301-example-news', 'main.jpg')` とします。

4. 月別インデックスへ登録する

   - `frontend/src/data/articles/2026/08/index.ts` で記事を import し、`articles202608` 配列へ追加します。
   - 新しい年月なら、月別ディレクトリと `index.ts` を新規作成します。

5. 全記事レジストリへ登録する

   - `frontend/src/data/articles/index.ts` に月別配列を import します。
   - `allArticles` の配列へ展開します。ここに登録しない記事は、一覧・詳細・検索・サイトマップに出ません。

6. 人気記事を更新する

   ```bash
   cd frontend
   pnpm update-popular
   ```

   `scripts/updatePopularArticles.js` は年・月ディレクトリを自動走査します。生成された `src/data/popularArticles.json` の差分を確認し、意図した変更ならコミットに含めます。

7. ローカルで確認する

   ```bash
   pnpm dev
   # または公開前の完全確認
   pnpm build
   ```

   次を確認します。

   - `/news/<slug>` が表示される
   - トップページの最新記事、カテゴリ、タグ、検索、関連記事に出る
   - 画像・X・YouTube 埋め込みが表示される
   - 本番ビルドが成功する

8. コミットとデプロイを確認する

   - 記事データ、画像、インデックス、必要に応じて `popularArticles.json` をコミットします。
   - `main` に push すると Vercel の本番デプロイが開始されます。
   - Vercel の Deployments で対象コミットの Status が `Ready` になったことを確認します。

## よくある注意点

- `scripts/create-article.js` は現行の `categories: string[]` 形式や、新しい年月のインデックス作成に追随していません。既存記事を雛形にして手動で追加してください。
- `pnpm build` / `pnpm dev` は人気記事データを更新します。記事以外の作業では、生成差分を不用意にコミットしないようにします。
- Next.js のセキュリティ更新は `frontend/package.json` と `frontend/pnpm-lock.yaml` を同時に更新し、必ず `pnpm build` で検証します。
