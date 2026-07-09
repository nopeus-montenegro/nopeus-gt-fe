export function parsePrismaEnum<T extends object>(
  value: string | string[] | undefined,
  prismaEnum: T,
): T[keyof T][] {
  if (!value) return [];

  const rawValues = Array.isArray(value)
    ? value.flatMap(v => v.split(','))
    : value.split(',');

  const allowedValues = new Set(Object.values(prismaEnum));

  return rawValues
    .map(v => v.trim())
    .filter((v): v is T[keyof T] & string => allowedValues.has(v));
}
