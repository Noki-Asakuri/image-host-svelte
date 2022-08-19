<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
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
    <div class="relative m-4 flex h-full items-center justify-center">
        <img
            alt={data.name}
            src={data.publicUrl}
            decoding="async"
            class="relative max-h-[85%] w-auto rounded-xl shadow-xl shadow-slate-400"
        />
    </div>
</div>
