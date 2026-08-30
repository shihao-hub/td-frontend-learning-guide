import { log } from 'node:console';
import chalk from 'chalk';
import stringWidth from 'string-width';
import { collectProjects, collectTracker, repoRoot } from './collector';
import { BAR_WIDTH, padLabel, printRemaining, printStats, renderBar } from './render';
import type { CliOptions, ProgressStat, Section } from './types';

function parseArgs(argv: string[]): CliOptions {
  return {
    remaining: argv.includes('--remaining'),
    noColor: argv.includes('--no-color'),
  };
}

function toStat(section: Section): ProgressStat {
  return {
    label: section.title,
    done: section.items.filter((item) => item.done).length,
    total: section.items.length,
  };
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
