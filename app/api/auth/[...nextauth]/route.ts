import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// Create NextAuth instance and export handlers
// This is the only place NextAuth should be instantiated for the route handler
const handler = NextAuth(authOptions)

export const GET = handler.handlers.GET
export const POST = handler.handlers.POST
