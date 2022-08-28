// src/server/router/index.ts
import { initTRPC } from "@trpc/server";
import type { Context } from "./context";

export const t = initTRPC<{ ctx: Context }>()({
    errorFormatter: ({ shape }) => shape,
});
