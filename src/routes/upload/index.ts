import type { RequestHandler } from "@sveltejs/kit";
import sharp from "sharp";

import { prisma } from "$lib/server/prisma";
import { supabase } from "$lib/server/supabase";

import genID from "$lib/utils/genID";
import { env } from "$env/dynamic/private";

export const GET: RequestHandler = async () => {
    return { status: 200 };
};

export const POST: RequestHandler = async ({ request }) => {
    const API_KEY = request.headers.get("api_key");

    if (!API_KEY) {
        return { status: 400, body: { error: "Bad Request.", message: "API Key is required." } };
    }

    const user = await prisma.user.findFirst({
        where: { key: API_KEY },
        select: { name: true, key: true },
    });

    if (!user) {
        return {
            status: 401,
            body: {
                error: {
                    code: "Unauthorized.",
                    message: "API KEY is invalided.",
                },
            },
        };
    }
    const allowedImageTypes = ["image/png", "image/jpeg", "image/webp"];
    const image = (await request.formData()).get("image") as File;
    if (!allowedImageTypes.includes(image.type)) {
        return {
            status: 400,
            body: {
                error: "Bad Request.",
                message: "Only accept image with type: png, jpg and webp.",
            },
        };
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
                publicUrl: `${env.SUPABASE_URL}/storage/v1/object/public/images/${path}`,
                imageID: imageID,
                invisibleID: invisibleID,
            },
        }),
        supabase.upload(path, await sharpImage.toBuffer(), {
            contentType: "image/webp",
            cacheControl: "3600",
        }),
    ]);

    const link =
        (process.env.VERCEL_URL ? "https://" : "http://") +
        `${request.headers.get("host")}/${invisibleID}`;

    if (!request.headers.get("local")) {
        return {
            status: 200,
            headers: {
                "Keep-Alive": "timeout=86400",
                Connection: "keep-alive",
                "Content-Type": "application/json",
            },
            body: { link },
        };
    }

    return {
        status: 200,
        headers: {
            "Keep-Alive": "timeout=86400",
            Connection: "keep-alive",
            "Content-Type": "text/plain",
        },
        body: link,
    };
};
