import { NextRequest, NextResponse } from 'next/server'
import { trackCardSave } from '@/lib/analytics'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { cardId, method } = body

    if (!cardId) {
      return NextResponse.json({ error: 'Card ID is required' }, { status: 400 })
    }

    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      null
    const userAgent = request.headers.get('user-agent') || null

    await trackCardSave(cardId, method || 'vcard', ipAddress, userAgent)

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('Error tracking save:', error)
    return NextResponse.json({ error: error.message || 'Failed to track save' }, { status: 500 })
  }
}

