'use server';

import { getUser, UserInclude } from '@/04_entities/user';
import { prisma } from '@/05_shared/lib/prisma/db';

export async function toggleFavoriteCar(carId: string, isFavorite: boolean) {
  const userData = await getUser() as UserInclude;
  if (!userData) throw new Error('Unauthorized');

  await prisma.user.update({
    where: { id: userData.id },
    data: {
      favCars: isFavorite
        ? { disconnect: { id: carId } }
        : { connect: { id: carId } },
    },
  });

  return { success: true };
}
