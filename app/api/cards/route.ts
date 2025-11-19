import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { canCreateCard } from '@/lib/subscription'
import { z } from 'zod'

const cardSchema = z.object({
  name: z.string().min(1),
  title: z.string().optional(),
  company: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  website: z.string().optional().refine((val) => !val || val === '' || z.string().url().safeParse(val).success, {
    message: 'Website must be a valid URL',
  }),
  address: z.string().optional(),
  bio: z.string().optional(),
  profileImage: z.string().optional(),
  logo: z.string().optional(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
  template: z.string(),
  socialLinks: z.string().optional(),
})

const TEMP_USER_ID = 'temp-user-id'
const TEMP_USER_EMAIL = 'temp@user.com'

export async function POST(request: NextRequest) {
  try {
    // Check if user can create more cards
    const canCreate = await canCreateCard()
    if (!canCreate.allowed) {
      return NextResponse.json(
        { error: canCreate.reason || 'Card limit reached' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = cardSchema.parse(body)

    // Ensure the temp user exists
    const user = await prisma.user.upsert({
      where: { id: TEMP_USER_ID },
      update: {},
      create: {
        id: TEMP_USER_ID,
        email: TEMP_USER_EMAIL,
        password: 'temp-password', // In production, this should be hashed
        name: 'Temp User',
      },
    })

    const card = await prisma.card.create({
      data: {
        userId: user.id,
        ...validated,
        socialLinks: validated.socialLinks || null,
      },
    })

    return NextResponse.json({ id: card.id, success: true })
  } catch (error: any) {
    console.error('Error creating card:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') }, { status: 400 })
    }
    return NextResponse.json({ error: error.message || 'Failed to create card' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const cards = await prisma.card.findMany({
      where: { userId: TEMP_USER_ID },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(cards)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 })
  }
}

