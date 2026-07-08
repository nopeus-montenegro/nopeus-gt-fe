import { cache } from 'react';

import { prisma } from '@/05_shared/lib/prisma/db';

export const getTrack = cache(async function (trackId: string) {
  return (
    await prisma.track.findUnique({
      where: { id: trackId },
    })
  );
});
