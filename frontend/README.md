# Frontend

「ゲーム賛否」の Next.js フロントエンドです。Next.js 15.5.21 と React 19 を使用し、ページの大半は Pages Router（`src/pages/`）で実装されています。

## 必要環境

- Node.js 20 以降
- pnpm 10 以降

依存関係は `pnpm-lock.yaml` で固定しているため、pnpm の利用を推奨します。

## ローカル開発

```bash
pnpm install --frozen-lockfile
pnpm dev
```

`http://localhost:3000` で確認できます。`dev` は起動前に人気記事データを更新します。

## コマンド

| コマンド | 内容 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動（Turbopack） |
| `pnpm build` | 人気記事を更新して本番ビルド |
| `pnpm start` | ビルド済みアプリを起動 |
| `pnpm update-popular` | `src/data/popularArticles.json` を再計算 |
| `pnpm x-helper` | X 投稿用の補助スクリプトを実行 |

`build` と `dev` は `popularArticles.json` を更新します。意図しない差分が生じた場合は、コミット対象かどうかを確認してください。

## 環境変数

通常の表示・ビルドには環境変数は必須ではありません。問い合わせメールをローカルで動かす場合は、`.env.local` に以下を設定します。値はコミットしないでください。

```dotenv
NEXT_PUBLIC_BASE_URL=http://localhost:3000
SMTP_HOST=
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
SMTP_FROM_EMAIL=
```

## 記事データ

記事は `src/data/articles/<YYYY>/<MM>/` に TypeScript として保存します。画像は `public/images/articles/<YYYY>/<MM>/<slug>/` に置きます。詳しい手順はリポジトリルートの [記事追加ガイド](../docs/article-publishing.md) を参照してください。

## デプロイ

Vercel は GitHub の `main` ブランチを本番環境としてデプロイします。push 前に `pnpm build` を成功させ、Vercel のデプロイ画面で対象コミットが `Ready` になったことを確認してください。
