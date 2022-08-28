<script lang="ts">
    import type { InferProceduresInput, InferProceduresOutput } from "$lib/utils/trpc";
    import { trpc } from "$lib/utils/trpc";

    import Info from "$lib/components/Info.svelte";
    import Upload from "$lib/components/Upload.svelte";
    import { ogImageUrl } from "$lib/store/image";

    import toast, { Toaster } from "svelte-french-toast";

    let info: InferProceduresOutput<"key", "create">;
    let isLoading = false;

    const createKey = async ({ user, password }: InferProceduresInput<"key", "create">) => {
        isLoading = true;
        try {
            info = await trpc.key.create.mutate({ user, password });
        } catch (err) {
            toast.error(`${err}`.split(":")[1], {
                duration: 2000,
                position: "top-right",
                style: "border-radius: 10px; background-color: #333; color: #E8DCFF",
            });
        } finally {
            isLoading = false;
        }
    };
</script>

<svelte:head>
    <title>Image Host</title>
    <meta name="title" content="Image Host" />

    <meta property="og:title" content="Image Host" />
    <meta property="og:site_name" content="Asakuri#8323" />
    <meta property="og:description" content="A image host made by Asakuri#8323 with Svelte." />
    <meta property="og:image" content={$ogImageUrl} />
</svelte:head>

<div class="h-screen w-screen">
    <div class="flex h-full w-full flex-col items-center justify-center gap-y-10">
        <div class="flex flex-col items-center justify-center gap-y-3">
            <span class="flex items-center justify-center text-7xl">Create new key</span>
            <span class="text-center text-lg">Made by Asakuri#8323 with Svelte</span>
            <a
                href="https://github.com/iahacker123/image-host-svelte"
                target="_blank"
                rel="noreferrer"
                class="rounded-full p-2 transition-colors duration-500 hover:bg-zinc-800"
            >
                <svg
                    stroke="currentColor"
                    fill="none"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                >
                    <path
                        d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    />
                </svg>
            </a>
        </div>

        <div class="flex w-full flex-wrap items-center justify-evenly gap-10">
            <Upload {createKey} {isLoading} />
            <Info {info} />
        </div>
    </div>
    <Toaster />
</div>
