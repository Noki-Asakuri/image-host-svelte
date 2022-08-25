import { z } from "zod";
import { createRouter } from "../context";

export const imageRouter = createRouter().mutation("delete", {
    input: z.object({
        imageID: z.string(),
        path: z.string(),
    }),
    resolve: async ({ ctx, input: { imageID, path } }) => {
        const { prisma, supabase } = ctx;

        await Promise.all([prisma.image.delete({ where: { imageID } }), supabase.remove([path])]);
    },
});
