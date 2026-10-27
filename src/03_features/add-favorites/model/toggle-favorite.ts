'use server';

import { getUser, UserInclude } from '@/04_entities/user';
import { prisma } from '@/05_shared/lib/prisma/db';
import { FAVORITE_TYPE } from '../lib/const';

const ALLOWED_FAVORITES = {
  [FAVORITE_TYPE.CAR]: 'favCars',
  [FAVORITE_TYPE.TRACK]: 'favTracks',
  [FAVORITE_TYPE.SETUP]: 'favSetups',
} as const;

export async function toggleFavorite(id: string, isFavorite: boolean, favoriteType: FAVORITE_TYPE) {
  const userData = await getUser() as UserInclude;
  if (!userData) throw new Error('Unauthorized');

  const dbFavField = ALLOWED_FAVORITES[favoriteType];

  if (!dbFavField) {
    throw new Error('Invalid favorite type payload');
  }

  await prisma.user.update({
    where: { id: userData.id },
    data: {
      [dbFavField]: isFavorite
        ? { disconnect: { id } }
        : { connect: { id } },
    },
  });

  return { success: true };
}
