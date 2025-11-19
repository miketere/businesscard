import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth-config'
import { NextResponse } from 'next/server'

let handler: any

try {
  handler = NextAuth(authOptions) as any
} catch (error) {
  console.error('❌ Failed to initialize NextAuth:', error)
  // Create a fallback handler that returns error
  handler = {
    GET: async () => {
      return NextResponse.json(
        { 
          error: 'Authentication configuration error',
          message: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    },
    POST: async () => {
      return NextResponse.json(
        { 
          error: 'Authentication configuration error',
          message: error instanceof Error ? error.message : 'Unknown error'
        },
        { status: 500 }
      )
    }
  }
}

export { handler as GET, handler as POST }
