import { createClient as createSupabaseClient } from "@supabase/supabase-js"

// Correctly access environment variables using their names
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function createClient() {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase environment variables not found. Using fallback data.")
    // Return a mock client that won't cause errors
    return {
      from: () => ({
        select: () => ({ data: null, error: new Error("Supabase not configured") }),
        insert: () => ({ error: new Error("Supabase not configured") }),
        update: () => ({ error: new Error("Supabase not configured") }),
      }),
      storage: {
        from: () => ({
          upload: () => ({ error: new Error("Supabase not configured") }),
          getPublicUrl: () => ({ data: { publicUrl: "" } }),
        }),
      },
    } as any
  }

  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}
