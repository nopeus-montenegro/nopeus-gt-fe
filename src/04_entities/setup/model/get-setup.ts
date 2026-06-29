import { cache } from 'react';

import { prisma } from '@/05_shared/lib/prisma/db';
import { setupInclude } from '../lib/const';

export const getSetup = cache(async function (carId: string) {
  return (
    await prisma.setup.findUnique({
      where: { id: carId },
      include: setupInclude,
    })
  );
});
