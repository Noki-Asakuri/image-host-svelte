// src/server/db/cl.ts
import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
    log: ["query"],
});
