import { PlanTier } from './templates'
import { getUserLimits } from './subscription'

/**
 * Check if user can access a template based on their subscription plan
 * Plan hierarchy: free < basic < pro
 * - free: can only access free templates
 * - basic: can access free + basic templates
 * - pro: can access all templates
 */
export async function canUseTemplate(templateRequiredPlan: PlanTier, userId: string): Promise<boolean> {
  const userLimits = await getUserLimits(userId)
  const userPlan = userLimits.planName as PlanTier

  // Plan hierarchy
  const planHierarchy: Record<PlanTier, number> = {
    free: 0,
    basic: 1,
    pro: 2,
  }

  const userPlanLevel = planHierarchy[userPlan] || 0
  const requiredPlanLevel = planHierarchy[templateRequiredPlan] || 0

  return userPlanLevel >= requiredPlanLevel
}

/**
 * Get user's current plan tier
 */
export async function getUserPlanTier(userId: string): Promise<PlanTier> {
  const userLimits = await getUserLimits(userId)
  return (userLimits.planName as PlanTier) || 'free'
}

/**
 * Filter templates based on user's plan access
 */
export async function getAccessibleTemplates(userId: string) {
  const userPlanTier = await getUserPlanTier(userId)
  const { templates } = require('./templates')
  
  const planHierarchy: Record<PlanTier, number> = {
    free: 0,
    basic: 1,
    pro: 2,
  }

  const userPlanLevel = planHierarchy[userPlanTier] || 0

  return templates.filter((template: { requiredPlan: PlanTier }) => {
    const requiredPlanLevel = planHierarchy[template.requiredPlan] || 0
    return userPlanLevel >= requiredPlanLevel
  })
}

