import { createContext, router } from "$lib/router";
import { createTRPCHandle } from "trpc-sveltekit";

import type { Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const response = await createTRPCHandle({
    router,
    createContext,
    event,
    resolve,
  });

  return response;
};
