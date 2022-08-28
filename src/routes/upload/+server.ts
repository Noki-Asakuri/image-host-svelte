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

    if (!user) return errorReponse(401, "API KEY is invalided.");

    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    const image = (await request.formData()).get("image") as File;

    if (!allowedImageTypes.includes(image.type)) {
        return errorReponse(400, "Only accept image with type: png, jpg and webp.");
    }

    const { imageID, invisibleID, path } = genID(image.type.split("/")[1], user.name);
    const sharpImage = sharp(Buffer.from(await image.arrayBuffer()));
    const { width } = await sharpImage.metadata();

    if (width && width > 2028) {
        sharpImage.resize(2028);
    }
    sharpImage.webp({ effort: 3, quality: 85, alphaQuality: 90 });

    await Promise.all([
        prisma.image.create({
            data: {
                name: image.name,
                type: image.type,
                author: user.name,
                key: user.key,
                publicUrl: `${SUPABASE_URL}/storage/v1/object/public/images/${path}`,
                path,
                imageID,
                invisibleID,
            },
        }),
        supabase.upload(path, await sharpImage.toBuffer(), {
            contentType: "image/webp",
            cacheControl: "86400",
        }),
    ]);

    const link = `${url.origin}/${invisibleID}`;

    if (!request.headers.has("dev")) {
        return new Response(JSON.stringify({ link, delete: `${url.origin}/i/${imageID}/delete` }), {
            status: 200,
            headers: {
                "Keep-Alive": "timeout=86400",
                Connection: "keep-alive",
                "Content-Type": "application/json",
            },
        });
    }

    return new Response(link, {
        status: 200,
        headers: {
            "Keep-Alive": "timeout=86400",
            Connection: "keep-alive",
            "Content-Type": "text/plain",
        },
    });
};
