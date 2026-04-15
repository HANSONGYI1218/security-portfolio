import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient();

// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma;
// }

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });

const prisma = new PrismaClient({ adapter });

export default prisma;