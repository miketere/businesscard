/**
 * Subscription Feature Gating Utilities
 * Check user subscription status and feature access
 */

import { prisma } from './prisma'

// Temporary user ID - replace with actual auth
const TEMP_USER_ID = 'temp-user-id'

export interface UserLimits {
  maxCards: number
  maxContacts: number
  hasAnalytics: boolean
  hasIntegrations: boolean
  hasCustomBranding: boolean
  planName: string
  planDisplayName: string
}

/**
 * Get user's subscription limits based on their current plan
 */
export async function getUserLimits(): Promise<UserLimits> {
  try {
    const subscription = await prisma.subscription.findUnique({
      where: { userId: TEMP_USER_ID },
      include: { plan: true },
    })

    // Check if subscription exists and is active
    if (subscription && subscription.status === 'active') {
      // Check expiration date
      const expiresAt = subscription.expiresAt || subscription.currentPeriodEnd
      if (expiresAt && new Date(expiresAt) < new Date()) {
        // Subscription expired, return free plan limits
        return getFreePlanLimits()
      }

      // Active subscription
      return {
        maxCards: subscription.plan.maxCards,
        maxContacts: subscription.plan.maxContacts,
        hasAnalytics: subscription.plan.hasAnalytics,
        hasIntegrations: subscription.plan.hasIntegrations,
        hasCustomBranding: subscription.plan.hasCustomBranding,
        planName: subscription.plan.name,
        planDisplayName: subscription.plan.displayName,
      }
    }

    // No subscription or expired
    return getFreePlanLimits()
  } catch (error) {
    console.error('Error getting user limits:', error)
    return getFreePlanLimits()
  }
}

function getFreePlanLimits(): UserLimits {
  return {
    maxCards: 1,
    maxContacts: 10,
    hasAnalytics: false,
    hasIntegrations: false,
    hasCustomBranding: false,
    planName: 'free',
    planDisplayName: 'Free',
  }
}

/**
 * Check if user has access to a specific feature
 */
export async function checkFeatureAccess(
  feature: 'analytics' | 'integrations' | 'customBranding'
): Promise<boolean> {
  const limits = await getUserLimits()

  switch (feature) {
    case 'analytics':
      return limits.hasAnalytics
    case 'integrations':
      return limits.hasIntegrations
    case 'customBranding':
      return limits.hasCustomBranding
    default:
      return false
  }
}

/**
 * Check if a feature is enabled for the user
 */
export async function isFeatureEnabled(feature: string): Promise<boolean> {
  return checkFeatureAccess(feature as any)
}

/**
 * Check if user can create more cards
 */
export async function canCreateCard(): Promise<{ allowed: boolean; reason?: string }> {
  const limits = await getUserLimits()

  // Unlimited cards (-1 means unlimited)
  if (limits.maxCards === -1) {
    return { allowed: true }
  }

  // Count current cards
  const cardCount = await prisma.card.count({
    where: { userId: TEMP_USER_ID },
  })

  if (cardCount >= limits.maxCards) {
    return {
      allowed: false,
      reason: `You've reached the limit of ${limits.maxCards} card(s) for the ${limits.planDisplayName} plan. Upgrade to create more cards.`,
    }
  }

  return { allowed: true }
}

/**
 * Check if user can add more contacts
 */
export async function canAddContact(): Promise<{ allowed: boolean; reason?: string }> {
  const limits = await getUserLimits()

  // Unlimited contacts (-1 means unlimited)
  if (limits.maxContacts === -1) {
    return { allowed: true }
  }

  // Count current contacts
  const contactCount = await prisma.contact.count({
    where: { userId: TEMP_USER_ID },
  })

  if (contactCount >= limits.maxContacts) {
    return {
      allowed: false,
      reason: `You've reached the limit of ${limits.maxContacts} contact(s) for the ${limits.planDisplayName} plan. Upgrade to add more contacts.`,
    }
  }

  return { allowed: true }
}

/**
 * Get upgrade message for a feature
 */
export function getUpgradeMessage(feature: string, currentPlan: string): string {
  return `This feature is available in higher plans. Upgrade from ${currentPlan} to access ${feature}.`
}

