import { z } from "zod";
import { createRouter } from "../context";

import { PASSWORD } from "$env/static/private";
import { TRPCError } from "@trpc/server";

export const keyRouter = createRouter().mutation("create", {
    input: z.object({
        password: z.string(),
        user: z.string(),
    }),
    resolve: async ({ ctx, input }) => {
        const { prisma } = ctx;
        const { password, user } = input;

        if (user.length === 0 || !/(\w{1,})#(\d{4})\b/g.test(user)) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "User is incorrect!" });
        }

        if (password !== PASSWORD) {
            throw new TRPCError({ code: "UNAUTHORIZED", message: "Password is incorrect!" });
        }

        const data = await prisma.user.findUnique({ where: { name: user } });
        if (data) {
            throw new TRPCError({ code: "BAD_REQUEST", message: "User already exist!" });
        }

        const { key } = await prisma.api_key.create({ data: {} });
        await prisma.user.create({ data: { name: user, key } });

        return { key, user };
    },
});
