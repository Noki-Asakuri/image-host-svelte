<script lang="ts">
    import SpinningIcon from "$lib/components/SpinningIcon.svelte";
    import type { InferMutationInput } from "$lib/utils/trpc";

    let user = "";
    let password = "";

    export let isLoading: boolean;
    export let createKey: ({ user, password }: InferMutationInput<"key.create">) => void;
</script>

<form
    class="relative flex flex-col items-start p-10 border h-max gap-y-6 max-w-max rounded-2xl bg-gradient-to-tl from-slate-800 to-slate-900 min-w-max w-80 border-slate-600"
    on:submit|preventDefault={() => createKey({ user, password })}
>
    <span class="flex items-center justify-center w-full gap-2 text-2xl"> Create new key </span>
    <div class="flex items-center justify-between w-full gap-2">
        <label for="user" class="flex items-center justify-center gap-2"> User: </label>
        <input
            type="text"
            name="user"
            id="user"
            placeholder="Enter discord name"
            class="px-4 py-2 border bg-slate-700 rounded-2xl focus:outline-none border-slate-700 focus:border-blue-500 placeholder:text-sm"
            bind:value={user}
        />
    </div>
    <div class="flex items-center justify-between w-full gap-2">
        <label for="password" class="flex items-center justify-center gap-2"> Password: </label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            class="px-4 py-2 border bg-slate-700 rounded-2xl focus:outline-none border-slate-700 focus:border-blue-500 placeholder:text-sm"
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
