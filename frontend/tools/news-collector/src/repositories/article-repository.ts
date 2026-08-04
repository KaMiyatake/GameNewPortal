import fs from 'node:fs';
import path from 'node:path';
import { canonicalizeUrl } from '../pipeline/normalize';
import type { PublishedArticleIndex } from '../pipeline/deduplicate';

function walk(directory: string): string[] {
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : [fullPath];
  });
}

export function loadPublishedArticleIndex(cwd = process.cwd()): PublishedArticleIndex {
  const urls = new Map<string, string>();
  const titles: Array<{ slug: string; title: string }> = [];
  const articleRoot = path.join(cwd, 'src', 'data', 'articles');
  for (const filePath of walk(articleRoot).filter(file => file.endsWith('.ts') && !file.endsWith('index.ts') && !file.endsWith('_template.ts'))) {
    const content = fs.readFileSync(filePath, 'utf8');
    const slug = content.match(/\bslug:\s*['"`]([^'"`]+)['"`]/)?.[1] ?? path.basename(filePath, '.ts');
    const title = content.match(/\btitle:\s*['"`]([^'"`]+)['"`]/)?.[1];
    if (title) titles.push({ slug, title });
    for (const match of content.matchAll(/https?:\/\/[^\s'"`<>]+/g)) {
      try { urls.set(canonicalizeUrl(match[0].replace(/[),.;]+$/, '')), slug); } catch { /* ignore malformed URLs in article prose */ }
    }
  }
  return { urls, titles };
}
