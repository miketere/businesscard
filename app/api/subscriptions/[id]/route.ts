import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getSubscription, cancelSubscription, updateSubscription } from '@/lib/paymongo'

// Temporary user ID - replace with actual auth
const TEMP_USER_ID = 'temp-user-id'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
      include: {
        plan: true,
        invoices: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ subscription })
  } catch (error) {
    console.error('Error fetching subscription:', error)
    return NextResponse.json(
      { error: 'Failed to fetch subscription' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { planId } = body

    if (!planId) {
      return NextResponse.json(
        { error: 'Plan ID is required' },
        { status: 400 }
      )
    }

    // Get current subscription
    const currentSubscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
      include: { plan: true },
    })

    if (!currentSubscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Get new plan
    const newPlan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    })

    if (!newPlan || !newPlan.paymongoPlanId) {
      return NextResponse.json(
        { error: 'New plan not found or not configured' },
        { status: 404 }
      )
    }

    // Check if subscription has PayMongo subscription ID
    if (!currentSubscription.paymongoSubscriptionId) {
      return NextResponse.json(
        { error: 'Subscription does not have a PayMongo subscription ID' },
        { status: 400 }
      )
    }

    // Update subscription in PayMongo
    const paymongoSubscription = await updateSubscription(
      currentSubscription.paymongoSubscriptionId,
      newPlan.paymongoPlanId
    )

    // Update subscription in database
    const subscription = await prisma.subscription.update({
      where: { userId: TEMP_USER_ID },
      data: {
        planId: newPlan.id,
        status: paymongoSubscription.attributes.status,
        currentPeriodStart: new Date(
          paymongoSubscription.attributes.current_period_start * 1000
        ),
        currentPeriodEnd: new Date(
          paymongoSubscription.attributes.current_period_end * 1000
        ),
        cancelAtPeriodEnd: paymongoSubscription.attributes.cancel_at_period_end,
        cancelledAt: paymongoSubscription.attributes.cancelled_at
          ? new Date(paymongoSubscription.attributes.cancelled_at * 1000)
          : null,
      },
      include: {
        plan: true,
      },
    })

    return NextResponse.json({ subscription })
  } catch (error: any) {
    console.error('Error updating subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to update subscription' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Get current subscription
    const subscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
    })

    if (!subscription) {
      return NextResponse.json(
        { error: 'Subscription not found' },
        { status: 404 }
      )
    }

    // Check if subscription has PayMongo subscription ID
    if (!subscription.paymongoSubscriptionId) {
      return NextResponse.json(
        { error: 'Subscription does not have a PayMongo subscription ID' },
        { status: 400 }
      )
    }

    // Cancel subscription in PayMongo
    const paymongoSubscription = await cancelSubscription(
      subscription.paymongoSubscriptionId
    )

    // Update subscription in database
    const updatedSubscription = await prisma.subscription.update({
      where: { userId: TEMP_USER_ID },
      data: {
        status: paymongoSubscription.attributes.status,
        cancelAtPeriodEnd: paymongoSubscription.attributes.cancel_at_period_end,
        cancelledAt: paymongoSubscription.attributes.cancelled_at
          ? new Date(paymongoSubscription.attributes.cancelled_at * 1000)
          : new Date(),
      },
      include: {
        plan: true,
      },
    })

    return NextResponse.json({ subscription: updatedSubscription })
  } catch (error: any) {
    console.error('Error cancelling subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to cancel subscription' },
      { status: 500 }
    )
  }
}

