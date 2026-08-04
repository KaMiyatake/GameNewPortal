import { loadCandidates, loadLastRun, loadState } from '../repositories/storage';

export function statusCommand(cwd = process.cwd()): void {
  const state = loadState(cwd);
  const candidates = loadCandidates(cwd);
  const lastRun = loadLastRun(cwd);
  console.log('ゲーム最新情報収集バッチ');
  console.log(`未レビュー: ${candidates.filter(item => item.status === 'new' && !item.duplicate.exact).length}件`);
  console.log(`採用: ${candidates.filter(item => item.status === 'accepted').length}件 / 保留: ${candidates.filter(item => item.status === 'held').length}件`);
  console.log(`最終実行: ${lastRun?.finishedAt ?? '未実行'}`);
  for (const [sourceId, source] of Object.entries(state.sources)) {
    console.log(`- ${sourceId}: 最終成功=${source.lastSuccessAt ?? 'なし'} 連続失敗=${source.consecutiveFailures}${source.lastError ? ` エラー=${source.lastError}` : ''}`);
  }
}
