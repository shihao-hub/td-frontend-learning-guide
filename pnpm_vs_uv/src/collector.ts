import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseSections, parseTableItems } from './parser';
import type { Section } from './types';

export const repoRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '../..');

export function collectProjects(root: string): Section[] {
  const projects: Section[] = [];
  for (const entry of readdirSync(root, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue;
    }
    let md: string;
    try {
      md = readFileSync(join(root, entry.name, 'README.md'), 'utf8');
    } catch {
      continue;
    }
    const items = parseTableItems(md);
    if (items.length === 0) continue;
    projects.push({ title: entry.name, items });
  }
  return projects.sort((a, b) => a.title.localeCompare(b.title));
}

export function collectTracker(root: string): Section[] {
  const trackerPath = join(root, 'learning-guide', '学习进度追踪.md');
  return parseSections(readFileSync(trackerPath, 'utf8'));
}
