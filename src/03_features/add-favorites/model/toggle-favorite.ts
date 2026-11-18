'use server';

import { auth } from '@/05_shared/lib/mock-auth/auth';
import { prisma } from '@/05_shared/lib/prisma/db';
import { FAVORITE_TYPE } from '../lib/const';

const ALLOWED_FAVORITES = {
  [FAVORITE_TYPE.CAR]: 'favCars',
  [FAVORITE_TYPE.TRACK]: 'favTracks',
  [FAVORITE_TYPE.SETUP]: 'favSetups',
} as const;

export async function toggleFavorite(id: string, isFavorite: boolean, favoriteType: FAVORITE_TYPE) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  const dbFavField = ALLOWED_FAVORITES[favoriteType];

  if (!dbFavField) {
    throw new Error('Invalid favorite type payload');
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      [dbFavField]: isFavorite
        ? { disconnect: { id } }
        : { connect: { id } },
    },
  });

  return { success: true };
}
