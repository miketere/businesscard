import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error('❌ GOOGLE_CLIENT_ID is missing. Please set it in your environment variables.')
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ GOOGLE_CLIENT_SECRET is missing. Please set it in your environment variables.')
}
if (!process.env.NEXTAUTH_SECRET) {
  console.error('❌ NEXTAUTH_SECRET is missing. Please set it in your environment variables.')
}
// NEXTAUTH_URL is optional in NextAuth v5 - it auto-detects from request headers
// Only log a warning, don't throw error
if (!process.env.NEXTAUTH_URL) {
  console.warn('⚠️ NEXTAUTH_URL is not set. NextAuth v5 will auto-detect from request headers.')
}

// Validate and throw early if critical env vars are missing
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required')
}

if (!process.env.NEXTAUTH_SECRET) {
  throw new Error('NEXTAUTH_SECRET is required')
}

// NEXTAUTH_URL is optional in NextAuth v5 - it auto-detects from request headers
// Only validate in production if explicitly needed

export const authOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }: any) {
      // For database sessions, user is passed in the session callback
      if (session.user && user) {
        session.user.id = user.id
      }
      return session
    },
  },
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  session: {
    strategy: 'database' as const,
  },
  // Trust host header in production (Vercel)
  trustHost: true,
}

