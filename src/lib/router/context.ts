import * as trpc from "@trpc/server";
import { prisma } from "$lib/server/client";

export const createContext = async () => {
    return { prisma };
};

type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const createRouter = () => trpc.router<Context>();