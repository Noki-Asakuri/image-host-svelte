import { AppRouter } from "$lib/trpc/routers";
import { createContext } from "$lib/trpc/context";
import { createTRPCHandle } from "trpc-sveltekit";

import type { Handle } from "@sveltejs/kit";

export const trpcHandle: Handle = async ({ event, resolve }) => {
    return await createTRPCHandle({ router: AppRouter, createContext, event, resolve });
};
