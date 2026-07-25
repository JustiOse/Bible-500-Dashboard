import { Book } from '../types';
import { toMalayalamName } from './malayalamNames';

// Picks up every CSV dropped into this folder (Old Testament today, New
// Testament later) without needing a hardcoded import per book.
const context = require.context('.', false, /\.csv$/);

const FILENAME_PATTERN = /^(\d+)\.\s*(.+?)\s*\.csv$/i;

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
    const match = FILENAME_PATTERN.exec(filename);
    if (!match) {
      return null;
    }
    const [, orderStr, name] = match;
    return {
      order: parseInt(orderStr, 10),
      name,
      displayName: toMalayalamName(name),
      slug: slugify(name),
      url: context(key) as string,
    };
  })
  .filter((book): book is Book => book !== null)
  .sort((a, b) => a.order - b.order);

export function getBookBySlug(slug: string | undefined): Book | undefined {
  return BOOKS.find((book) => book.slug === slug);
}
