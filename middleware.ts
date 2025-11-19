import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Protect dashboard and other authenticated routes
        if (req.nextUrl.pathname.startsWith('/dashboard') ||
            req.nextUrl.pathname.startsWith('/settings') ||
            req.nextUrl.pathname.startsWith('/analytics') ||
            req.nextUrl.pathname.startsWith('/contacts') ||
            req.nextUrl.pathname.startsWith('/create') ||
            req.nextUrl.pathname.startsWith('/edit')) {
          return !!token
        }
        return true
      },
    },
    pages: {
      signIn: '/auth/signin',
    },
  }
)

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
