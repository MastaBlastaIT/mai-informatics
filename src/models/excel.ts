export interface NumberRoot {
  variable: number;
  exponent: number;
  cols_count: number;
}

export interface TableRow {
  [key: string]: number;
}

export interface TableData {
  rows_count: number;
  table_rows: TableRow[];
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
