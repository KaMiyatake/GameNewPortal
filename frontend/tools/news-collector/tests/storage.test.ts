import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { decideCommand } from '../src/commands/decide';
import { loadCandidates, loadDecisions, saveCandidates } from '../src/repositories/storage';
import type { NewsCandidate } from '../src/types';

function sampleCandidate(): NewsCandidate {
  return {
    schemaVersion: 1,
    candidateId: '20260804-test-12345678',
    fingerprint: 'fingerprint',
    sourceId: 'test',
    sourceType: 'rss',
    sourceUrl: 'https://example.com/feed.xml',
    canonicalUrl: 'https://example.com/news/1',
    title: '新作ゲーム発表',
    publisher: 'Official',
    official: true,
    locale: 'ja-JP',
    discoveredAt: '2026-08-04T00:00:00Z',
    lastSeenAt: '2026-08-04T00:00:00Z',
    gameTitles: [], platforms: [], suggestedCategories: [], suggestedTags: [], matchedKeywords: [],
    score: 50, scoreBreakdown: [], warnings: [],
    duplicate: { exact: false, similarCandidateIds: [], reasons: [] },
    imageAssessment: { status: 'unknown', urls: [] },
    status: 'new',
  };
}

test('人間の判断を候補とイベント履歴へ保存する', () => {
  const cwd = fs.mkdtempSync(path.join(os.tmpdir(), 'news-collector-test-'));
  try {
    saveCandidates([sampleCandidate()], cwd);
    decideCommand('20260804-test-12345678', 'accepted', '記事化を承認', cwd);
    assert.equal(loadCandidates(cwd)[0].status, 'accepted');
    assert.equal(loadDecisions(cwd)[0].note, '記事化を承認');
  } finally {
    fs.rmSync(cwd, { recursive: true, force: true });
  }
});
