import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPlan } from '@/lib/paymongo'

export async function GET(request: NextRequest) {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      orderBy: { price: 'asc' },
    })

    return NextResponse.json({ plans })
  } catch (error) {
    console.error('Error fetching plans:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription plans' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      name,
      displayName,
      price,
      currency = 'PHP',
      interval,
      maxCards,
      maxContacts,
      hasAnalytics,
      hasIntegrations,
      hasCustomBranding,
    } = body

    if (!name || !displayName || !price || !interval) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create plan in PayMongo
    // Convert interval format if needed: 'month' -> 'monthly', 'year' -> 'yearly'
    const intervalMap: Record<string, string> = {
      month: 'monthly',
      monthly: 'monthly',
      year: 'yearly',
      yearly: 'yearly',
    }
    const paymongoInterval = intervalMap[interval.toLowerCase()] || interval

    const paymongoPlan = await createPlan({
      name: displayName,
      amount: price, // Price in cents
      currency,
      interval: paymongoInterval, // 'monthly' or 'yearly'
    })

    // Create plan in database
    const plan = await prisma.subscriptionPlan.create({
      data: {
        name,
        displayName,
        price,
        currency,
        interval,
        paymongoPlanId: paymongoPlan.id,
        maxCards: maxCards || 1,
        maxContacts: maxContacts || 10,
        hasAnalytics: hasAnalytics || false,
        hasIntegrations: hasIntegrations || false,
        hasCustomBranding: hasCustomBranding || false,
      },
    })

    return NextResponse.json({ plan })
  } catch (error: any) {
    console.error('Error creating plan:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription plan' },
      { status: 500 }
    )
  }
}

