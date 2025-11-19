import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { processOneTimePayment, createCustomer } from '@/lib/paymongo'

// Temporary user ID - replace with actual auth
const TEMP_USER_ID = 'temp-user-id'

// Plan tier order (higher number = higher tier)
const PLAN_TIERS: Record<string, number> = {
  free: 0,
  basic: 1,
  pro: 2,
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { planId, paymentMethodId, email, firstName, lastName, phone } = body

    if (!planId || !paymentMethodId) {
      return NextResponse.json(
        { error: 'Plan ID and payment method ID are required' },
        { status: 400 }
      )
    }

    // Get current subscription
    const currentSubscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
      include: { plan: true },
    })

    if (!currentSubscription || currentSubscription.status !== 'active') {
      return NextResponse.json(
        { error: 'No active subscription found. Please purchase a plan first.' },
        { status: 400 }
      )
    }

    // Get the new plan
    const newPlan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    })

    if (!newPlan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    // Validate it's an upgrade (not downgrade)
    const currentTier = PLAN_TIERS[currentSubscription.plan.name.toLowerCase()] || 0
    const newTier = PLAN_TIERS[newPlan.name.toLowerCase()] || 0

    if (newTier <= currentTier) {
      return NextResponse.json(
        { 
          error: 'Downgrades are not allowed. You can only upgrade to a higher plan.',
          currentPlan: currentSubscription.plan.displayName,
          requestedPlan: newPlan.displayName,
        },
        { status: 400 }
      )
    }

    // Check if already on this plan or higher
    if (currentSubscription.planId === planId) {
      return NextResponse.json(
        { error: 'You are already on this plan.' },
        { status: 400 }
      )
    }

    // Create customer (optional, for records)
    let customerId: string | undefined
    try {
      const customer = await createCustomer({
        email: email || undefined,
        phone: phone || undefined,
        firstName: firstName || undefined,
        lastName: lastName || undefined,
      })
      customerId = customer.id
    } catch (error) {
      console.warn('Customer creation failed, continuing without customer:', error)
    }

    // Process payment for full new plan price (Option 3: Full upgrade, reset expiration)
    const paymentIntent = await processOneTimePayment({
      amount: newPlan.price,
      currency: newPlan.currency,
      paymentMethodId,
      description: `Upgrade to ${newPlan.displayName} - 1 Year Access`,
    })

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: `Payment failed: ${paymentIntent.status}` },
        { status: 400 }
      )
    }

    // Calculate new expiration date (1 year from now - reset expiration)
    const expiresAt = new Date()
    expiresAt.setFullYear(expiresAt.getFullYear() + 1)

    // Update subscription in database
    const subscription = await prisma.subscription.update({
      where: { userId: TEMP_USER_ID },
      data: {
        planId: newPlan.id,
        paymongoPaymentIntentId: paymentIntent.id,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: expiresAt,
        expiresAt: expiresAt,
        cancelAtPeriodEnd: false,
        cancelledAt: null,
      },
      include: {
        plan: true,
      },
    })

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: TEMP_USER_ID,
        subscriptionId: subscription.id,
        planId: newPlan.id,
        paymongoPaymentIntentId: paymentIntent.id,
        amount: newPlan.price,
        currency: newPlan.currency,
        status: paymentIntent.status,
        paymentMethodType: 'card',
        description: `Upgrade to ${newPlan.displayName} - 1 Year Access`,
        paidAt: paymentIntent.status === 'succeeded' ? new Date() : null,
      },
    })

    return NextResponse.json({
      subscription,
      message: `Successfully upgraded to ${newPlan.displayName}! Your access has been extended for 1 year.`,
      upgradeFrom: currentSubscription.plan.displayName,
      upgradeTo: newPlan.displayName,
    })
  } catch (error: any) {
    console.error('Error processing upgrade:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process upgrade' },
      { status: 500 }
    )
  }
}

