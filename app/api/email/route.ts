import { NextRequest, NextResponse } from 'next/server'
import { sendCardEmail } from '@/lib/email'
import { trackCardShare } from '@/lib/analytics'
import { z } from 'zod'

const emailSchema = z.object({
  to: z.string().email(),
  cardUrl: z.string().url(),
  cardName: z.string(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = emailSchema.parse(body)

    // Extract card ID from URL
    const cardIdMatch = validated.cardUrl.match(/\/card\/([^\/]+)/)
    const cardId = cardIdMatch ? cardIdMatch[1] : null

    const result = await sendCardEmail(
      validated.to,
      validated.cardName,
      validated.cardUrl
    )

    if (result.success && cardId) {
      await trackCardShare(cardId, 'email', validated.to)
    }

    if (result.success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
  }
}

