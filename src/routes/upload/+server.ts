import sharp from "sharp";
import type { RequestHandler } from "./$types";

import { SUPABASE_URL } from "$env/static/private";

import { prisma } from "$lib/db/prisma";
import { supabase } from "$lib/db/supabase";
import { errorReponse } from "$lib/utils/errorResponse";
import { genID } from "$lib/utils/genID";

export const GET: RequestHandler = async () => {
    return errorReponse(501, "Make a POST request to upload.");
};

export const POST: RequestHandler = async ({ request, url }) => {
    const API_KEY = request.headers.get("api_key");

    if (!API_KEY) return errorReponse(400, "API Key is required.");

    const user = await prisma.user.findFirst({
        where: { key: API_KEY },
        select: { name: true, key: true },
    });

    if (!user) return errorReponse(401, "API Key is invalided.");

    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    const image = (await request.formData()).get("image") as File;

    if (!allowedImageTypes.includes(image.type)) {
        return errorReponse(400, "Only accept image with type: png, jpg and webp.");
    }

    const { imageID, invisibleID, path, publicUrl } = genID(
        image.type.split("/")[1],
        user.name,
        `${SUPABASE_URL}/storage/v1/object/public/images/`,
    );
    const sharpImage = sharp(Buffer.from(await image.arrayBuffer()));
    const { width } = await sharpImage.metadata();

    if (width && width > 2028) {
        sharpImage.resize(2028);
    }
    sharpImage.webp({ effort: 3, quality: 85, alphaQuality: 90 });

    await Promise.all([
        prisma.image.create({
            data: { name: image.name, key: user.key, publicUrl, path, imageID, invisibleID },
        }),
        supabase.upload(path, await sharpImage.toBuffer(), {
            contentType: "image/webp",
            cacheControl: "86400",
        }),
    ]);

    const responseUrl = {
        link: `${url.origin}/${invisibleID}`,
        delete: `${url.origin}/i/${imageID}/delete`,
    };

    if (request.headers.has("dev")) {
        return new Response(responseUrl.link, {
            status: 200,
            headers: {
                "Keep-Alive": "timeout=86400",
                Connection: "keep-alive",
                "Content-Type": "text/plain",
            },
        });
    }

    return new Response(JSON.stringify({ responseUrl }), {
        status: 200,
        headers: {
            "Keep-Alive": "timeout=86400",
            Connection: "keep-alive",
            "Content-Type": "application/json",
        },
    });
};
