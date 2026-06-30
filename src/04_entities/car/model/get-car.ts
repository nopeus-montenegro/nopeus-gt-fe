import { cache } from 'react';

import { prisma } from '@/05_shared/lib/prisma/db';
import { carInclude } from './config';

export const getCar = cache(async function (carId: string) {
  return (
    await prisma.car.findUnique({
      where: { id: carId },
      include: carInclude,
    })
  );
});
