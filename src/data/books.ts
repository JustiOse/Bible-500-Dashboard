import { Book } from '../types';
import { toMalayalamName } from './malayalamNames';
import { NEW_TESTAMENT_ORDER } from './newTestamentOrder';

// Picks up every CSV dropped into this folder without needing a hardcoded
// import per book. Old Testament files are named "N. Book.csv" (e.g.
// "1. Genesis.csv"); New Testament files have no leading number (e.g.
// "Romans.csv") and are ordered via NEW_TESTAMENT_ORDER instead.
const context = require.context('.', false, /\.csv$/);

const NUMBERED_PATTERN = /^(\d+)\.\s*(.+?)\s*\.csv$/i;
const UNNUMBERED_PATTERN = /^(.+?)\s*\.csv$/i;

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export const BOOKS: Book[] = context
  .keys()
  .map((key) => {
    const filename = key.replace(/^\.\//, '');
    const numbered = NUMBERED_PATTERN.exec(filename);
    if (numbered) {
      const [, orderStr, name] = numbered;
      return {
        order: parseInt(orderStr, 10),
        name,
        displayName: toMalayalamName(name),
        slug: slugify(name),
        url: context(key) as string,
        testament: 'old' as const,
      };
    }

    const unnumbered = UNNUMBERED_PATTERN.exec(filename);
    if (unnumbered) {
      const [, name] = unnumbered;
      return {
        order: NEW_TESTAMENT_ORDER[name] ?? 999,
        name,
        displayName: toMalayalamName(name),
        slug: slugify(name),
        url: context(key) as string,
        testament: 'new' as const,
      };
    }

    return null;
  })
  .filter((book): book is Book => book !== null)
  .sort((a, b) => a.order - b.order);

export function getBookBySlug(slug: string | undefined): Book | undefined {
  return BOOKS.find((book) => book.slug === slug);
}
