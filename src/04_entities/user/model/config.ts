import { Prisma } from '@prisma/client';

export const userInclude = {
  setups: {
    where: {
      isBase: false,
    },
    include: {
      car: true,
      author: true,
    },
  },
  lapTimes: true,
  favSetups: {
    include: {
      car: true,
      author: true,
    },
  },
  favCars: {
    include: {
      setups: {
        where: {
          isBase: true,
        },
      },
    },
  },
  favTracks: true,
} satisfies Prisma.UserInclude;
