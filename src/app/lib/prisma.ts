// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

if (process.env.NODE_ENV === 'development') {
  // @ts-ignore
  if (!global.prisma) {
    // @ts-ignore
    global.prisma = prisma;
  }
  // @ts-ignore
  global.prisma = prisma;
}

export default prisma;
