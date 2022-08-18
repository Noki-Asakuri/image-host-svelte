import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

import { error } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const image = await prisma.image.findFirst({
        where: { imageID: params.imageID },
        select: { publicUrl: true, author: true, name: true },
    });

    if (!image) {
        throw error(404, "Unable to found image with provided ID.");
    }

    return image;
};
