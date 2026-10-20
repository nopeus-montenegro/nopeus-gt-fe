'use server';

import { getUser, UserInclude } from '@/04_entities/user';
import { prisma } from '@/05_shared/lib/prisma/db';

export async function getFavoriteCars(): Promise<string[]> {
  const userData = await getUser() as UserInclude;
  if (!userData) return [];

  const user = await prisma.user.findUnique({
    where: { id: userData.id },
    select: {
      favCars: {
        select: { id: true },
      },
    },
  });

  return user?.favCars.map(car => car.id) ?? [];
}
