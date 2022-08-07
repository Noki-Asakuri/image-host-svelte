<script>
    import { ogImageUrl } from "$lib/store/image";
</script>

<svelte:head>
    <title>Image Host</title>
    <meta name="title" content="Image Host" />

    <meta property="og:title" content="Image Host" />
    <meta property="og:site_name" content="Asakuri#8323" />
    <meta property="og:description" content="A image host made by Asakuri#8323 with svelte." />
    <meta property="og:image" content={$ogImageUrl} />
</svelte:head>

<div class="w-screen h-screen flex justify-center items-center">
    <div class="text-3xl">Make a POST request to upload image!</div>
</div>
