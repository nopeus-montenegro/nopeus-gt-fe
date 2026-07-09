import { unstable_cache } from 'next/cache';

import { prisma } from '@/05_shared/lib/prisma/db';
import { CarInclude } from '../lib/types';
import { carInclude } from './config';

export const getCarList = unstable_cache(
  async () => {
    return (
      await prisma.car.findMany({
        orderBy: [
          { manufacturer: 'asc' },
          { name: 'asc' },
        ],
        include: carInclude,
        cacheStrategy: {
          ttl: 3600,
          swr: 86400,
        },
      }) as CarInclude[]);
  },
  ['global-car-list-include-base-setup'],
  {
    revalidate: 86400,
    tags: ['car-list'],
  },
);
