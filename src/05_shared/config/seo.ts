export const BASE_KEYWORDS = [
  // Game
  'gt7',
  'gran turismo 7',

  // App Core
  'setups',
  'tunes',
  'car tuning',
  'race setup',

  // Brand
  'nopeus gt',
];

export function getKeywords(pageKeywords: string[] = []): string[] {
  return Array.from(new Set([...BASE_KEYWORDS, ...pageKeywords]));
}
