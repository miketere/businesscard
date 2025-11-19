import { auth } from '@/lib/auth-config'

// Re-export auth function for convenience
export { auth as getSession }

export async function getCurrentUser() {
  const session = await auth()
  return session?.user
}

