// src/server/router/index.ts
import { createRouter } from "./context";

import { keyRouter } from "./sub/key";
export { createContext } from "./context";

export const router = createRouter()
    .formatError(({ shape }) => shape)
    .merge("key.", keyRouter)
    .query("test", {
        resolve: () => {
            return {
                message: "test",
            };
        },
    });

// export type definition of API
export type Router = typeof router;
