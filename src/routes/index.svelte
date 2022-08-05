<script lang="ts">
    import { trpc } from "$lib/utils/trpc";
    import type { InferMutationInput } from "$lib/utils/trpc";

    import Upload from "$lib/components/Upload.svelte";
    import Info from "$lib/components/Info.svelte";

    import { SvelteToast, toast } from "@zerodevx/svelte-toast";

    let info: { key: string; author: string };

    let isLoading = false;
    const createKey = async ({ author, password }: InferMutationInput<"key.create">) => {
        isLoading = true;
        try {
            info = await trpc.mutation("key.create", { author, password });
        } catch (err) {
            toast.push(`${err}`.split(":")[1], {
                duration: 2000,
                theme: {
                    "--toastWidth": "max-content",
                    "--toastBackground": "#F56565",
                    "--toastBarBackground": "#C53030",
                    "--toastBorderRadius": "0.5rem",
                },
            });
        } finally {
            isLoading = false;
        }
    };
</script>

<svelte:head>
    <title>Image Host</title>
    <meta name="title" content="ShareX Image Host" />
    <meta name="author" content="Asakuri#8323" />
    <meta name="theme-color" content="#8e7489" />
    <meta name="description" content="Image Host by Asakuri#8323" />

    <meta property="og:title" content="Image Host" />
    <meta property="og:site_name" content="Asakuri#8323" />
    <meta
        property="og:image"
        content="https://cdn.discordapp.com/avatars/188903265931362304/92aafdaa50ec6e45597aaafd54d1a2ef.png?size=4096"
    />
</svelte:head>

<div class="w-screen h-screen">
    <div class="flex flex-col items-center justify-center w-full h-full">
        <div class="flex flex-col items-center justify-center gap-y-3">
            <span class="flex items-center justify-center text-8xl"> Image host </span>
            <p class="text-lg">Made by Asakuri#8323 with Svelte</p>
        </div>

        <div class="flex flex-wrap items-center w-full gap-10 pt-20 justify-evenly">
            <Upload {createKey} {isLoading} />
            <Info {info} />
        </div>
    </div>
</div>

<SvelteToast />
