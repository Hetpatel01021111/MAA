import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
  }

  // Validate URL format and check for placeholder values
  if (supabaseUrl.includes('your-project-id') || supabaseUrl.includes('your_supabase_project_url_here')) {
    throw new Error('Please replace the placeholder Supabase URL with your actual project URL from the Supabase dashboard.')
  }

  if (supabaseAnonKey.includes('your-anon-key-here') || supabaseAnonKey.includes('your_supabase_anon_key_here')) {
    throw new Error('Please replace the placeholder Supabase anon key with your actual anon key from the Supabase dashboard.')
  }

  try {
    new URL(supabaseUrl)
  } catch (error) {
    throw new Error(`Invalid Supabase URL format: ${supabaseUrl}. Please check your NEXT_PUBLIC_SUPABASE_URL in .env.local`)
  }

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}