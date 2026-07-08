import { Prisma } from '@prisma/client';

export const lapTimeCarInclude = {
  author: true,
  setup: {
    include: {
      car: true,
      author: true,
    },
  },
} satisfies Prisma.LapTimeInclude;

export const lapTimeTrackInclude = {
  track: true,
  author: true,
  setup: {
    include: {
      author: true,
    },
  },
} satisfies Prisma.LapTimeInclude;
