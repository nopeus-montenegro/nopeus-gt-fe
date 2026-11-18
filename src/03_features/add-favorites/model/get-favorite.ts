'use server';

import { auth } from '@/05_shared/lib/mock-auth/auth';
import { prisma } from '@/05_shared/lib/prisma/db';
import { Favorites } from '../lib/types';

export async function getFavorite(): Promise<Favorites> {
  const session = await auth();
  if (!session) return {
    favCars: [],
    favTracks: [],
    favSetups: [],
  };

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      favCars: {
        select: { id: true },
      },
      favTracks: {
        select: { id: true },
      },
      favSetups: {
        select: { id: true },
      },
    },
  });

  return {
    favCars: user?.favCars.map(car => car.id) ?? [],
    favTracks: user?.favTracks.map(track => track.id) ?? [],
    favSetups: user?.favSetups.map(setup => setup.id) ?? [],
  };
}
