<script lang="ts">
    import { trpc } from "$lib/utils/trpc";
    import type { PageData } from "./$types";

    import { goto } from "$app/navigation";
    import toast, { Toaster } from "svelte-french-toast";
    import { linear } from "svelte/easing";
    import { fade } from "svelte/transition";

    export let data: PageData;

    let hidden = true;

    const deleteImage = async () => {
        hidden = true;
        await toast.promise(
            trpc.mutation("image.delete", { imageID: data.imageID, path: data.path }),
            {
                loading: "Deleting ...",
                error: "Unable to delete image.",
                success: "Deleted image.",
            },
            {
                duration: 2000,
                style: "border-radius: 10px; background: #262626; color: #E8DCFF",
            },
        );

        setTimeout(() => goto("/"), 2500);
    };
</script>

<svelte:head>
    <title>{data.name}</title>
    <meta name="title" content={data.name} />

    <meta content={data.name} property="og:title" />
    <meta content={data.author} property="og:site_name" />
    <meta content={data.publicUrl} property="og:image" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative flex h-screen w-screen items-center justify-center">
    <div class="relative m-4 flex h-full flex-col items-center justify-center gap-y-20">
        <img
            alt={data.name}
            src={data.publicUrl}
            decoding="async"
            class="relative max-h-[40rem] w-auto rounded-xl shadow-xl shadow-slate-400"
        />
        <div>
            <button
                on:click={() => (hidden = false)}
                class="rounded-lg bg-red-600 p-2 text-lg hover:bg-red-500"
            >
                Delete image
            </button>
        </div>
        {#if !hidden}
            <div
                transition:fade={{ duration: 300, easing: linear }}
                on:click={() => (hidden = true)}
                class="absolute h-screen w-screen bg-black/50"
            />
            <div class="absolute z-50 max-w-xs" transition:fade={{ duration: 300, easing: linear }}>
                <div class="flex flex-col gap-3 rounded-lg bg-gray-600 p-3">
                    <h2 class="w-full text-center text-4xl text-red-600">Confirm</h2>
                    <span class="w-full text-center">You sure you want to delete this image?</span>
                    <div class="flex items-center justify-center gap-3">
                        <button
                            class="rounded-lg bg-green-600 p-2 hover:bg-green-500"
                            on:click={() => (hidden = true)}
                        >
                            Cancel
                        </button>
                        <button
                            class="rounded-lg bg-red-600 p-2 hover:bg-red-500"
                            on:click={() => deleteImage()}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        {/if}
        <Toaster />
    </div>
</div>
