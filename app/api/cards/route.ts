import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { canCreateCard } from '@/lib/subscription'
import { getSession } from '@/lib/auth'
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

export async function POST(request: NextRequest) {
  try {
    const session = await getSession()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    if (!session.user.id) {
      return NextResponse.json({ error: 'User ID not found' }, { status: 401 })
    }

    const userId = session.user.id

    // Check if user can create more cards
    const canCreate = await canCreateCard(userId)
    if (!canCreate.allowed) {
      return NextResponse.json(
        { error: canCreate.reason || 'Card limit reached' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const validated = cardSchema.parse(body)

    const card = await prisma.card.create({
      data: {
        userId,
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
    const session = await getSession()
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const userId = session.user.id

    const cards = await prisma.card.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(cards)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch cards' }, { status: 500 })
  }
}

