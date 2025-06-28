'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

type AuthContextType = {
  user: User | null
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
  signInWithFacebook: () => Promise<void>
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
      
      // Redirect after successful auth
      if (event === 'SIGNED_IN') {
        router.push('/')
      }
    })

    return () => subscription.unsubscribe()
  }, [router])

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        console.error('Sign in error:', error)
        throw error
      }
      router.push('/')
    } catch (error) {
      console.error('Sign in failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string) => {
    try {
      setLoading(true)
      
      // Validate inputs
      if (!email || !password) {
        throw new Error('Email and password are required')
      }
      
      if (password.length < 6) {
        throw new Error('Password must be at least 6 characters long')
      }

      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password
      })
      
      if (error) {
        console.error('Sign up error:', error)
        throw error
      }

      // Check if user needs to confirm email
      if (data.user && !data.session) {
        // User created but needs email confirmation
        console.log('Please check your email for confirmation')
      } else if (data.session) {
        router.push('/')
      }
    } catch (error) {
      console.error('Sign up failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error('Sign out error:', error)
        throw error
      }
      router.push('/login')
    } catch (error) {
      console.error('Sign out failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google'
      })
      if (error) {
        console.error('Google sign in error:', error)
        throw error
      }
    } catch (error) {
      console.error('Google sign in failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signInWithFacebook = async () => {
    try {
      setLoading(true)
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook'
      })
      if (error) {
        console.error('Facebook sign in error:', error)
        throw error
      }
    } catch (error) {
      console.error('Facebook sign in failed:', error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      signIn, 
      signUp, 
      signOut, 
      signInWithGoogle, 
      signInWithFacebook,
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}