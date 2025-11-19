import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    
    // Delete all possible session cookies
    const cookieNames = [
      'next-auth.session-token',
      '__Secure-next-auth.session-token',
      'authjs.session-token',
      '__Secure-authjs.session-token',
    ]

    const response = NextResponse.json({ success: true })

    // Delete all session cookies
    cookieNames.forEach((cookieName) => {
      response.cookies.delete(cookieName)
      // Also try deleting with different path/domain combinations
      response.cookies.set(cookieName, '', {
        expires: new Date(0),
        path: '/',
      })
    })

    return response
  } catch (error) {
    console.error('Error signing out:', error)
    return NextResponse.json(
      { error: 'Failed to sign out' },
      { status: 500 }
    )
  }
}

