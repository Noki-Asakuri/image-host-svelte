import * as trpc from "@trpc/server";
import { prisma } from "$lib/server/prisma";

export const createContext = async () => ({ prisma });

type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const createRouter = () => trpc.router<Context>();
