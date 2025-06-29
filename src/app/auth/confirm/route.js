import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') ?? '/'
  
  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      console.error('Auth confirmation error:', error)
      // Redirect to login with error message
      return NextResponse.redirect(`${requestUrl.origin}/login?error=confirmation_failed`)
    }
  }

  // Redirect to the next URL or home page
  return NextResponse.redirect(`${requestUrl.origin}${next}`)
}