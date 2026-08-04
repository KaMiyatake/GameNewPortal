# News Collector

公式ゲーム情報を収集し、ルールベースで採点した記事候補レポートを生成するローカルCLIです。記事の作成、コミット、pushは行いません。

## コマンド

```bash
pnpm news:collect
pnpm news:collect -- --dry-run
pnpm news:collect -- --source playstation-blog-jp
pnpm news:report -- --top 10
pnpm news:status
pnpm news:decide -- <candidate-id> accepted --note "記事化を承認"
pnpm news:test
```

実行状態とレポートは `frontend/.news-collector/` に保存され、Git管理されません。情報源は `config/sources.json`、採点ルールは `config/scoring.json` で管理します。

候補レポートは全候補の判断用一覧を先頭に表示し、その後にスコア上位候補の詳細を表示します。`--top` と `--limit` は詳細表示件数であり、一覧件数を制限しません。

取得先と選定理由は `../../../docs/news-source-catalog.md`、全体設計は `../../../docs/news-collection-batch-design.md` を参照してください。
