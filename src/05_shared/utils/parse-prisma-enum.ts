export function parsePrismaEnum<T extends object>(
  value: string | string[] | undefined,
  prismaEnum: T,
): T[keyof T] | undefined {
  if (!value || Array.isArray(value)) return undefined;

  if (Object.values(prismaEnum).includes(value as unknown)) {
    return value as T[keyof T];
  }

  return undefined;
}
