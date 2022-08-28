// src/utils/trpc.ts
import type { AppRouter } from "$lib/trpc/routers";
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

import { httpBatchLink, loggerLink } from "@trpc/client";
import { createTRPCProxyClient } from "@trpc/client";

export const trpc = createTRPCProxyClient<AppRouter>({
    url: "/trpc",
    links: [
        loggerLink({
            enabled: (opts) =>
                process.env.NODE_ENV === "development" ||
                (opts.direction === "down" && opts.result instanceof Error),
        }),
        httpBatchLink({ url: "/trpc" }),
    ],
});

/**
 * Enum containing all api procedures
 */
export type TProcedures = keyof AppRouter["_def"]["procedures"];

/**
 * Enum containing all procedure paths
 */
export type TRouterPaths<TRouterKey extends TProcedures> =
    keyof AppRouter[TRouterKey]["_def"]["procedures"];

/**
 * This is a helper method to infer the output of a procedure
 * @example type HelloOutput = InferProceduresOutput<'hello'>
 */
export type InferProceduresOutput<
    TRouteKey extends TProcedures,
    TRoutePath extends TRouterPaths<TRouteKey>,
> = inferProcedureOutput<AppRouter[TRouteKey][TRoutePath]>;

/**
 * This is a helper method to infer the input of a procedure
 * @example type HelloOutput = InferProceduresInput<'hello'>
 */
export type InferProceduresInput<
    TRouteKey extends TProcedures,
    TRoutePath extends TRouterPaths<TRouteKey>,
    // @ts-expect-error: Idek why this raise error ¯\_(ツ)_/¯
> = inferProcedureInput<AppRouter[TRouteKey][TRoutePath]>;
