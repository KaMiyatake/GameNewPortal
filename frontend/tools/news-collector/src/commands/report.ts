import { loadCandidates, loadLastRun, writeReport } from '../repositories/storage';
import { renderMarkdownReport } from '../reporting/markdown';

export function reportCommand(top = 10, cwd = process.cwd()): string {
  const generatedAt = new Date();
  const report = renderMarkdownReport(loadCandidates(cwd), loadLastRun(cwd)?.sourceResults ?? [], generatedAt, top);
  const reportPath = writeReport(report, generatedAt, cwd);
  process.stdout.write(`${report}\n\n保存先: ${reportPath}\n`);
  return reportPath;
}
