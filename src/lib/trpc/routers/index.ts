// src/server/router/index.ts
import { t } from "../trpc";

import { imageRouter } from "./image";
import { keyRouter } from "./key";

export const AppRouter = t.router({ image: imageRouter, key: keyRouter });

// export type definition of API
export type AppRouter = typeof AppRouter;
