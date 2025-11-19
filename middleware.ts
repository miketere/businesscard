import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  // NextAuth v5 uses AUTH_SECRET, but getToken still uses NEXTAUTH_SECRET
  const secret = process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET
  const token = await getToken({ 
    req: request,
    secret 
  })
  const { pathname } = request.nextUrl

  // Protect dashboard and other authenticated routes
  const protectedPaths = ['/dashboard', '/settings', '/analytics', '/contacts', '/create', '/edit']
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtected && !token) {
    const signInUrl = new URL('/auth/signin', request.url)
    signInUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/settings/:path*',
    '/analytics/:path*',
    '/contacts/:path*',
    '/create/:path*',
    '/edit/:path*',
  ],
}
