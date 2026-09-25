import { Prisma } from '@prisma/client';

export const setupInclude = {
  author: true,
  car: true,
} satisfies Prisma.SetupInclude;

export const setupUserInclude = {
  car: true,
} satisfies Prisma.SetupInclude;
