// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Optionally, you can add some logic to prevent multiple instances in development:
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
