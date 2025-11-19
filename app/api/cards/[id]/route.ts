import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
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

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const card = await prisma.card.findUnique({
      where: { id: params.id },
    })

    if (!card) {
      return NextResponse.json({ error: 'Card not found' }, { status: 404 })
    }

    return NextResponse.json(card)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch card' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const validated = cardSchema.parse(body)

    const card = await prisma.card.update({
      where: { id: params.id },
      data: {
        ...validated,
        socialLinks: validated.socialLinks || null,
      },
    })

    return NextResponse.json({ id: card.id, success: true })
  } catch (error: any) {
    console.error('Error updating card:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ') }, { status: 400 })
    }
    return NextResponse.json({ error: error.message || 'Failed to update card' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.card.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete card' }, { status: 500 })
  }
}

