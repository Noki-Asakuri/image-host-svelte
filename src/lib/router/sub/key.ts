import { z } from "zod";
import { createRouter } from "../context";

import { TRPCError } from "@trpc/server";

export const keyRouter = createRouter().mutation("create", {
    input: z.object({
        password: z.string(),
        author: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
        const { prisma } = ctx;
        const { password, author } = input;

        if (author.length === 0 || !/(\w{1,})#(\d{4})\b/g.test(author)) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "Missing author or author is incorrect!",
            });
        }

        if (password !== process.env.PASSWORD) {
            throw new TRPCError({
                code: "UNAUTHORIZED",
                message: "Password is incorrect!",
            });
        }

        const data = await prisma.user.findUnique({ where: { name: author } });
        if (data) {
            throw new TRPCError({
                code: "BAD_REQUEST",
                message: "User already exist!",
            });
        }

        const { key } = await prisma.api_key.create({ data: {} });
        await prisma.user.create({ data: { name: author, key } });

        return { key, author };
    },
});
