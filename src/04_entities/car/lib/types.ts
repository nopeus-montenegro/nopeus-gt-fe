import { Prisma } from '@prisma/client';
import { carInclude } from './const';

export type CarInclude = Prisma.CarGetPayload<{ include: typeof carInclude }>;
