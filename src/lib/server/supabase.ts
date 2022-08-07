import { createClient } from "@supabase/supabase-js";
import { env } from "$env/dynamic/private";

const supabaseUrl = "https://etlzhwvhgxauolvcnmji.supabase.co";

export const supabase = createClient(supabaseUrl, env.SUPABASE_KEY).storage.from("images");
