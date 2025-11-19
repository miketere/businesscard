import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

// Note: We use getSession() for database sessions instead of NextAuth's auth()
// This avoids creating multiple NextAuth instances which can cause constructor errors

// Custom getSession for database sessions (manual implementation)
export async function getSession() {
  try {
    // For NextAuth v5 with database sessions, we need to get the session token from cookies
    // NextAuth v5 may use different cookie names depending on environment
    const cookieStore = await cookies()
    const sessionToken = 
      cookieStore.get('next-auth.session-token')?.value ||
      cookieStore.get('__Secure-next-auth.session-token')?.value ||
      cookieStore.get('authjs.session-token')?.value ||
      cookieStore.get('__Secure-authjs.session-token')?.value

    if (!sessionToken) {
      return null
    }

    // Get session from database
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: {
        user: true,
      },
    })

    if (!session || new Date(session.expires) < new Date()) {
      return null
    }

    return {
      user: {
        id: session.userId,
        email: session.user.email,
        name: session.user.name,
        image: session.user.image,
      },
      expires: session.expires.toISOString(),
    }
  } catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

