'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/auth-context'

export default function Login() {
  const { signIn, signInWithGoogle, signInWithFacebook, loading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(formData.email, formData.password);
      // Redirect will be handled by the auth state change in AuthContext
    } catch (error) {
      alert(error instanceof Error ? error.message : 'An error occurred during login');
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.id]: value,
    });
  };

  return (
    <div className="min-h-screen w-full relative flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1614849963640-9cc74b2a826f?q=80&w=3687&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Background"
          fill
          className="object-cover brightness-50"
          priority
        />
      </div>

      {/* Left Section */}
      <div className="w-1/2 pl-12 text-white relative z-10 animate-fade-in">
        <h1 className="font-playfair text-5xl font-bold mb-5 uppercase leading-tight">
          Welcome Back to ShikshaMitra
        </h1>
        <p className="text-lg text-gray-200 max-w-[80%] mt-8">
          Log in to access your account and manage your Education with ease. Experience the future with ShikshaMitra's smart solutions.
        </p>

        <ul className="mt-8 space-y-4">
          {[
            'Real-time Education tracking',
            'Smart analytics dashboard',
            'Instant Education',
            'Secure Learning processing',
            '24/7 Student support access',
          ].map((point, index) => (
            <li 
              key={index}
              className="flex items-center text-gray-200 animate-point-slide-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <span className="mr-3 text-xl">•</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 flex justify-center items-center relative z-10">
        <form 
          onSubmit={handleSubmit}
          className="w-[400px] p-8 glass-morphism animate-fade-in"
          style={{ animationDelay: '0.5s' }}
        >
          <h3 className="text-3xl font-semibold text-[#2d5a4e] mb-8 text-center relative">
            Login
            <span className="absolute left-1/2 bottom-[-10px] transform -translate-x-1/2 w-12 h-[3px] bg-[#2d5a4e] rounded"></span>
          </h3>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
  type="email"    
  id="email"
  placeholder="Enter your email"
  value={formData.email}
  onChange={handleChange}
  required
  className="w-full px-3 py-2 bg-gray-50 text-black border border-gray-300 rounded-lg focus:border-[#2d5a4e] focus:outline-none focus:ring-1 focus:ring-[#2d5a4e] transition-all"
/>

          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-50 text-black border border-gray-300 rounded-lg focus:border-[#2d5a4e] focus:outline-none focus:ring-1 focus:ring-[#2d5a4e] transition-all"
            />
          </div>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-[#2d5a4e] focus:ring-[#2d5a4e] border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-700">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-[#2d5a4e] hover:underline">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#2d5a4e] text-white font-semibold rounded-lg hover:bg-[#3b7f6a] transition-colors"
          >
            Login
          </button>

          {/* Social Login Buttons */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button 
                onClick={signInWithGoogle}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all transform hover:scale-105"
                disabled={loading}
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z" fill="#4285F4"/>
                  <path d="M12.24 24.0008C15.4764 24.0008 18.2058 22.9382 20.1944 21.1039L16.3274 18.1055C15.2516 18.8375 13.8626 19.252 12.24 19.252C9.07106 19.252 6.37065 17.1399 5.4152 14.3003H1.39697V17.3912C3.37359 21.4434 7.50264 24.0008 12.24 24.0008Z" fill="#34A853"/>
                  <path d="M5.41517 14.3003C5.17688 13.5681 5.04375 12.7954 5.04375 12.0001C5.04375 11.2048 5.17688 10.4321 5.41517 9.69993V6.60907H1.39694C0.556938 8.25848 0.0939941 10.0793 0.0939941 12.0001C0.0939941 13.9209 0.556938 15.7417 1.39694 17.3911L5.41517 14.3003Z" fill="#FBBC05"/>
                  <path d="M12.24 4.74966C14.0291 4.74966 15.6265 5.36062 16.8902 6.54807L20.3189 3.12132C18.2087 1.18977 15.4763 0 12.24 0C7.50264 0 3.37359 2.55733 1.39697 6.60956L5.41521 9.70042C6.37066 6.86077 9.07106 4.74966 12.24 4.74966Z" fill="#EA4335"/>
                </svg>
                <span className="ml-2">Google</span>
              </button>

              <button
                onClick={signInWithFacebook}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all transform hover:scale-105"
                disabled={loading}
              >
                <svg className="w-5 h-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                <span className="ml-2">Facebook</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link href="/signup" className="text-[#2d5a4e] hover:underline">
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
