'use server';

import { getUser, UserInclude } from '@/04_entities/user';
import { prisma } from '@/05_shared/lib/prisma/db';
import { FAVORITE_TYPE } from '../lib/const';

export async function toggleFavorite(id: string, isFavorite: boolean, favoriteType: FAVORITE_TYPE) {
  const userData = await getUser() as UserInclude;
  if (!userData) throw new Error('Unauthorized');

  await prisma.user.update({
    where: { id: userData.id },
    data: {
      [favoriteType]: isFavorite
        ? { disconnect: { id } }
        : { connect: { id } },
    },
  });

  return { success: true };
}
