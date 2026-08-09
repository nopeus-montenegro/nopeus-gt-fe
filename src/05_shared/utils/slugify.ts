export function slugify(texts: string[]): string {
  return texts
    .filter(Boolean)
    .map(text =>
      text.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9 _-]/g, '')
        .replace(/-+/g, '_')
        .replace(/\s+/g, '_')
        .replace(/_+/g, '_'),
    ).join('_');
}
