import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    "https://vhkawzjiqyrfmnfllexh.supabase.co",
    process.env.SUPABASE_KEY as string
).storage.from("images");
