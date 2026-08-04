import type { CandidateStatus, DecisionEvent } from '../types';
import { loadCandidates, loadDecisions, saveCandidates, saveDecisions } from '../repositories/storage';

const DECISION_STATUSES = new Set<CandidateStatus>(['reviewing', 'accepted', 'held', 'rejected', 'published']);

export function decideCommand(candidateId: string, status: string, note: string, cwd = process.cwd()): void {
  if (!DECISION_STATUSES.has(status as CandidateStatus)) throw new Error(`Invalid decision status: ${status}`);
  if (!note.trim()) throw new Error('--note is required');
  const candidates = loadCandidates(cwd);
  const index = candidates.findIndex(item => item.candidateId === candidateId);
  if (index < 0) throw new Error(`Candidate not found: ${candidateId}`);
  const event: DecisionEvent = {
    candidateId, status: status as Exclude<CandidateStatus, 'new'>,
    decidedAt: new Date().toISOString(), decidedBy: 'human-via-codex', note: note.trim(),
  };
  candidates[index] = { ...candidates[index], status: event.status, decision: event };
  saveCandidates(candidates, cwd);
  saveDecisions([...loadDecisions(cwd), event], cwd);
  console.log(`${candidateId} を ${status} に更新しました`);
}
