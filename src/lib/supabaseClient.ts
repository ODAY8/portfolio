import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

/**
 * The Problems Solved page is the only thing that needs Supabase, so a
 * missing/misconfigured env var must not crash the rest of the site --
 * `supabase` is null in that case, and `getSolvedProblems()` surfaces a
 * clear error the page can render instead of throwing at import time.
 */
export const supabase: SupabaseClient | null = url && publishableKey ? createClient(url, publishableKey) : null
