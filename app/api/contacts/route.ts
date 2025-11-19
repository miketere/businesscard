import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email().optional().or(z.literal('')),
  phone: z.string().optional(),
  company: z.string().optional(),
  title: z.string().optional(),
  notes: z.string().optional(),
  location: z.string().optional(),
})

const TEMP_USER_ID = 'temp-user-id'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = contactSchema.parse(body)

    const contact = await prisma.contact.create({
      data: {
        userId: TEMP_USER_ID,
        ...validated,
        email: validated.email || null,
      },
    })

    return NextResponse.json({ id: contact.id, success: true })
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to create contact' }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const contacts = await prisma.contact.findMany({
      where: { userId: TEMP_USER_ID },
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(contacts)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch contacts' }, { status: 500 })
  }
}

