import { cache } from 'react';

import { auth } from '@/05_shared/lib/mock-auth/auth';
import { prisma } from '@/05_shared/lib/prisma/db';
import { userInclude } from './config';

export const getUser = cache(async function () {
  const session = await auth();

  if (!session) return null;

  return (
    await prisma.user.findUnique({
      where: { id: session.user.id },
      include: userInclude,
    })
  );
});
