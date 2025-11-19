import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TEMP_USER_ID = 'temp-user-id'

async function resetSubscription() {
  try {
    // Find the free plan
    const freePlan = await prisma.subscriptionPlan.findUnique({
      where: { name: 'free' },
    })

    if (!freePlan) {
      console.error('Free plan not found!')
      process.exit(1)
    }

    console.log('Found free plan:', freePlan.displayName)

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
    })

    if (existingSubscription) {
      // Update existing subscription to free
      const updated = await prisma.subscription.update({
        where: { userId: TEMP_USER_ID },
        data: {
          planId: freePlan.id,
          status: 'active',
          paymongoSubscriptionId: null,
          paymongoPaymentIntentId: null,
          currentPeriodStart: null,
          currentPeriodEnd: null,
          expiresAt: null,
          cancelAtPeriodEnd: false,
          cancelledAt: null,
        },
        include: { plan: true },
      })
      console.log('Subscription reset to free:', updated.plan.displayName)
    } else {
      // Create new free subscription
      const created = await prisma.subscription.create({
        data: {
          userId: TEMP_USER_ID,
          planId: freePlan.id,
          status: 'active',
          paymongoSubscriptionId: null,
          paymongoPaymentIntentId: null,
          cancelAtPeriodEnd: false,
        },
        include: { plan: true },
      })
      console.log('Created free subscription:', created.plan.displayName)
    }

    console.log('✅ Subscription reset to free successfully!')
  } catch (error) {
    console.error('Error resetting subscription:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

resetSubscription()

