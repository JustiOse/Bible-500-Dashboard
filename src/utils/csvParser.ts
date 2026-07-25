import Papa from 'papaparse';
import { ParsedBook, ParsedRow } from '../types';

const NAME_RE = /name/i;
const EMAIL_RE = /email/i;
const REG_NO_RE = /reg\s*no/i;
// Matches "Total" and "Total Points", but not "Points"/"Result" columns
// that some books (Song of Songs, Wisdom, Isaiah, Sirach...) list first.
const TOTAL_RE = /^total\b/i;
// Matches "All Correct" and the "All Cottect" typo (Deuteronomy).
const ALL_CORRECT_RE = /all\s*co\w*ect/i;

function findHeaderIndex(headers: string[], pattern: RegExp): number {
  return headers.findIndex((header) => pattern.test(header.trim()));
}

export function maskEmail(email: string): string {
  const at = email.indexOf('@');
  if (at <= 0) {
    return email;
  }
  const local = email.slice(0, at);
  const domain = email.slice(at);
  if (local.length <= 3) {
    return `${local[0]}***${domain}`;
  }
  return `${local.slice(0, 2)}***${local.slice(-1)}${domain}`;
}

export function parseBookCsv(csvText: string): ParsedBook {
  const { data } = Papa.parse<string[]>(csvText, {
    skipEmptyLines: true,
  });

  const rows = data as string[][];
  if (rows.length === 0) {
    return { headers: [], rows: [], nameHeader: null };
  }

  const headers = rows[0].map((header) => header.trim());
  const nameIdx = findHeaderIndex(headers, NAME_RE);
  const emailIdx = findHeaderIndex(headers, EMAIL_RE);
  const regNoIdx = findHeaderIndex(headers, REG_NO_RE);
  const totalIdx = findHeaderIndex(headers, TOTAL_RE);
  const allCorrectIdx = findHeaderIndex(headers, ALL_CORRECT_RE);

  const parsedRows: ParsedRow[] = [];

  for (let i = 1; i < rows.length; i++) {
    const row = rows[i];
    const email = (emailIdx >= 0 ? row[emailIdx] : '')?.trim() ?? '';
    if (!email) {
      // No email = data-entry artifact, not a real participant.
      continue;
    }

    const masked = maskEmail(email);
    const cells: Record<string, string> = {};
    headers.forEach((header, idx) => {
      cells[header] = idx === emailIdx ? masked : (row[idx] ?? '').trim();
    });

    const name = (nameIdx >= 0 ? row[nameIdx] : '')?.trim() ?? '';
    const regNo = (regNoIdx >= 0 ? row[regNoIdx] : '')?.trim() ?? '';
    const totalRaw = totalIdx >= 0 ? row[totalIdx] : '';
    const total = parseFloat(totalRaw) || 0;
    const allCorrectRaw =
      (allCorrectIdx >= 0 ? row[allCorrectIdx] : '')?.trim().toLowerCase() ?? '';

    parsedRows.push({
      cells,
      name,
      regNo,
      email,
      maskedEmail: masked,
      total,
      allCorrect: allCorrectRaw === 'true',
      rank: 0, // filled in below
    });
  }

  parsedRows.sort((a, b) => b.total - a.total);
  // Dense ranking (1, 2, 2, 3, ...), not competition ranking (1, 2, 2, 4):
  // a handful of source CSVs (Luke, Psalms, Zechariah, ...) carry the
  // organizers' own "1st/2nd/3rd" labels, and those never skip a place
  // after a tie — e.g. two people tied for 2nd is still followed by a 3rd.
  let rank = 0;
  let previousTotal: number | null = null;
  parsedRows.forEach((row) => {
    if (row.total !== previousTotal) {
      rank += 1;
      previousTotal = row.total;
    }
    row.rank = rank;
  });

  return { headers, rows: parsedRows, nameHeader: nameIdx >= 0 ? headers[nameIdx] : null };
}
