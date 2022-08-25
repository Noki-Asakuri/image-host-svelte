import { prisma } from "$lib/server/prisma";
import { errorReponse } from "$lib/utils/errorResponse";

import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

export const GET: RequestHandler = async ({ params }) => {
    const image = await prisma.image.findFirst({
        where: { invisibleID: params.invisibleID },
        select: { imageID: true },
    });

    if (!image) {
        return errorReponse(404, "Unable to found image with provided ID.");
    }

    throw redirect(307, `/i/${image.imageID}`);
};
