import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { parseFeed } from '../src/collectors/rss';
import { parseHtmlList } from '../src/collectors/html';
import { parseKonamiNewsScript } from '../src/collectors/konami';
import { canonicalizeUrl, normalizeRawItem } from '../src/pipeline/normalize';
import { scoreCandidate } from '../src/pipeline/score';
import type { NewsCandidate, SourceConfig } from '../src/types';

const fixtures = path.join(import.meta.dirname, 'fixtures');
const source: SourceConfig = {
  id: 'test-source', name: 'Test', publisher: 'Official', type: 'rss',
  url: 'https://example.com/feed.xml', enabled: true, official: true,
  locale: 'ja-JP', defaultCategories: ['PlayStation'], sourceKind: 'press-release',
  timeoutMs: 1000, requestIntervalMs: 0,
};

test('RSSを共通形式へ変換する', () => {
  const items = parseFeed(fs.readFileSync(path.join(fixtures, 'rss.xml'), 'utf8'), source, '2026-08-04T02:00:00Z');
  assert.equal(items.length, 1);
  assert.equal(items[0].externalId, 'news-001');
  assert.match(items[0].title ?? '', /大型DLC/);
});

test('HTML一覧で対象URLを抽出し重複を除く', () => {
  const items = parseHtmlList(fs.readFileSync(path.join(fixtures, 'list.html'), 'utf8'), {
    ...source, type: 'html', adapter: 'nintendo-topics', url: 'https://www.nintendo.com/jp/topics/',
    includeUrlPatterns: ['/jp/topics/article/'],
  }, '2026-08-04T02:00:00Z');
  assert.equal(items.length, 1);
  assert.equal(items[0].publishedAt, '2026-08-04');
});

test('KONAMI公開スクリプトからゲーム企業ニュースだけを抽出する', () => {
  const items = parseKonamiNewsScript(fs.readFileSync(path.join(fixtures, 'konami.js'), 'utf8'), {
    ...source, type: 'html', adapter: 'konami-news',
    url: 'https://www.konami.com/js/common/newsRoom.php?lang=ja&newsType=newsList&com=kde',
    includeUrlPatterns: ['/games/corporate/ja/news/release/', '/games/corporate/ja/news/topics/'],
  }, '2026-08-04T02:00:00Z');
  assert.equal(items.length, 1);
  assert.match(items[0].url, /20260803/);
  assert.equal(items[0].publishedAt, '2026-08-03T15:00:00+09:00');
});

test('URLからトラッキングパラメータとフラグメントを除く', () => {
  assert.equal(canonicalizeUrl('https://EXAMPLE.com/news/1/?utm_source=x#top'), 'https://example.com/news/1/');
});

test('同じ入力から同じfingerprintを生成する', () => {
  const raw = {
    sourceId: source.id, url: 'https://example.com/news/1', title: '新作発表', fetchedAt: '2026-08-04T00:00:00Z',
  };
  assert.equal(normalizeRawItem(raw, source).fingerprint, normalizeRawItem(raw, source).fingerprint);
});

test('採点内訳と上限を返す', () => {
  const candidate = {
    title: '『サンプル』新作を正式発表、PS5・Xbox・PCで発売日決定',
    summary: '日本国内向けに大型DLCとアップデートも発表されました。',
    announcedAt: '2026-08-04T01:00:00Z', locale: 'ja-JP',
    duplicate: { exact: false, similarCandidateIds: [], reasons: [] },
  } as Pick<NewsCandidate, 'title' | 'summary' | 'announcedAt' | 'locale' | 'duplicate'>;
  const result = scoreCandidate(candidate, source, {
    schemaVersion: 1, maxScore: 100, sourceKindScores: { 'press-release': 25 },
    freshnessScores: [{ maxHours: 6, score: 15 }],
    keywordRules: [{ label: '新作', patterns: ['新作'], score: 20 }, { label: '発売日', patterns: ['発売日'], score: 15 }],
    siteFitRules: [], penaltyRules: [],
  }, new Date('2026-08-04T02:00:00Z'));
  assert.equal(result.score, 73);
  assert.ok(result.breakdown.some(reason => reason.label === '情報量が少ない' && reason.score === -10));
  assert.deepEqual(result.platforms, ['PlayStation', 'PC', 'Xbox']);
});
