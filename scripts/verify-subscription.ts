import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const TEMP_USER_ID = 'temp-user-id'

async function verifySubscription() {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
      include: { plan: true },
    })

    if (subscription) {
      console.log('Current Subscription:')
      console.log('- Plan:', subscription.plan.displayName)
      console.log('- Status:', subscription.status)
      console.log('- Expires At:', subscription.expiresAt || 'Never')
      console.log('- Payment Intent ID:', subscription.paymongoPaymentIntentId || 'None')
      console.log('- Subscription ID:', subscription.paymongoSubscriptionId || 'None')
    } else {
      console.log('No subscription found')
    }
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

verifySubscription()

