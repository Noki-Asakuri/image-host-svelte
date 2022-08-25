// src/server/router/index.ts
import { createRouter } from "./context";
export { createContext } from "./context";

import { keyRouter } from "./sub/key";
import { imageRouter } from "./sub/image";

export const router = createRouter()
    .formatError(({ shape }) => shape)
    .merge("key.", keyRouter)
    .merge("image.", imageRouter);

// export type definition of API
export type Router = typeof router;
