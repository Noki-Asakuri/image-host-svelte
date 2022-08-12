// src/server/db/cl.ts
import pkg from "@prisma/client/edge";
const { PrismaClient } = pkg;

export const prisma = new PrismaClient({ log: ["query"] });
