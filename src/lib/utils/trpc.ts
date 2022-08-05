import { createTRPCClient } from "@trpc/client";

import type { Router } from "$lib/router/index"; // 👈 only the types are imported from the server
import type { inferProcedureInput, inferProcedureOutput } from "@trpc/server";

export const trpc = createTRPCClient<Router>({ url: "/trpc" });

type Query = keyof Router["_def"]["queries"];
type Mutation = keyof Router["_def"]["mutations"];

// Useful types 👇👇👇
export type InferQueryOutput<RouteKey extends Query> = inferProcedureOutput<
    Router["_def"]["queries"][RouteKey]
>;
export type InferQueryInput<RouteKey extends Query> = inferProcedureInput<
    Router["_def"]["queries"][RouteKey]
>;
export type InferMutationOutput<RouteKey extends Mutation> =
    inferProcedureOutput<Router["_def"]["mutations"][RouteKey]>;
export type InferMutationInput<RouteKey extends Mutation> = inferProcedureInput<
    Router["_def"]["mutations"][RouteKey]
>;
