import { Prisma } from '@prisma/client';
import { getUser } from '../model/get-user';

export type UserInclude = Prisma.PromiseReturnType<typeof getUser>;
