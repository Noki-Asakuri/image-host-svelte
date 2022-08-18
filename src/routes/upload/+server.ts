import type { RequestHandler } from "./$types";
import { error } from "@sveltejs/kit";
import sharp from "sharp";

import { prisma } from "$lib/server/prisma";
import { supabase } from "$lib/server/supabase";

import genID from "$lib/utils/genID";
import { SUPABASE_URL } from "$env/static/private";

export const GET: RequestHandler = async () => {
    return new Response(JSON.stringify({ message: "Make a POST requests to upload image." }), {
        status: 501,
        headers: {
            "Keep-Alive": "timeout=86400",
            Connection: "keep-alive",
            "Content-Type": "application/json",
        },
    });
};

export const POST: RequestHandler = async ({ request, url }) => {
    const API_KEY = request.headers.get("api_key");

    if (!API_KEY) {
        throw error(400, "API Key is required.");
    }

    const user = await prisma.user.findFirst({
        where: { key: API_KEY },
        select: { name: true, key: true },
    });

    if (!user) {
        throw error(401, "API KEY is invalided.");
    }

    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    const image = (await request.formData()).get("image") as File;

    if (!allowedImageTypes.includes(image.type)) {
        throw error(400, "Only accept image with type: png, jpg and webp.");
    }

    const { imageID, invisibleID, path } = genID(image.type.split("/")[1], user.name);
    const sharpImage = sharp(Buffer.from(await image.arrayBuffer()));
    const { width } = await sharpImage.metadata();

    if (width && width > 2028) {
        sharpImage.resize(2028);
    }
    sharpImage.webp({ effort: 3, quality: 85, alphaQuality: 90 });

    // todo: Fix gif not uploading to supabase storage.
    await Promise.all([
        prisma.image.create({
            data: {
                name: image.name,
                type: image.type,
                path: path,
                author: user.name,
                key: user.key,
                publicUrl: `${SUPABASE_URL}/storage/v1/object/public/images/${path}`,
                imageID: imageID,
                invisibleID: invisibleID,
            },
        }),
        supabase.upload(path, await sharpImage.toBuffer(), {
            contentType: "image/webp",
            cacheControl: "3600",
        }),
    ]);

    const link = `${url.origin}/${invisibleID}`;

    if (!request.headers.get("local")) {
        return new Response(JSON.stringify({ link }), {
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
