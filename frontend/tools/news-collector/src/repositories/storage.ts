import fs from 'node:fs';
import path from 'node:path';
import { getDataRoot } from '../config';
import type { CollectorState, DecisionEvent, NewsCandidate, RunSummary } from '../types';

const EMPTY_STATE: CollectorState = { schemaVersion: 1, sources: {} };

function ensureDirectory(directory: string): void { fs.mkdirSync(directory, { recursive: true }); }

function readJson<T>(filePath: string, fallback: T): T {
  if (!fs.existsSync(filePath)) return fallback;
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as T;
}

function writeJsonAtomic(filePath: string, value: unknown): void {
  ensureDirectory(path.dirname(filePath));
  const temporary = `${filePath}.${process.pid}.tmp`;
  fs.writeFileSync(temporary, `${JSON.stringify(value, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 });
  fs.renameSync(temporary, filePath);
}

export function initializeDataRoot(cwd = process.cwd()): string {
  const root = getDataRoot(cwd);
  ensureDirectory(root);
  ensureDirectory(path.join(root, 'reports'));
  ensureDirectory(path.join(root, 'runs'));
  return root;
}

export function loadState(cwd = process.cwd()): CollectorState {
  return readJson(path.join(getDataRoot(cwd), 'state.json'), structuredClone(EMPTY_STATE));
}

export function saveState(state: CollectorState, cwd = process.cwd()): void {
  writeJsonAtomic(path.join(initializeDataRoot(cwd), 'state.json'), state);
}

export function loadCandidates(cwd = process.cwd()): NewsCandidate[] {
  return readJson(path.join(getDataRoot(cwd), 'candidates.json'), []);
}

export function saveCandidates(candidates: NewsCandidate[], cwd = process.cwd()): void {
  writeJsonAtomic(path.join(initializeDataRoot(cwd), 'candidates.json'), candidates);
}

export function loadDecisions(cwd = process.cwd()): DecisionEvent[] {
  return readJson(path.join(getDataRoot(cwd), 'decisions.json'), []);
}

export function saveDecisions(decisions: DecisionEvent[], cwd = process.cwd()): void {
  writeJsonAtomic(path.join(initializeDataRoot(cwd), 'decisions.json'), decisions);
}

export function saveRun(summary: RunSummary, cwd = process.cwd()): void {
  writeJsonAtomic(path.join(initializeDataRoot(cwd), 'runs', `${summary.runId}.json`), summary);
  writeJsonAtomic(path.join(getDataRoot(cwd), 'last-run.json'), summary);
}

export function loadLastRun(cwd = process.cwd()): RunSummary | undefined {
  return readJson<RunSummary | undefined>(path.join(getDataRoot(cwd), 'last-run.json'), undefined);
}

export function acquireLock(cwd = process.cwd()): () => void {
  const root = initializeDataRoot(cwd);
  const lockPath = path.join(root, 'collector.lock');
  try {
    const descriptor = fs.openSync(lockPath, 'wx', 0o600);
    fs.writeFileSync(descriptor, `${process.pid}\n${new Date().toISOString()}\n`);
    fs.closeSync(descriptor);
  } catch (error: any) {
    if (error?.code === 'EEXIST') throw new Error(`Collector is already running (${lockPath})`);
    throw error;
  }
  return () => { try { fs.unlinkSync(lockPath); } catch { /* lock may already be gone */ } };
}

export function writeReport(content: string, timestamp: Date, cwd = process.cwd()): string {
  const fileName = `${timestamp.toISOString().replace(/[:.]/g, '-')}.md`;
  const filePath = path.join(initializeDataRoot(cwd), 'reports', fileName);
  fs.writeFileSync(filePath, content, 'utf8');
  fs.writeFileSync(path.join(getDataRoot(cwd), 'latest-report.md'), content, 'utf8');
  return filePath;
}
