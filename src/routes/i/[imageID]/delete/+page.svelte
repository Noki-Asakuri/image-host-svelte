<script lang="ts">
    import { trpc } from "$lib/utils/trpc";
    import type { PageData } from "./$types";

    import toast, { Toaster } from "svelte-french-toast";
    import { portal } from "svelte-portal/src/Portal.svelte";
    import { linear } from "svelte/easing";
    import { fade } from "svelte/transition";

    export let data: PageData;
    let isShow = false;
    let isDeleted = false;

    const deleteImage = async () => {
        isShow = false;
        await toast.promise(
            (async () => {
                await trpc.image.delete.mutate({ imageID: data.imageID, path: data.path });
                isDeleted = true;
            })(),
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
    };
</script>

<svelte:head>
    {#if !isDeleted}
        <title>{data.name}</title>
        <meta name="title" content={data.name} />

        <meta content={data.name} property="og:title" />
        <meta content={data.user.name} property="og:site_name" />
        <meta content={data.publicUrl} property="og:image" />
        <meta name="twitter:card" content="summary_large_image" />
    {:else}
        <title>Image Deleted</title>
        <meta name="title" content="Image Deleted" />
    {/if}
</svelte:head>

<div class="relative flex h-screen w-screen items-center justify-center">
    <div class="relative m-4 flex h-full flex-col items-center justify-center gap-y-20">
        <div class="relative flex h-[40rem] max-h-max items-center justify-center">
            <img
                alt={data.name}
                src={isDeleted
                    ? "https://via.placeholder.com/1920x1080?text=Image+Deleted"
                    : data.publicUrl}
                decoding="async"
                class="relative max-h-full w-auto rounded-xl shadow-xl shadow-slate-400"
            />
        </div>

        {#if !isDeleted}
            <button
                on:click={() => (isShow = true)}
                class="rounded-lg bg-red-600 p-2 text-lg hover:bg-red-500"
            >
                Click to delete
            </button>
        {/if}

        {#if isShow}
            <div use:portal={"body"} class="absolute inset-0 flex items-center justify-center">
                <div
                    transition:fade={{ duration: 300, easing: linear }}
                    on:click={() => (isShow = false)}
                    class="fixed h-screen w-screen bg-black/50"
                />
                <div class="fixed z-50 w-80" transition:fade={{ duration: 300, easing: linear }}>
                    <div class="flex flex-col gap-5 rounded-lg bg-gray-600 p-5">
                        <h2 class="w-full text-center text-4xl font-bold text-red-600">Confirm</h2>
                        <p class="w-full text-center">
                            Are you sure you want to delete this image?<br /> This action is irreversible.
                        </p>
                        <div class="flex items-center justify-evenly gap-3">
                            <button
                                class="rounded-lg bg-green-600 p-2 transition-colors duration-300 hover:bg-green-500"
                                on:click={() => (isShow = false)}
                            >
                                Cancel
                            </button>
                            <button
                                class="rounded-lg bg-red-600 p-2 transition-colors duration-300 hover:bg-red-500"
                                on:click={() => deleteImage()}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        {/if}
        <Toaster />
    </div>
</div>
