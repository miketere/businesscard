import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createPlan } from '@/lib/paymongo'

/**
 * Sync subscription plans with PayMongo
 * Creates PayMongo plans for database plans that don't have paymongoPlanId
 * GET: Check sync status
 * POST: Sync plans with PayMongo
 */
export async function GET(request: NextRequest) {
  try {
    const plans = await prisma.subscriptionPlan.findMany({
      where: {
        price: {
          gt: 0, // Only check paid plans
        },
      },
      select: {
        id: true,
        name: true,
        displayName: true,
        price: true,
        currency: true,
        interval: true,
        paymongoPlanId: true,
      },
    })

    const needsSync = plans.filter((p) => !p.paymongoPlanId)
    const synced = plans.filter((p) => p.paymongoPlanId)

    return NextResponse.json({
      total: plans.length,
      synced: synced.length,
      needsSync: needsSync.length,
      plans: plans.map((p) => ({
        id: p.id,
        name: p.displayName,
        price: p.price,
        currency: p.currency,
        interval: p.interval,
        paymongoPlanId: p.paymongoPlanId,
        status: p.paymongoPlanId ? 'synced' : 'needs_sync',
      })),
    })
  } catch (error: any) {
    console.error('Error checking sync status:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to check sync status' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get all plans without PayMongo plan IDs (excluding free plan)
    const plans = await prisma.subscriptionPlan.findMany({
      where: {
        paymongoPlanId: null,
        price: {
          gt: 0, // Only sync paid plans
        },
      },
    })

    if (plans.length === 0) {
      return NextResponse.json({
        message: 'All plans are already synced with PayMongo',
        synced: [],
      })
    }

    const synced: Array<{ planId: string; planName: string; paymongoPlanId: string | null }> = []
    const errors: Array<{ planId: string; planName: string; error: string }> = []

    for (const plan of plans) {
      try {
        // Convert interval format if needed: 'month' -> 'monthly', 'year' -> 'yearly'
        const intervalMap: Record<string, string> = {
          month: 'monthly',
          monthly: 'monthly',
          year: 'yearly',
          yearly: 'yearly',
        }
        const paymongoInterval = intervalMap[plan.interval.toLowerCase()] || plan.interval

        // Create plan in PayMongo
        const paymongoPlan = await createPlan({
          name: plan.displayName,
          amount: plan.price,
          currency: plan.currency,
          interval: paymongoInterval,
        })

        // Update database plan with PayMongo plan ID
        await prisma.subscriptionPlan.update({
          where: { id: plan.id },
          data: { paymongoPlanId: paymongoPlan.id },
        })

        synced.push({
          planId: plan.id,
          planName: plan.displayName,
          paymongoPlanId: paymongoPlan.id,
        })
      } catch (error: any) {
        console.error(`Error syncing plan ${plan.displayName}:`, error)
        errors.push({
          planId: plan.id,
          planName: plan.displayName,
          error: error.message || 'Unknown error',
        })
      }
    }

    return NextResponse.json({
      message: `Synced ${synced.length} plan(s) with PayMongo`,
      synced,
      errors: errors.length > 0 ? errors : undefined,
    })
  } catch (error: any) {
    console.error('Error syncing plans:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to sync plans with PayMongo' },
      { status: 500 }
    )
  }
}
