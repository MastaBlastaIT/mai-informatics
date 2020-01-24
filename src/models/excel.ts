export interface NumberRoot {
  variable: number;
  exponent: number;
  cols_count: number;
}

export interface TableRow {
  [key: string]: number;
}

export interface ChartStep {
  step_index: number;
  step_value: number;
}

export type Chart = ChartStep[];

export interface TableData {
  rows_count: number;
  table_rows: TableRow[];
  charts: Chart[];
  y_tick_values: number[];
}

export interface TableRequestData {
  cols_count: number;
  variable: number;
  exponent: number;
  initials_array?: Array<number>;
}

export interface FormFields {
  [field: string]: any;
}

export interface ValidationRules {
  message: string;
  valid: boolean;
}

export const LineColors = [
  "#F44336",
  "#4CAF50",
  "#7986CB",
  "#E91E63",
  "#8BC34A",
  "#2196F3",
  "#FF5722",
  "#009688",
  "#9C27B0",
  "#CDDC39",
  "#9575CD",
  "#4FC3F7",
  "#FFEB3B",
  "#00BCD4",
  "#FFC107",
  "#A1887F",
  "#FF9800",
  "#607D8B",
  "#000"
];
