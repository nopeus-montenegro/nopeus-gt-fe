import { Prisma } from '@prisma/client';

export const userInclude = {
  setups: {
    include: {
      car: true,
      author: true,
    },
  },
  lapTimes: true,
} satisfies Prisma.UserInclude;
