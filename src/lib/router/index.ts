// src/server/router/index.ts
import { createRouter } from "./context";
export { createContext } from "./context";

import { keyRouter } from "./sub/key";

export const router = createRouter()
    .formatError(({ shape }) => shape)
    .merge("key.", keyRouter);

// export type definition of API
export type Router = typeof router;
