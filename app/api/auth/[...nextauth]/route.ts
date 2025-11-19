import NextAuth from 'next-auth'
import { authOptions } from '@/lib/auth-config'

// NextAuth v5 beta export pattern
const { handlers } = NextAuth(authOptions)

export const { GET, POST } = handlers
