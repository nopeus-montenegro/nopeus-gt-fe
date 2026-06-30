import { Prisma } from '@prisma/client';
import { carInclude } from '../model/config';

export type CarInclude = Prisma.CarGetPayload<{ include: typeof carInclude }>;
