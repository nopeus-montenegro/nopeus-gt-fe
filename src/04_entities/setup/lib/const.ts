import { Prisma } from '@prisma/client';

export const lapTimeInclude = {
  author: true,
  setup: {
    include: {
      car: true,
      author: true,
    },
  },
} satisfies Prisma.LapTimeInclude;
