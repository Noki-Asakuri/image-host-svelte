import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/private";

const supabaseUrl = "https://vhkawzjiqyrfmnfllexh.supabase.co";

export const supabase = createClient(supabaseUrl, env.SUPABASE_KEY).storage.from("images");
