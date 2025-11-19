import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding subscription plans...')

  // Create Personal Plan (Free)
  const freePlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'free' },
    update: {},
    create: {
      name: 'free',
      displayName: 'Personal',
      price: 0,
      currency: 'USD',
      interval: 'month',
      maxCards: 4,
      maxContacts: 50,
      hasAnalytics: false,
      hasIntegrations: false,
      hasCustomBranding: false,
      paymongoPlanId: null, // Free plan doesn't need PayMongo
    },
  })

  // Check if Basic plan already exists (Professional)
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
      displayName: 'Professional',
      price: 800, // $8/month in cents
      currency: 'USD',
      interval: 'month',
      maxCards: 16,
      maxContacts: 500,
      hasAnalytics: true,
      hasIntegrations: false,
      hasCustomBranding: true,
      paymongoPlanId: basicPaymongoPlanId,
    },
  })

  // Check if Pro plan already exists (Business)
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
      displayName: 'Business',
      price: 600, // $6/user/month in cents (minimum 5 users = $30/month)
      currency: 'USD',
      interval: 'month',
      maxCards: -1, // Unlimited
      maxContacts: -1, // Unlimited
      hasAnalytics: true,
      hasIntegrations: true,
      hasCustomBranding: true,
      paymongoPlanId: proPaymongoPlanId,
    },
  })

  // Create Enterprise Plan
  const existingEnterprise = await prisma.subscriptionPlan.findUnique({
    where: { name: 'enterprise' },
  })
  const enterprisePaymongoPlanId = existingEnterprise?.paymongoPlanId || null

  const enterprisePlan = await prisma.subscriptionPlan.upsert({
    where: { name: 'enterprise' },
    update: enterprisePaymongoPlanId ? {
      paymongoPlanId: enterprisePaymongoPlanId,
    } : {},
    create: {
      name: 'enterprise',
      displayName: 'Enterprise',
      price: 0, // Custom pricing
      currency: 'USD',
      interval: 'month',
      maxCards: -1, // Unlimited
      maxContacts: -1, // Unlimited
      hasAnalytics: true,
      hasIntegrations: true,
      hasCustomBranding: true,
      paymongoPlanId: enterprisePaymongoPlanId,
    },
  })

  console.log('Seeded plans:', { freePlan, basicPlan, proPlan, enterprisePlan })
  console.log('PayMongo Plan IDs:', {
    basic: basicPaymongoPlanId,
    pro: proPaymongoPlanId,
    enterprise: enterprisePaymongoPlanId,
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

