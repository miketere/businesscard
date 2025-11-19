import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { processOneTimePayment, createCustomer } from '@/lib/paymongo'

// Temporary user ID - replace with actual auth
const TEMP_USER_ID = 'temp-user-id'

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

    // Get the plan
    const plan = await prisma.subscriptionPlan.findUnique({
      where: { id: planId },
    })

    if (!plan) {
      return NextResponse.json(
        { error: 'Plan not found' },
        { status: 404 }
      )
    }

    // Check if user already has an active subscription (for renewal or upgrade)
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
      include: { plan: true },
    })

    // Plan tier order (higher number = higher tier)
    const PLAN_TIERS: Record<string, number> = {
      free: 0,
      basic: 1,
      pro: 2,
    }

    const isRenewal = existingSubscription && existingSubscription.status === 'active' && 
                      existingSubscription.planId === planId
    const existingExpiresAt = existingSubscription?.expiresAt || existingSubscription?.currentPeriodEnd
    const hasActivePlan = existingExpiresAt && new Date(existingExpiresAt) > new Date()

    // Check if it's an upgrade
    const isUpgrade = existingSubscription && existingSubscription.status === 'active' && 
                     existingSubscription.plan && plan &&
                     (PLAN_TIERS[plan.name.toLowerCase()] || 0) > (PLAN_TIERS[existingSubscription.plan.name.toLowerCase()] || 0)

    // Block if they have an active plan and it's not a renewal or upgrade
    // Upgrades should use /api/payments/upgrade endpoint, but we allow it here as fallback
    if (hasActivePlan && !isRenewal && !isUpgrade) {
      return NextResponse.json(
        { error: 'You already have an active plan. Please use the upgrade option to change plans.' },
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

    // Process one-time payment
    const paymentDescription = isRenewal 
      ? `${plan.displayName} - Renewal (1 Year Extension)`
      : isUpgrade
      ? `Upgrade to ${plan.displayName} - 1 Year Access`
      : `${plan.displayName} - 1 Year Access`
    
    const paymentIntent = await processOneTimePayment({
      amount: plan.price,
      currency: plan.currency,
      paymentMethodId,
      description: paymentDescription,
    })

    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: `Payment failed: ${paymentIntent.status}` },
        { status: 400 }
      )
    }

    // Calculate expiration date
    // Option 3: Full upgrade resets expiration to 1 year from now
    // Renewal extends from current expiration date
    const expiresAt = new Date()
    if (isRenewal && existingExpiresAt && new Date(existingExpiresAt) > new Date()) {
      // Renewal: extend from current expiration date
      expiresAt.setTime(new Date(existingExpiresAt).getTime())
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    } else if (isUpgrade) {
      // Upgrade: Reset expiration to 1 year from now (Option 3)
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    } else {
      // New purchase: 1 year from now
      expiresAt.setFullYear(expiresAt.getFullYear() + 1)
    }

    // Create/update subscription in database
    const subscription = await prisma.subscription.upsert({
      where: { userId: TEMP_USER_ID },
      update: {
        planId: plan.id,
        paymongoPaymentIntentId: paymentIntent.id,
        paymongoSubscriptionId: null, // Not a subscription
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: expiresAt,
        expiresAt: expiresAt,
        cancelAtPeriodEnd: false,
        cancelledAt: null,
      },
      create: {
        userId: TEMP_USER_ID,
        planId: plan.id,
        paymongoPaymentIntentId: paymentIntent.id,
        paymongoSubscriptionId: null,
        status: 'active',
        currentPeriodStart: new Date(),
        currentPeriodEnd: expiresAt,
        expiresAt: expiresAt,
        cancelAtPeriodEnd: false,
      },
    })

    // Create payment record
    await prisma.payment.create({
      data: {
        userId: TEMP_USER_ID,
        subscriptionId: subscription.id,
        planId: plan.id,
        paymongoPaymentIntentId: paymentIntent.id,
        amount: plan.price,
        currency: plan.currency,
        status: paymentIntent.status,
        paymentMethodType: 'card', // Default to card, can be enhanced later
        description: paymentDescription,
        paidAt: paymentIntent.status === 'succeeded' ? new Date() : null,
      },
    })

    return NextResponse.json({
      subscription,
      message: isRenewal 
        ? 'Subscription renewed successfully! Your access has been extended for another year.'
        : isUpgrade
        ? `Successfully upgraded to ${plan.displayName}! Your access has been extended for 1 year.`
        : 'Plan purchased successfully! Enjoy 1 year of access.',
    })
  } catch (error: any) {
    console.error('Error processing payment:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process payment' },
      { status: 500 }
    )
  }
}

