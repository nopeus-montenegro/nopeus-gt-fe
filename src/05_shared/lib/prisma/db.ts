import { PrismaClient } from '@/generated/prisma';
import { withAccelerate } from '@prisma/extension-accelerate';

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    accelerateUrl: process.env.ACCELERATE_DATABASE_URL,
  }).$extends(withAccelerate());
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') {
  globalThis.prismaGlobal = prisma;
};
