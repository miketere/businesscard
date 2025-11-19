'use client'

import { signIn } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Chrome, Sparkles, ArrowRight, Shield, Zap, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

export default function SignInPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard'

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      await signIn('google', { callbackUrl })
    } catch (error) {
      toast.error('Failed to sign in. Please try again.')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo and Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-teal-600 to-orange-500 rounded-2xl mb-4 shadow-lg">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome to NexCard</h1>
          <p className="text-gray-600">Sign in to create and manage your digital business cards</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-xl p-8">
          <div className="space-y-6">
            {/* Features List */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-teal-100 rounded-lg">
                  <Zap className="w-4 h-4 text-teal-600" />
                </div>
                <span>Create unlimited digital business cards</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Globe className="w-4 h-4 text-blue-600" />
                </div>
                <span>Share instantly via QR code or link</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Shield className="w-4 h-4 text-orange-600" />
                </div>
                <span>Track views and engagement analytics</span>
              </div>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Continue with</span>
              </div>
            </div>

            {/* Google Sign In Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-gray-300 rounded-xl hover:border-gray-400 hover:shadow-md transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-gray-300 border-t-teal-600 rounded-full animate-spin"></div>
              ) : (
                <>
                  <Chrome className="w-5 h-5 text-gray-700" />
                  <span className="text-gray-700 font-medium">Sign in with Google</span>
                  <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-teal-600 group-hover:translate-x-1 transition-all" />
                </>
              )}
            </button>

            {/* Privacy Note */}
            <p className="text-xs text-center text-gray-500 pt-4">
              By signing in, you agree to our Terms of Service and Privacy Policy.
              <br />
              We&apos;ll only access your email and basic profile information.
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          Need help? <a href="/support" className="text-teal-600 hover:text-teal-700 font-medium">Contact Support</a>
        </p>
      </div>
    </div>
  )
}

