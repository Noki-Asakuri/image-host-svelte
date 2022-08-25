import { prisma } from "$lib/server/prisma";
import type { PageServerLoad } from "./$types";

import { error, redirect } from "@sveltejs/kit";
import { supabase } from "$lib/server/supabase";

export const load: PageServerLoad = async ({ params, url }) => {
    const image = await prisma.image.findFirst({
        where: { imageID: params.imageID },
        select: { publicUrl: true, author: true, name: true, imageID: true, path: true },
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
