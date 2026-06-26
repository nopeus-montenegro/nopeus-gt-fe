import { Prisma } from '@prisma/client';
import { setupInclude } from './const';

export type SetupInclude = Prisma.SetupGetPayload<{ include: typeof setupInclude }>;
