import { prisma } from "$lib/server/prisma";
import type { RequestHandler } from "./__types";

export const GET: RequestHandler = async ({ params }) => {
    const image = await prisma.image.findFirst({
        where: { invisibleID: params.imageID },
        select: { publicUrl: true, author: true, name: true, path: true },
    });

    if (!image) {
        return {
            status: 404,
            body: {
                error: { code: "Not Found", message: "Unable to fetch image with provided ID." },
            },
            headers: { "Keep-Alive": "timeout=86400", Connection: "keep-alive" },
        };
    }

    return {
        status: 200,
        body: { image },
        headers: {
            "Keep-Alive": "timeout=86400",
            Connection: "keep-alive",
        },
    };
};
