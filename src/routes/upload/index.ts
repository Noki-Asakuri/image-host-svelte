import type { RequestHandler } from "@sveltejs/kit";
import sharp from "sharp";

import { prisma } from "$lib/server/prisma";
import { supabase } from "$lib/server/supabase";

import genID from "$lib/utils/genID";

export const GET: RequestHandler = async () => {
    return { status: 200 };
};

export const POST: RequestHandler = async ({ request }) => {
    const user = await prisma.user.findFirst({
        where: { key: request.headers.get("api_key") as string },
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

    const image = (await request.formData()).get("image") as File;
    const { imageID, invisibleID, path } = genID(image.type.split("/")[1], user.name);

    const sharpImage = sharp(new Buffer(await image.arrayBuffer()))
        .webp({ effort: 3, quality: 70, alphaQuality: 70 })
        .toFormat("webp");

    await Promise.all([
        prisma.image.create({
            data: {
                name: image.name,
                type: image.type,
                path: path,
                author: user.name,
                key: user.key,
                // todo: prob remove this in future?
                // publicUrl: `https://ik.imagekit.io/gmethsnvl/asakuri/${path}`,
                publicUrl: `https://vhkawzjiqyrfmnfllexh.supabase.co/storage/v1/object/public/images/${path}`,
                imageID: imageID,
                invisibleID: invisibleID,
            },
        }),
        supabase.upload(path, await sharpImage.toBuffer(), {
            contentType: "image/webp",
            cacheControl: "3600",
            upsert: false,
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
        body: `${link}`,
    };
};
