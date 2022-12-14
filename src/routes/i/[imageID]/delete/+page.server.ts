import { prisma } from "$lib/db/prisma";
import { supabase } from "$lib/db/supabase";

import { error, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, url }) => {
    const image = await prisma.image.findUnique({
        where: { imageID: params.imageID },
        select: {
            publicUrl: true,
            name: true,
            imageID: true,
            path: true,
            user: { select: { name: true } },
        },
    });

    if (!image) {
        throw error(404, "Unable to found image with provided ID.");
    }

    if (url.searchParams.has("force")) {
        await Promise.all([
            prisma.image.delete({ where: { imageID: image.imageID } }),
            supabase.remove([image.path]),
        ]);

        throw redirect(307, "/");
    }

    return image;
};
