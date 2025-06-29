import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env.local file.')
}

// Validate URL format
if (supabaseUrl.includes('your-project-id') || supabaseUrl.includes('your_supabase_project_url_here')) {
  throw new Error('Please replace the placeholder Supabase URL with your actual project URL from the Supabase dashboard.')
}

// Validate anon key format
if (supabaseAnonKey.includes('your-anon-key-here') || supabaseAnonKey.includes('your_supabase_anon_key_here')) {
  throw new Error('Please replace the placeholder Supabase anon key with your actual anon key from the Supabase dashboard.')
}

try {
  new URL(supabaseUrl)
} catch (error) {
  throw new Error(`Invalid Supabase URL format: ${supabaseUrl}. Please check your NEXT_PUBLIC_SUPABASE_URL in .env.local`)
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})