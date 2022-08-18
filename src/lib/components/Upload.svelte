<script lang="ts">
    import SpinningIcon from "$lib/components/SpinningIcon.svelte";
    import type { InferMutationInput } from "$lib/utils/trpc";

    let user = "";
    let password = "";

    export let isLoading: boolean;
    export let createKey: ({ user, password }: InferMutationInput<"key.create">) => void;
</script>

<form
    class="relative flex h-max w-80 min-w-max max-w-max flex-col items-start gap-y-6 rounded-2xl border border-slate-600 bg-gradient-to-tl from-slate-800 to-slate-900 p-10"
    on:submit|preventDefault={() => createKey({ user, password })}
>
    <span class="flex w-full items-center justify-center gap-2 text-2xl"> Create new key </span>
    <div class="flex w-full items-center justify-between gap-2">
        <label for="user" class="flex items-center justify-center gap-2"> User: </label>
        <input
            type="text"
            name="user"
            id="user"
            placeholder="Enter discord name"
            class="rounded-2xl border border-slate-700 bg-slate-700 px-4 py-2 placeholder:text-sm focus:border-blue-500 focus:outline-none"
            bind:value={user}
        />
    </div>
    <div class="flex w-full items-center justify-between gap-2">
        <label for="password" class="flex items-center justify-center gap-2"> Password: </label>
        <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter password"
            class="rounded-2xl border border-slate-700 bg-slate-700 px-4 py-2 placeholder:text-sm focus:border-blue-500 focus:outline-none"
            bind:value={password}
        />
    </div>
    <button class="h-10 w-full rounded-2xl bg-slate-700 py-2 drop-shadow-lg" type="submit">
        {#if !isLoading}
            Create
        {:else}
            <div class="flex w-full items-center justify-center">
                <SpinningIcon />
            </div>
        {/if}
    </button>
</form>
