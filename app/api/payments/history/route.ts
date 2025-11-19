import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Temporary user ID - replace with actual auth
const TEMP_USER_ID = 'temp-user-id'

export async function GET(request: NextRequest) {
  try {
    const payments = await prisma.payment.findMany({
      where: { userId: TEMP_USER_ID },
      include: {
        plan: {
          select: {
            id: true,
            name: true,
            displayName: true,
            price: true,
            currency: true,
            interval: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ payments })
  } catch (error) {
    console.error('Error fetching payment history:', error)
    return NextResponse.json(
      { error: 'Failed to fetch payment history' },
      { status: 500 }
    )
  }
}

