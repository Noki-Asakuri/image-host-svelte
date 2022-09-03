import { prisma } from "$lib/db/prisma";

import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params }) => {
    const image = await prisma.image.findUnique({
        where: { imageID: params.imageID },
        select: { publicUrl: true, name: true, user: { select: { name: true } } },
    });

    if (!image) {
        throw error(404, "Unable to found image with provided ID.");
    }

    return image;
};
