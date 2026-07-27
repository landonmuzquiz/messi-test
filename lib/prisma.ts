import { PrismaClient } from "@prisma/client";

// Reuse a single PrismaClient across hot-reloads in dev. Without this, Next.js
// hot-reloading would create a new client (and connection pool) on every reload,
// eventually exhausting the database's connection limit.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
