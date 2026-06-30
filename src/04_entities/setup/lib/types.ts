import { Prisma } from '@prisma/client';
import { setupInclude } from '../model/config';

export type SetupInclude = Prisma.SetupGetPayload<{ include: typeof setupInclude }>;
