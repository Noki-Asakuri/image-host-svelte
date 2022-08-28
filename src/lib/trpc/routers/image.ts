import { z } from "zod";
import { t } from "../trpc";

export const imageRouter = t.router({
    delete: t.procedure
        .input(z.object({ imageID: z.string(), path: z.string() }))
        .mutation(async ({ ctx, input: { imageID, path } }) => {
            const { prisma, supabase } = ctx;

            await Promise.all([
                prisma.image.delete({ where: { imageID } }),
                supabase.remove([path]),
            ]);
        }),
});
