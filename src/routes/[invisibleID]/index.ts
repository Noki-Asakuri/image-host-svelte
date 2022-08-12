import { prisma } from "$lib/server/prisma";
import type { RequestHandler } from "./__types";

export const GET: RequestHandler = async ({ params }) => {
    const image = await prisma.image.findFirst({
        where: { invisibleID: params.invisibleID },
        select: { imageID: true },
    });

    if (!image) {
        return { status: 307, headers: { Location: "/" } };
    }
    return { status: 308, headers: { Location: `/i/${image?.imageID}` } };
};
