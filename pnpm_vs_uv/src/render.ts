import chalk from 'chalk';
import stringWidth from 'string-width';
import type { ProgressStat, Section } from './types';

export const BAR_WIDTH = 22;

export function padLabel(text: string, width: number): string {
  const gap = Math.max(1, width - stringWidth(text) + 1);
  return text + ' '.repeat(gap);
}

export function renderBar(done: number, total: number): string {
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

export function printStats(title: string, stats: ProgressStat[], labelWidth: number): void {
  if (stats.length === 0) return;
  console.log(chalk.bold.cyan(`\n${title}`));
  for (const stat of stats) {
    console.log(`${padLabel(stat.label, labelWidth)}${renderBar(stat.done, stat.total)}`);
  }
}

export function printRemaining(title: string, sections: Section[]): void {
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
