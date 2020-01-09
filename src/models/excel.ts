export interface NumberRoot {
  variable: number;
  exponent: number;
}

export interface TableRow {
  [key: string]: number;
}

export interface TableRowsData {
  data: TableRow[];
}

export interface TableRequestData {
  cols_count: number;
  rows_count: number;
  variable: number;
  exponent: number;
  initials_array?: Array<number>;
}
