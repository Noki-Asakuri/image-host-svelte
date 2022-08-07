// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    // interface Locals {}
    // interface Platform {}
    interface PrivateEnv {
        // Supabase
        SUPABASE_KEY: string;
        SUPABASE_URL: string;

        // Login password
        PASSWORD: string;
    }
    // interface PublicEnv {}
    // interface Session {}
    // interface Stuff {}
}
