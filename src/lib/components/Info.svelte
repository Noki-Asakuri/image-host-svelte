<script lang="ts">
    import { toast } from "svelte-french-toast";

    interface Info {
        key: string;
        user: string;
    }

    let isCopy = false;
    export let info: Info | undefined;

    const copyFunc = () => {
        if (!info) return;

        isCopy = true;
        setTimeout(() => {
            isCopy = false;
        }, 2000);

        navigator.clipboard.writeText(info.key);
        toast.success(`Copied key to clipboard!`, {
            duration: 2000,
            position: "top-right",
            style: "border-radius: 10px; background: #262626; color: #E8DCFF",
        });
    };
</script>

<div
    class="relative flex h-56 w-80 min-w-max flex-col items-start gap-y-7 rounded-2xl border border-slate-600 bg-gradient-to-tr from-slate-800 to-slate-900 p-10"
>
    <span class="flex w-full items-center justify-center gap-2 text-2xl ">Info</span>
    {#if !info}
        <div class="flex h-3/5 w-full items-center justify-center">
            <span>Create a key to see info!</span>
        </div>
    {:else}
        <div class="flex w-full flex-col gap-y-3">
            <div class="flex items-center justify-start gap-2 ">
                <span class="flex items-center justify-center gap-2">
                    Key: {info.key}
                </span>
                <button
                    class="absolute top-2 right-2 rounded-xl p-3 transition-all duration-500 hover:bg-slate-700"
                    on:click={copyFunc}
                >
                    {#if isCopy}
                        Copied
                    {:else}
                        Copy
                    {/if}
                </button>
            </div>
            <div class="flex items-center justify-start gap-2">
                User: {info.user}
            </div>
        </div>
    {/if}
</div>
