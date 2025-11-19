import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protect dashboard and other authenticated routes
  const protectedPaths = ['/dashboard', '/settings', '/analytics', '/contacts', '/create', '/edit']
  const isProtected = protectedPaths.some(path => pathname.startsWith(path))

  if (isProtected) {
    // Check for session cookie (database sessions)
    // NextAuth v5 uses different cookie names depending on environment
    const sessionToken = 
      request.cookies.get('next-auth.session-token')?.value ||
      request.cookies.get('__Secure-next-auth.session-token')?.value ||
      request.cookies.get('authjs.session-token')?.value ||
      request.cookies.get('__Secure-authjs.session-token')?.value

    if (!sessionToken) {
      const signInUrl = new URL('/auth/signin', request.url)
      signInUrl.searchParams.set('callbackUrl', pathname)
      return NextResponse.redirect(signInUrl)
    }
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
