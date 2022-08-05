<script lang="ts">
    interface Info {
        key: string;
        author: string;
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
    };
</script>

<div
    class="flex flex-col items-start h-56 p-10 gap-y-7 rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-900 min-w-max w-80 drop-shadow-lg"
>
    <span class="flex items-center justify-center w-full gap-2 text-2xl ">
        Info
    </span>
    {#if !info}
        <div class="flex items-center justify-center w-full h-[60%]">
            <span>Create a key to see info!</span>
        </div>
    {:else}
        <ul class="flex flex-col w-full gap-y-3">
            <li>
                <div class="flex items-center justify-start gap-2 ">
                    <div class="flex items-center justify-center gap-2">
                        Key: {info.key}
                    </div>
                    <button
                        class="absolute p-3 transition-all duration-500 top-2 right-2 rounded-xl hover:bg-slate-700"
                        on:click={copyFunc}
                    >
                        {#if isCopy}
                            Copied
                        {:else}
                            Copy
                        {/if}
                    </button>
                </div>
            </li>
            <li>
                <div class="flex items-center justify-start gap-2">
                    Author: {info.author}
                </div>
            </li>
        </ul>
    {/if}
</div>
