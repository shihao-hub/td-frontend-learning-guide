import { readFileSync, readdirSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import chalk from 'chalk';
import stringWidth from 'string-width';
import { log } from 'node:console';

interface ChecklistItem {
  text: string;
  done: boolean;
}

interface Section {
  title: string;
  items: ChecklistItem[];
}

interface ProgressStat {
  label: string;
  done: number;
  total: number;
}

interface CliOptions {
  remaining: boolean;
  noColor: boolean;
}

const BAR_WIDTH = 22;
const repoRoot = resolve(fileURLToPath(new URL('.', import.meta.url)), '..');

function parseArgs(argv: string[]): CliOptions {
  return {
    remaining: argv.includes('--remaining'),
    noColor: argv.includes('--no-color'),
  };
}

function toLines(md: string): string[] {
  return md.split(/\r?\n/);
}

function stripMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1')
    .replace(/\*\*/g, '')
    .trim();
}

function parseTableItems(md: string): ChecklistItem[] {
  return toLines(md)
    .filter((line) => line.startsWith('|') && /\[[ xX]\]/.test(line))
    .map((line) => {
      const cells = line.split('|').slice(1, -1).map((cell) => cell.trim());
      const described = cells.filter((cell) => !/^\[[ xX]\]$/.test(cell));
      return { done: /\[x\]/i.test(line), text: described.join(' · ') };
    });
}

function parseSections(md: string): Section[] {
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

function collectProjects(root: string): Section[] {
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

function collectTracker(root: string): Section[] {
  const trackerPath = join(root, 'learning-guide', '学习进度追踪.md');
  return parseSections(readFileSync(trackerPath, 'utf8'));
}

function toStat(section: Section): ProgressStat {
  return {
    label: section.title,
    done: section.items.filter((item) => item.done).length,
    total: section.items.length,
  };
}

function padLabel(text: string, width: number): string {
  const gap = Math.max(1, width - stringWidth(text) + 1);
  return text + ' '.repeat(gap);
}

function renderBar(done: number, total: number): string {
  const ratio = total === 0 ? 0 : done / total;
  const filled = Math.round(ratio * BAR_WIDTH);
  const pct = Math.round(ratio * 100);
  const bar = chalk.green('█'.repeat(filled)) + chalk.gray('░'.repeat(BAR_WIDTH - filled));
  const count = `${done}/${total}`.padStart(5);
  const pctText = `${pct}%`.padStart(4);
  const styledPct =
    pct === 100 ? chalk.bold.green(pctText) : pct === 0 ? chalk.gray(pctText) : chalk.yellow(pctText);
  return `${bar} ${count} ${styledPct}`;
}

function printStats(title: string, stats: ProgressStat[], labelWidth: number): void {
  if (stats.length === 0) return;
  console.log(chalk.bold.cyan(`\n${title}`));
  for (const stat of stats) {
    console.log(`${padLabel(stat.label, labelWidth)}${renderBar(stat.done, stat.total)}`);
  }
}

function printRemaining(title: string, sections: Section[]): void {
  const pending = sections.flatMap((section) => section.items.filter((item) => !item.done));
  console.log(chalk.bold.cyan(`\n${title}`));
  if (pending.length === 0) {
    console.log(chalk.green('  ✓ 全部完成'));
    return;
  }
  for (const section of sections) {
    const undone = section.items.filter((item) => !item.done);
    if (undone.length === 0) continue;
    console.log(chalk.bold(`  ${section.title}（${undone.length} 项未完成）`));
    for (const item of undone) {
      console.log(chalk.gray('    ✗ ') + item.text);
    }
  }
}

function main(): void {
  const options = parseArgs(process.argv.slice(2));
  console.log('options:', options);
  if (options.noColor) chalk.level = 0;

  console.log('repoRoot: ', repoRoot)
  const projects = collectProjects(repoRoot);
  const tracker = collectTracker(repoRoot);
  const projectStats = projects.map(toStat);
  const trackerStats = tracker.map(toStat);
  const allStats = [...projectStats, ...trackerStats];

  if (allStats.length === 0) {
    console.log('没有找到可统计的打卡数据（表格 [ ] 单元格 或 - [ ] 清单项）');
    return;
  }

  const labelWidth = Math.max(...allStats.map((stat) => stringWidth(stat.label)));
  const totalDone = allStats.reduce((sum, stat) => sum + stat.done, 0);
  const totalAll = allStats.reduce((sum, stat) => sum + stat.total, 0);

  console.log(chalk.bold('学习进度总览'));
  printStats('练习项目（各 README 知识点清单）', projectStats, labelWidth);
  printStats('周计划（learning-guide/学习进度追踪.md）', trackerStats, labelWidth);

  console.log(chalk.dim('─'.repeat(labelWidth + BAR_WIDTH + 14)));
  console.log(`${padLabel('总计', labelWidth)}${renderBar(totalDone, totalAll)}`);

  if (options.remaining) {
    printRemaining('未完成 · 练习项目', projects);
    printRemaining('未完成 · 周计划', tracker);
  }
}

main();
