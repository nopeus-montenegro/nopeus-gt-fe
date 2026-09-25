import { Prisma } from '@prisma/client';
import { setupInclude, setupUserInclude } from '../model/config';

export type SetupInclude = Prisma.SetupGetPayload<{ include: typeof setupInclude }>;
export type SetupUserInclude = Prisma.SetupGetPayload<{ include: typeof setupUserInclude }>;
