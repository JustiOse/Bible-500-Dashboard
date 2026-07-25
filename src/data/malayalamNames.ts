// Malayalam names for each Old Testament book, keyed by the English name
// parsed from the CSV filename (see books.ts). Cross-checked against the
// POC (KCBC) Malayalam Bible book list at thiruvachanam.in. Falls back to
// the English name if a book isn't listed here (e.g. New Testament books
// added later). Samuel/Kings/Chronicles/Maccabees use the unprefixed form
// since each of our CSVs already combines both parts (1 & 2) into one book.
export const MALAYALAM_BOOK_NAMES: Record<string, string> = {
  Genesis: 'ഉല്പത്തി',
  Exodus: 'പുറപ്പാട്',
  Leviticus: 'ലേവ്യർ',
  Numbers: 'സംഖ്യ',
  Deuteronomy: 'നിയമാവർത്തനം',
  Joshua: 'ജോഷ്വാ',
  Judges: 'ന്യായാധിപന്മാർ',
  Ruth: 'റൂത്ത്',
  Samuel: 'സാമുവൽ',
  Kings: 'രാജാക്കന്മാർ',
  Chronicles: 'ദിനവൃത്താന്തം',
  Ezra: 'എസ്രാ',
  Nehemiah: 'നെഹമിയ',
  Tobit: 'തോബിത്',
  Judith: 'യൂദിത്ത്',
  Esther: 'എസ്തേർ',
  Maccabees: 'മക്കബായർ',
  Job: 'ജോബ്',
  Psalms: 'സങ്കീർത്തനങ്ങൾ',
  Proverbs: 'സുഭാഷിതങ്ങൾ',
  Ecclesiastes: 'സഭാപ്രസംഗകൻ',
  'Song of Songs': 'ഉത്തമഗീതം',
  Wisdom: 'ജ്ഞാനം',
  Sirach: 'പ്രഭാഷകൻ',
  Isaiah: 'ഏശയ്യാ',
  Jeremiah: 'ജെറെമിയ',
  Lamentations: 'വിലാപങ്ങൾ',
  Baruch: 'ബാറൂക്ക്',
  Ezekiel: 'എസെക്കിയേൽ',
  Daniel: 'ദാനിയേൽ',
  Hosia: 'ഹോസിയാ',
  Joel: 'ജോയേൽ',
  Amos: 'ആമോസ്',
  Obadiah: 'ഒബാദിയ',
  Jonah: 'യോനാ',
  Micah: 'മിക്കാ',
  Nahum: 'നാഹും',
  Habakkuk: 'ഹബക്കുക്ക്',
  Zephaniah: 'സെഫാനിയ',
  Haggai: 'ഹഗ്ഗായി',
  Zechariah: 'സഖറിയാ',
  Malachi: 'മലാക്കി',

  // New Testament. Combined-part books (Corinthians, Thessalonians, Timothy,
  // Peter) use the unprefixed form since each of our CSVs combines both
  // parts (1 & 2) into one book, same convention as the Old Testament above.
  Matthew: 'മത്തായി',
  Mark: 'മർക്കോസ്',
  Luke: 'ലൂക്കാ',
  John: 'യോഹന്നാൻ',
  Acts: 'അപ്പ. പ്രവർത്തനങ്ങൾ',
  Romans: 'റോമാ',
  Corinthians: 'കൊറിന്തോസ്',
  Galatians: 'ഗലാത്തിയാ',
  Ephesians: 'എഫേസോസ്',
  Philippians: 'ഫിലിപ്പി',
  Colossians: 'കൊളോസോസ്',
  Thessalonians: 'തെസലോനിക്കാ',
  Timothy: 'തിമോത്തേയോസ്',
  Titus: 'തീത്തോസ്',
  Philemon: 'ഫിലേമോൻ',
  Hebrews: 'ഹെബ്രായർ',
  James: 'യാക്കോബ്',
  Peter: 'പത്രോസ്',
  Jude: 'യൂദാസ്',
  Revelation: 'വെളിപാട്',
};

export function toMalayalamName(englishName: string): string {
  return MALAYALAM_BOOK_NAMES[englishName] || englishName;
}
