import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { createSubscription, createCustomer } from '@/lib/paymongo'

// Temporary user ID - replace with actual auth
const TEMP_USER_ID = 'temp-user-id'

export async function GET(request: NextRequest) {
  try {
    // Get all available subscription plans
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
        { error: 'Subscription plan not found' },
        { status: 404 }
      )
    }

    if (!plan.paymongoPlanId) {
      return NextResponse.json(
        {
          error: 'Plan is not configured with PayMongo',
          message: 'This plan needs to be synced with PayMongo. Please ensure subscriptions are enabled in your PayMongo account and sync the plans using /api/subscriptions/plans/sync or set the paymongoPlanId manually using /api/subscriptions/plans/manual',
          planId: plan.id,
          planName: plan.displayName,
        },
        { status: 400 }
      )
    }

    // Check if user already has a subscription
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
    })

    if (existingSubscription && existingSubscription.status === 'active') {
      return NextResponse.json(
        { error: 'User already has an active subscription' },
        { status: 400 }
      )
    }

    // Step 1: Create customer in PayMongo (required for subscriptions)
    const customer = await createCustomer({
      email: email || undefined,
      phone: phone || undefined,
      firstName: firstName || undefined,
      lastName: lastName || undefined,
    })

    // Step 2: Create subscription in PayMongo with customer_id, plan_id, and payment_method
    const paymongoSubscription = await createSubscription({
      customerId: customer.id,
      planId: plan.paymongoPlanId,
      paymentMethodId,
    })

    // Create subscription in database
    const subscription = await prisma.subscription.upsert({
      where: { userId: TEMP_USER_ID },
      update: {
        planId: plan.id,
        paymongoSubscriptionId: paymongoSubscription.id,
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
      create: {
        userId: TEMP_USER_ID,
        planId: plan.id,
        paymongoSubscriptionId: paymongoSubscription.id,
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
    })

    return NextResponse.json({ subscription })
  } catch (error: any) {
    console.error('Error creating subscription:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create subscription' },
      { status: 500 }
    )
  }
}

