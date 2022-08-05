import { prisma } from "../../lib/server/client";
import type { RequestHandler } from "./__types";

export const GET: RequestHandler = async ({ params }) => {
    const image = await prisma.image.findFirst({
        where: { invisibleID: params.imageID },
        select: { publicUrl: true, author: true, name: true },
    });

    if (!image) {
        return { status: 404, body: { message: "Image not found!" } };
    }

    return {
        status: 200,
        body: { image },
    };
};
