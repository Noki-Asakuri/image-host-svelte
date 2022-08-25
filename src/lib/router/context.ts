import * as trpc from "@trpc/server";
import { prisma } from "$lib/server/prisma";
import { supabase } from "$lib/server/supabase";

export const createContext = async () => ({ prisma, supabase });

type Context = trpc.inferAsyncReturnType<typeof createContext>;
export const createRouter = () => trpc.router<Context>();
