import { Prisma } from '@prisma/client';
import { lapTimeInclude } from './const';

export type LapTimeInclude = Prisma.LapTimeGetPayload<{ include: typeof lapTimeInclude }>;
