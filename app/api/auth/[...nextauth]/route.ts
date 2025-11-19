import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// NextAuth v5 beta handler export pattern
const nextAuth = NextAuth(authOptions)

export const GET = nextAuth.handlers.GET
export const POST = nextAuth.handlers.POST

// Webhook verification test - remove after confirming deployment works
