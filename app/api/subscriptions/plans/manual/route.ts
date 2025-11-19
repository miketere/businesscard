import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Manually set PayMongo plan IDs for plans
 * Use this if you've created plans manually in PayMongo dashboard
 * POST body: { planId: string, paymongoPlanId: string }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, paymongoPlanId } = body

    if (!planId || !paymongoPlanId) {
      return NextResponse.json(
        { error: 'Plan ID and PayMongo Plan ID are required' },
        { status: 400 }
      )
    }

    // Update plan with PayMongo plan ID
    const plan = await prisma.subscriptionPlan.update({
      where: { id: planId },
      data: { paymongoPlanId },
    })

    return NextResponse.json({
      message: 'Plan updated successfully',
      plan: {
        id: plan.id,
        name: plan.displayName,
        paymongoPlanId: plan.paymongoPlanId,
      },
    })
  } catch (error: any) {
    console.error('Error updating plan:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update plan' },
      { status: 500 }
    )
  }
}

/**
 * GET: List all plans and their PayMongo status
 */
export async function GET(request: NextRequest) {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      select: {
        id: true,
        name: true,
        displayName: true,
        price: true,
        currency: true,
        interval: true,
        paymongoPlanId: true,
      },
      orderBy: { price: 'asc' },
    })

    return NextResponse.json({
      plans: plans.map((p) => ({
        id: p.id,
        name: p.displayName,
        price: p.price,
        currency: p.currency,
        interval: p.interval,
        paymongoPlanId: p.paymongoPlanId,
        status: p.paymongoPlanId ? 'configured' : 'not_configured',
      })),
    })
  } catch (error: any) {
    console.error('Error fetching plans:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch plans' },
      { status: 500 }
    )
  }
}

