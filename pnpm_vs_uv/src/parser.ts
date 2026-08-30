import type { ChecklistItem, Section } from './types';

function toLines(md: string): string[] {
  return md.split(/\r?\n/);
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*/g, '')
    .trim();
}

export function parseTableItems(md: string): ChecklistItem[] {
  return toLines(md)
    .filter((line) => line.startsWith('|') && /\[[ xX]\]/.test(line))
    .map((line) => {
      const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
      const described = cells.filter((cell) => !/^\[[ xX]\]$/.test(cell));
      return { done: /\[x\]/i.test(line), text: described.join(' · ') };
    });
}

export function parseSections(md: string): Section[] {
  const sections: Section[] = [];
  let current: Section | null = null;
  for (const line of toLines(md)) {
    const header = line.match(/^##\s+(.+)/);
    if (header) {
      current = { title: stripMarkdown(header[1]), items: [] };
      sections.push(current);
      continue;
    }
    const item = line.match(/^[-*]\s+\[([ xX])\]\s*(.*)$/);
    if (item && current) {
      current.items.push({ done: item[1].toLowerCase() === 'x', text: stripMarkdown(item[2]) });
    }
  }
  return sections.filter((section) => section.items.length > 0);
}
