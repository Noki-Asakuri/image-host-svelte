import { SupabaseStorageClient } from "@supabase/storage-js";
import { SUPABASE_KEY, SUPABASE_URL } from "$env/static/private";

export const supabase = new SupabaseStorageClient(`${SUPABASE_URL.replace(/\/$/, "")}/storage/v1`, {
    apikey: SUPABASE_KEY,
    Authorization: `Bearer ${SUPABASE_KEY}`,
}).from("images");
