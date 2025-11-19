import { NextRequest, NextResponse } from 'next/server'
import { trackCardShare } from '@/lib/analytics'
import { z } from 'zod'

const shareSchema = z.object({
  cardId: z.string(),
  method: z.string(),
  sharedWith: z.string().optional(),
  metadata: z.record(z.any()).optional(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = shareSchema.parse(body)

    await trackCardShare(
      validated.cardId,
      validated.method,
      validated.sharedWith,
      validated.metadata
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to track share' }, { status: 500 })
  }
}

