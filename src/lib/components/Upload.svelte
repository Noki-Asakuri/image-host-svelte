<script lang="ts">
    import SpinningIcon from "$lib/components/SpinningIcon.svelte";
    import type { InferMutationInput } from "$lib/utils/trpc";

    let author = "";
    let password = "";

    export let isLoading: boolean;
    export let createKey: ({ author, password }: InferMutationInput<"key.create">) => void;
</script>

<form
    class="relative flex flex-col items-start p-10 h-max gap-y-6 max-w-max rounded-2xl bg-gradient-to-tl from-slate-800 to-slate-900 min-w-max w-80 drop-shadow-lg"
    on:submit|preventDefault={() => createKey({ author, password })}
>
    <span class="flex items-center justify-center w-full gap-2 text-2xl"> Create new key </span>
    <div class="flex gap-2 justify-between items-center w-full">
        <label for="author" class="flex items-center justify-center gap-2"> Author: </label>
        <input
            type="text"
            name="author"
            id="author"
            placeholder="Enter discord name"
            class="px-4 py-2 bg-slate-700 rounded-2xl focus:outline-none"
            bind:value={author}
        />
    </div>
    <div class="flex gap-2 justify-between items-center w-full">
        <label for="password" class="flex items-center justify-center gap-2"> Password: </label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            class="px-4 py-2 bg-slate-700 rounded-2xl focus:outline-none"
            bind:value={password}
        />
    </div>
    <button class="w-full h-10 py-2 bg-slate-700 rounded-2xl drop-shadow-lg" type="submit">
        {#if !isLoading}
            Create
        {:else}
            <div class="flex items-center justify-center w-full">
                <SpinningIcon />
            </div>
        {/if}
    </button>
</form>
