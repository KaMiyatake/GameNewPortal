# GameNewPortal

ゲームニュースサイト「ゲーム賛否」のリポジトリです。実運用のサイトは `frontend` の Next.js アプリで、記事・画像をリポジトリ内で管理します。

## 構成

- `frontend/` — Next.js 15（Pages Router が中心）の公開サイト
- `frontend/src/data/articles/` — 年月ごとの記事データ（TypeScript）
- `frontend/public/images/articles/` — 記事画像
- `frontend/scripts/` — 人気記事更新、記事補助、分析用スクリプト
- `backend/` — Express / Prisma の別バックエンド。現行のフロント記事表示は依存していません。

## 開発を始める

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm dev
```

ブラウザで <http://localhost:3000> を開きます。詳しい環境変数・コマンドは [frontend/README.md](frontend/README.md) を参照してください。

## 記事の追加

記事は CMS ではなく、TypeScript の記事データと `public` 配下の画像で管理します。追加手順と権利上の注意点は [docs/article-publishing.md](docs/article-publishing.md) にまとめています。

## デプロイ

`main` ブランチへの push が Vercel の本番デプロイを開始します。push 前に `frontend` で `pnpm build` を実行し、成功することを確認してください。
