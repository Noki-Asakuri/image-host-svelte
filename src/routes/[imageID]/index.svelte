<script lang="ts">
    interface UploadedImage {
        name: string;
        author: string;
        publicUrl: string;
    }

    export let image: UploadedImage;
</script>

<svelte:head>
    <title>Image Host</title>
    <meta name="title" content="Image Host" />
    <meta name="author" content="Asakuri#8323" />
    <meta name="theme-color" content="#8e7489" />
    <meta name="description" content="Image Host by Asakuri#8323" />

    <meta content={image.name} property="og:title" />
    <meta content={image.author} property="og:site_name" />
    <meta content={image.publicUrl} property="og:image" />
    <meta name="twitter:card" content="summary_large_image" />
</svelte:head>

<div class="relative flex items-center justify-center w-screen h-screen">
    <div class="relative flex justify-center items-center m-2 max-w-[80vw] max-h-[80vh]">
        <!-- svelte-ignore a11y-img-redundant-alt -->
        <img
            alt={image.name}
            src={image.publicUrl}
            class="border shadow-lg h-max w-max shadow-slate-500 filter-none border-slate-600"
        />
    </div>
</div>
