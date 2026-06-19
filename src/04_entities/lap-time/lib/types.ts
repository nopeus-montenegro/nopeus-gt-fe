import { Prisma } from '@prisma/client';
import { lapTimeCarInclude, lapTimeTrackInclude } from './const';

export type LapTimeCarInclude = Prisma.LapTimeGetPayload<{ include: typeof lapTimeCarInclude }>;

export type LapTimeTrackInclude = Prisma.LapTimeGetPayload<{ include: typeof lapTimeTrackInclude }>;
