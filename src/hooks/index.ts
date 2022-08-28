import { sequence } from "@sveltejs/kit/hooks";

import { trpcHandle } from "./trpcHook";

export const handle = sequence(trpcHandle);
