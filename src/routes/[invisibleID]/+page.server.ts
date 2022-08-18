import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

import { error, redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ params }) => {
    const image = await prisma.image.findFirst({
        where: { invisibleID: params.invisibleID },
        select: { imageID: true },
    });

    if (!image) {
        throw error(404, "Unable to found image with provided ID.");
    }

    throw redirect(308, `/i/${image.imageID}`);
};
