import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import {
  verifyWebhookSignature,
  parseWebhookEvent,
  getSubscription,
  getInvoices,
} from '@/lib/paymongo'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const signature = request.headers.get('paymongo-signature')

    if (!signature) {
      return NextResponse.json(
        { error: 'Missing webhook signature' },
        { status: 401 }
      )
    }

    const webhookSecret = process.env.PAYMONGO_WEBHOOK_SECRET
    if (!webhookSecret) {
      console.error('PAYMONGO_WEBHOOK_SECRET is not set')
      return NextResponse.json(
        { error: 'Webhook secret not configured' },
        { status: 500 }
      )
    }

    // Verify webhook signature
    const rawBody = JSON.stringify(body)
    const isValid = verifyWebhookSignature(rawBody, signature, webhookSecret)

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid webhook signature' },
        { status: 401 }
      )
    }

    // Parse webhook event
    const event = parseWebhookEvent(body)
    const eventType = event.attributes.type

    console.log('Received webhook event:', eventType)

    // Handle different event types
    switch (eventType) {
      case 'subscription.activated':
      case 'subscription.updated':
        await handleSubscriptionUpdate(event.attributes.data.id)
        break

      case 'subscription.past_due':
        await handleSubscriptionPastDue(event.attributes.data.id)
        break

      case 'subscription.cancelled':
        await handleSubscriptionCancelled(event.attributes.data.id)
        break

      case 'invoice.paid':
        await handleInvoicePaid(event.attributes.data.id)
        break

      case 'invoice.payment_failed':
        await handleInvoiceFailed(event.attributes.data.id)
        break

      default:
        console.log('Unhandled webhook event type:', eventType)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    )
  }
}

async function handleSubscriptionUpdate(subscriptionId: string) {
  try {
    const paymongoSubscription = await getSubscription(subscriptionId)

    const subscription = await prisma.subscription.findUnique({
      where: { paymongoSubscriptionId: subscriptionId },
    })

    if (!subscription) {
      console.error('Subscription not found:', subscriptionId)
      return
    }

    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
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
  } catch (error) {
    console.error('Error handling subscription update:', error)
  }
}

async function handleSubscriptionPastDue(subscriptionId: string) {
  await handleSubscriptionUpdate(subscriptionId)
}

async function handleSubscriptionCancelled(subscriptionId: string) {
  await handleSubscriptionUpdate(subscriptionId)
}

async function handleInvoicePaid(invoiceId: string) {
  try {
    // Get subscription from invoice
    const invoices = await getInvoices('') // We need to find the subscription first
    // This is a simplified version - in production, you'd query by invoice ID
    // For now, we'll update when we get subscription updates
    console.log('Invoice paid:', invoiceId)
  } catch (error) {
    console.error('Error handling invoice paid:', error)
  }
}

async function handleInvoiceFailed(invoiceId: string) {
  try {
    console.log('Invoice payment failed:', invoiceId)
    // Update subscription status to past_due or unpaid
  } catch (error) {
    console.error('Error handling invoice failed:', error)
  }
}

