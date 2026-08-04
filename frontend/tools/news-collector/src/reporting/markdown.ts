import type { NewsCandidate, RunSourceResult } from '../types';

function escapeTable(value: string): string {
  return value.replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function formatDate(value?: string): string {
  if (!value) return '不明';
  return new Intl.DateTimeFormat('ja-JP', { timeZone: 'Asia/Tokyo', dateStyle: 'medium', timeStyle: 'short' }).format(new Date(value));
}

function shortOverview(candidate: NewsCandidate): string {
  const source = candidate.summary?.replace(/The post .*? appeared first on .*?\.?$/i, '').trim();
  if (!source || source.length < 8) return candidate.title;
  const firstSentence = source.match(/^.*?[。.!！?？](?:\s|$)/)?.[0]?.trim() || source;
  return firstSentence.length > 120 ? `${firstSentence.slice(0, 117)}...` : firstSentence;
}

export function renderMarkdownReport(
  candidates: NewsCandidate[],
  sourceResults: RunSourceResult[],
  generatedAt = new Date(),
  limit = 10,
): string {
  const reviewable = candidates
    .filter(candidate => !candidate.duplicate.exact && ['new', 'reviewing', 'held'].includes(candidate.status))
    .sort((a, b) => b.score - a.score || (b.announcedAt ?? '').localeCompare(a.announcedAt ?? ''));
  const detailed = reviewable.slice(0, limit);
  const succeeded = sourceResults.filter(result => result.status !== 'failed').length;
  const failed = sourceResults.filter(result => result.status === 'failed');
  const lines = [
    '# ゲーム最新情報 記事候補レポート', '',
    `- 生成日時: ${formatDate(generatedAt.toISOString())}`,
    `- 情報源: ${succeeded}件成功 / ${failed.length}件失敗`,
    `- 未処理候補: ${candidates.filter(item => item.status === 'new' && !item.duplicate.exact).length}件`,
    `- 一覧表示: ${reviewable.length}件`,
    `- 詳細表示: 上位${detailed.length}件`, '',
  ];

  if (failed.length) {
    lines.push('## 取得警告', '');
    for (const result of failed) lines.push(`- ${result.sourceId}: ${result.error ?? '取得失敗'}`);
    lines.push('');
  }

  if (!reviewable.length) {
    lines.push('新規のレビュー対象候補はありません。', '');
    return lines.join('\n');
  }

  lines.push(
    '## 判断用候補一覧', '',
    'ゲームタイトルと概要を見て候補を選択するための一覧です。候補名のリンクは公式発表を開きます。', '',
    '| 順位 | スコア | ゲームタイトル | 大まかな記事概要 | 発表元 | 発表日時 |',
    '| ---: | ---: | --- | --- | --- | --- |',
  );
  reviewable.forEach((candidate, index) => {
    const gameTitle = candidate.gameTitles.join(' / ') || '要確認';
    lines.push(`| ${index + 1} | ${candidate.score} | ${escapeTable(gameTitle)} | [${escapeTable(shortOverview(candidate))}](${candidate.canonicalUrl}) | ${escapeTable(candidate.publisher)} | ${formatDate(candidate.announcedAt)} |`);
  });
  lines.push('');

  lines.push(`## 上位${detailed.length}件の詳細`, '', '詳細数は `pnpm news:report -- --top <件数>` で変更できます。', '');
  detailed.forEach((candidate, index) => {
    lines.push(`## ${index + 1}. ${candidate.title}`, '',
      `- 候補ID: \`${candidate.candidateId}\``,
      `- スコア: **${candidate.score}**`,
      `- 発表元: ${candidate.publisher}（${candidate.sourceId}）`,
      `- 発表日時: ${formatDate(candidate.announcedAt)}`,
      `- 公式URL: <${candidate.canonicalUrl}>`,
      `- 推奨カテゴリ: ${candidate.suggestedCategories.join(', ') || '要確認'}`,
      `- 推定プラットフォーム: ${candidate.platforms.join(', ') || '要確認'}`,
      `- 画像: 利用条件未確認`, '');
    if (candidate.summary) lines.push(`### 機械抽出要約`, '', candidate.summary.slice(0, 600), '');
    lines.push('### スコア内訳', '');
    for (const reason of candidate.scoreBreakdown) lines.push(`- ${reason.score >= 0 ? '+' : ''}${reason.score}: ${reason.label}${reason.detail ? `（${reason.detail}）` : ''}`);
    lines.push('', '### レビュー時の確認事項', '');
    if (candidate.duplicate.similarCandidateIds.length) lines.push(`- 類似候補: ${candidate.duplicate.similarCandidateIds.join(', ')}`);
    for (const warning of candidate.warnings) lines.push(`- ${warning}`);
    lines.push('- 公式ページで発表内容と発表日時を再確認する', '- 既存記事との続報関係を確認する', '- 公式画像または埋め込みの利用条件を確認する', '');
  });
  return lines.join('\n');
}
