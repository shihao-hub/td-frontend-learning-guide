export interface ChecklistItem {
  text: string;
  done: boolean;
}

export interface Section {
  title: string;
  items: ChecklistItem[];
}

export interface ProgressStat {
  label: string;
  done: number;
  total: number;
}

export interface CliOptions {
  remaining: boolean;
  noColor: boolean;
}
