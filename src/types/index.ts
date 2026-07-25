export interface Book {
  order: number;
  name: string;
  displayName: string;
  slug: string;
  url: string;
  testament: 'old' | 'new';
}

export interface ParsedRow {
  /** Every original CSV column for this row, in original header order. */
  cells: Record<string, string>;
  name: string;
  regNo: string;
  email: string;
  maskedEmail: string;
  total: number;
  allCorrect: boolean;
  /** Standard competition rank (1, 2, 2, 4, ...) based on total, descending. */
  rank: number;
}

export interface ParsedBook {
  headers: string[];
  rows: ParsedRow[];
  /** The header text identified as the participant-name column, if any. */
  nameHeader: string | null;
}
