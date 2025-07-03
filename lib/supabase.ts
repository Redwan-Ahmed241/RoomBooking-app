import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""

function createErrorProxy() {
  return new Proxy(
    {},
    {
      get() {
        throw new Error(
          [
            "[Supabase] Environment variables missing.",
            "Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY",
            "to your .env or Vercel project settings.",
          ].join(" "),
        )
      },
    },
  ) as any
}

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : createErrorProxy()

// Helpful warning so you notice during development
if (!supabaseUrl || !supabaseKey) {
  console.warn(
    "[Supabase] Using fallback client because required env-vars are not set.",
    "All database calls will throw until you configure them.",
  )
}
