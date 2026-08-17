export function deslugify(slug: string): string {
  return slug.split('-').pop() || '';
}
