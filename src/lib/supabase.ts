import { createBrowserClient } from '@supabase/ssr'

const SUPABASE_URL = 'https://grofkxumistjmnoxoijc.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdyb2ZreHVtaXN0am1ub3hvaWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzk3NjQ5MTQsImV4cCI6MjA1NTM0MDkxNH0.hVnCoCrHxlb9e7c1e5wvn0YJSiTPofhTw1oSLtV2HMI'

export const supabase = createBrowserClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)
