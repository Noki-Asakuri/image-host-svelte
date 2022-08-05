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
    <meta name="author" content="Asakuri#8323" />
    <meta name="theme-color" content="#8e7489" />
    <meta name="description" content="Image Host by Asakuri#8323" />

    <meta content={image.name} property="og:title" />
    <meta content={image.author} property="og:site_name" />
    <meta content={image.publicUrl} property="og:image" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative flex items-center justify-center w-screen h-screen">
    <div class="relative flex justify-center items-center m-4 h-screen">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
            alt={image.name}
            src={image.publicUrl}
            class="relative rounded-2xl shadow-slate-400 shadow-xl h-5/6 w-auto"
        />
    </div>
</div>
