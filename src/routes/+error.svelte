<script lang="ts">
    import { page } from "$app/stores";
</script>

<div class="relative flex h-screen w-screen items-center justify-center">
    <div class="relative m-4 flex h-screen items-center justify-center">
        <div
            class="relative flex w-max flex-col items-start rounded-2xl bg-gradient-to-tl from-slate-800 to-slate-900 p-10 drop-shadow-lg"
        >
            <h2 class="flex w-full items-center justify-center gap-2 pb-6 text-4xl text-red-600">
                Error {$page.status}
            </h2>
            <div class="flex flex-col items-center justify-center gap-y-3">
                <span>{$page.error}</span>
            </div>
        </div>
    </div>
</div>
