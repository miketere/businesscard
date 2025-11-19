import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth-config'

const nextAuth = NextAuth(authOptions)

export const GET = nextAuth.handlers.GET
export const POST = nextAuth.handlers.POST
