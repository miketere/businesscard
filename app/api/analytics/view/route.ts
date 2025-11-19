import { NextRequest, NextResponse } from 'next/server'
import { trackCardView } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cardId, utmParams } = body

    if (!cardId) {
      return NextResponse.json({ error: 'Card ID is required' }, { status: 400 })
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      null
    const userAgent = request.headers.get('user-agent') || null
    const referrer = request.headers.get('referer') || null

    await trackCardView(cardId, ipAddress, userAgent, referrer, utmParams || null)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error tracking view:', error)
    return NextResponse.json({ error: error.message || 'Failed to track view' }, { status: 500 })
  }
}

