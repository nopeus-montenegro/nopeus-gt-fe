import { cache } from 'react';

import { prisma } from '@/05_shared/lib/prisma/db';
import { lapTimeCarInclude, lapTimeTrackInclude } from './config';

export const getLapTimeCar = cache(async function (trackId: string) {
  return (
    await prisma.lapTime.findMany({
      where: {
        trackId,
        setup: {
          isBase: false,
        },
      },
      include: lapTimeCarInclude,
    })
  );
});

export const getLapTimeTrack = cache(async function (carId: string) {
  return (
    await prisma.lapTime.findMany({
      where: { setup: {
        carId,
        isBase: false,
      } },
      include: lapTimeTrackInclude,
      orderBy: [
        { track: { name: 'asc' } },
        { lapTime: 'asc' },
      ],
      distinct: ['setupId', 'trackId'],
    })
  );
});
