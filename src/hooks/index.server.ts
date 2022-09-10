import { sequence } from "@sveltejs/kit/hooks";

import { trpcHandle } from "./trpcHook.server";

export const handle = sequence(trpcHandle);
