import { cache } from 'react';

import { prisma } from '@/05_shared/lib/prisma/db';
import { setupInclude } from './config';

export const getSetup = cache(async function (carId: string) {
  return (
    await prisma.setup.findUnique({
      where: { id: carId },
      include: setupInclude,
      cacheStrategy: {
        ttl: 300,
        swr: 3600,
      },
    })
  );
});
