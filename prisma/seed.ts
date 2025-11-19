import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding subscription plans...')

  // Create Free Plan (no PayMongo plan needed for free tier)
  const freePlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'free' },
    update: {},
    create: {
      name: 'free',
      displayName: 'Free',
      price: 0,
      currency: 'PHP',
      interval: 'month',
      maxCards: 1,
      maxContacts: 10,
      hasAnalytics: false,
      hasIntegrations: false,
      hasCustomBranding: false,
      paymongoPlanId: null, // Free plan doesn't need PayMongo
    },
  })

  // Note: We're using Payment Intents for one-time payments, so no PayMongo plans needed
  // Check if Basic plan already exists
  const existingBasic = await prisma.subscriptionPlan.findUnique({
    where: { name: 'basic' },
  })
  const basicPaymongoPlanId = existingBasic?.paymongoPlanId || null

  const basicPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'basic' },
    update: basicPaymongoPlanId ? {
      paymongoPlanId: basicPaymongoPlanId,
    } : {},
    create: {
      name: 'basic',
      displayName: 'Basic',
      price: 299000, // ₱2,990.00 for 1 year (was ₱299/month)
      currency: 'PHP',
      interval: 'year',
      maxCards: 5,
      maxContacts: 100,
      hasAnalytics: true,
      hasIntegrations: false,
      hasCustomBranding: false,
      paymongoPlanId: basicPaymongoPlanId,
    },
  })

  // Note: We're using Payment Intents for one-time payments, so no PayMongo plans needed
  // Check if Pro plan already exists
  const existingPro = await prisma.subscriptionPlan.findUnique({
    where: { name: 'pro' },
  })
  const proPaymongoPlanId = existingPro?.paymongoPlanId || null

  const proPlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'pro' },
    update: proPaymongoPlanId ? {
      paymongoPlanId: proPaymongoPlanId,
    } : {},
    create: {
      name: 'pro',
      displayName: 'Pro',
      price: 799000, // ₱7,990.00 for 1 year (was ₱799/month)
      currency: 'PHP',
      interval: 'year',
      maxCards: -1, // Unlimited
      maxContacts: -1, // Unlimited
      hasAnalytics: true,
      hasIntegrations: true,
      hasCustomBranding: true,
      paymongoPlanId: proPaymongoPlanId,
    },
  })

  console.log('Seeded plans:', { freePlan, basicPlan, proPlan })
  console.log('PayMongo Plan IDs:', {
    basic: basicPaymongoPlanId,
    pro: proPaymongoPlanId,
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

