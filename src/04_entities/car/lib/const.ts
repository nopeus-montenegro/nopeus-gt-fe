import { Prisma } from '@prisma/client';

export const carInclude = {
  setups: {
    where: {
      isBase: true,
    },
  },
} satisfies Prisma.CarInclude;
