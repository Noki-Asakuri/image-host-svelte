<script lang="ts" context="module">
    export const prerender = true;
</script>

<script lang="ts">
    interface UploadedImage {
        name: string;
        author: string;
        publicUrl: string;
    }

    export let image: UploadedImage;
</script>

<svelte:head>
    <title>{image.name}</title>
    <meta name="title" content={image.name} />

    <meta content={image.name} property="og:title" />
    <meta content={image.author} property="og:site_name" />
    <meta content={image.publicUrl} property="og:image" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative flex items-center justify-center w-screen h-screen">
    <div class="relative flex items-center justify-center h-screen m-4">
        <img
            alt={image.name}
            src={image.publicUrl}
            loading="lazy"
            decoding="async"
            data-nimg="future"
            class="relative w-auto shadow-xl rounded-2xl shadow-slate-400 max-h-[85%]"
        />
    </div>
</div>
