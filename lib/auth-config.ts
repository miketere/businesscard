import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import { PrismaAdapter } from '@auth/prisma-adapter'
import { prisma } from '@/lib/prisma'

// NextAuth v5 uses AUTH_SECRET instead of NEXTAUTH_SECRET
// Support both for backward compatibility
const authSecret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET

// Validate required environment variables
if (!process.env.GOOGLE_CLIENT_ID) {
  console.error('❌ GOOGLE_CLIENT_ID is missing. Please set it in your environment variables.')
}
if (!process.env.GOOGLE_CLIENT_SECRET) {
  console.error('❌ GOOGLE_CLIENT_SECRET is missing. Please set it in your environment variables.')
}
if (!authSecret) {
  console.error('❌ AUTH_SECRET or NEXTAUTH_SECRET is missing. Please set it in your environment variables.')
}

// Validate and throw early if critical env vars are missing
if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
  throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are required')
}

if (!authSecret) {
  throw new Error('AUTH_SECRET or NEXTAUTH_SECRET is required')
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
      if (session?.user && user) {
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

