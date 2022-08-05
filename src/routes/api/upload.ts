import type { RequestHandler } from "@sveltejs/kit";

import { prisma } from "$lib/server/client";
import { supabase } from "$lib/server/supabase";

import genID from "$lib/utils/genID";

export const POST: RequestHandler = async ({ request }) => {
    const user = await prisma.user.findUnique({
        where: { key: request.headers.get("api_key") as string },
        select: { name: true, key: true },
    });

    if (!user) {
        return {
            status: 401,
            body: {
                error: "Unauthorized.",
                message: "API KEY is invalided.",
            },
        };
    }

    const image = (await request.formData()).get("image") as File;
    const { imageID, invisibleID, path } = genID(image.type.split("/")[1], user.name);

    await Promise.all([
        prisma.image.create({
            data: {
                name: image.name,
                type: image.type,
                path: path,
                author: user.name,
                key: user.key,
                publicUrl: `https://vhkawzjiqyrfmnfllexh.supabase.co/storage/v1/object/public/images/${path}`,
                imageID: imageID,
                invisibleID: invisibleID,
            },
        }),
        supabase.upload(path, await image.arrayBuffer(), {
            contentType: image.type,
            cacheControl: `${30 * 24 * 60 * 60}`,
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
