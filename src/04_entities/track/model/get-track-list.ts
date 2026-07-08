import { unstable_cache } from 'next/cache';

import { prisma } from '@/05_shared/lib/prisma/db';

export const getTrackList = unstable_cache(
  async function () {
    return (
      await prisma.track.findMany({
        orderBy: { name: 'asc' },
      })
    );
  },
  ['global-track-list'],
  {
    revalidate: 86400,
    tags: ['track-list'],
  },
);
