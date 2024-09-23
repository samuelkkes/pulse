import { PrismaClient } from "@prisma/client";
import {Pool} from "@neondatabase/serverless";
import {PrismaNeon} from "@prisma/adapter-neon";

const neon = new Pool({ connectionString: process.env.POSTGRES_PRISMA_URL })
const adapter = new PrismaNeon(neon)

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const db = globalForPrisma.prisma || new PrismaClient({adapter});

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;