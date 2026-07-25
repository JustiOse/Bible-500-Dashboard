// Canonical New Testament book order, continuing from the Old Testament's
// 1-42. Unlike Old Testament CSVs, New Testament filenames don't carry a
// leading number (see books.ts), so order is looked up here by name instead.
// Combined-part books (Corinthians, Thessalonians, Timothy, Peter) are
// listed once since each CSV combines both parts into one book. 1, 2 & 3
// John and Jude are combined into a single CSV/book, so they share one slot
// right after Peter and before Revelation.
export const NEW_TESTAMENT_ORDER: Record<string, number> = {
  Matthew: 43,
  Mark: 44,
  Luke: 45,
  John: 46,
  Acts: 47,
  Romans: 48,
  Corinthians: 49,
  Galatians: 50,
  Ephesians: 51,
  Philippians: 52,
  Colossians: 53,
  Thessalonians: 54,
  Timothy: 55,
  Titus: 56,
  Philemon: 57,
  Hebrews: 58,
  James: 59,
  Peter: 60,
  '1, 2, 3 John and Jude': 61,
  Jude: 61,
  Revelation: 62,
};
