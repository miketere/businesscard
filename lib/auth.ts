import { authOptions } from '@/lib/auth-config'
import { prisma } from '@/lib/prisma'
import { cookies } from 'next/headers'

export async function getSession() {
  try {
    // For NextAuth v5 with database sessions, we need to get the session token from cookies
    const cookieStore = await cookies()
    const sessionToken = cookieStore.get('next-auth.session-token')?.value || 
                         cookieStore.get('__Secure-next-auth.session-token')?.value

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

