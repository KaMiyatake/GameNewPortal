#!/usr/bin/env node
import { collectCommand } from './commands/collect';
import { decideCommand } from './commands/decide';
import { reportCommand } from './commands/report';
import { statusCommand } from './commands/status';

function option(args: string[], name: string): string | undefined {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : undefined;
}

function usage(): never {
  console.error(`Usage:
  pnpm news:collect -- [--dry-run] [--source ID] [--since ISO_DATE] [--limit N]
  pnpm news:report -- [--top N]
  pnpm news:status
  pnpm news:decide -- CANDIDATE_ID STATUS --note "reason"`);
  process.exit(1);
}

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);
  if (command === 'collect') {
    const limit = Number(option(args, '--limit') ?? 10);
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) throw new Error('--limit must be an integer between 1 and 100');
    const since = option(args, '--since');
    if (since && Number.isNaN(new Date(since).getTime())) throw new Error('--since must be a valid date');
    const summary = await collectCommand({ dryRun: args.includes('--dry-run'), sourceId: option(args, '--source'), since, limit });
    const failures = summary.sourceResults.filter(result => result.status === 'failed').length;
    if (failures === summary.sourceResults.length) process.exitCode = 1;
    else if (failures) process.exitCode = 2;
    return;
  }
  if (command === 'report') {
    const top = Number(option(args, '--top') ?? 10);
    if (!Number.isInteger(top) || top < 1 || top > 100) throw new Error('--top must be an integer between 1 and 100');
    reportCommand(top);
    return;
  }
  if (command === 'status') { statusCommand(); return; }
  if (command === 'decide') {
    const [candidateId, status] = args;
    if (!candidateId || !status) usage();
    decideCommand(candidateId, status, option(args, '--note') ?? '');
    return;
  }
  usage();
}

main().catch(error => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
