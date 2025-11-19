'use client'

import { useState, useEffect } from 'react'
import { Check, Crown, Zap, Shield, ArrowUp } from 'lucide-react'
import toast from 'react-hot-toast'
import PaymentMethodForm from './PaymentMethodForm'

// Plan tier order (higher number = higher tier)
const PLAN_TIERS: Record<string, number> = {
  free: 0,
  basic: 1,
  pro: 2,
}

interface Plan {
  id: string
  name: string
  displayName: string
  price: number
  currency: string
  interval: string
  maxCards: number
  maxContacts: number
  hasAnalytics: boolean
  hasIntegrations: boolean
  hasCustomBranding: boolean
}

interface SubscriptionPlansProps {
  currentPlanId?: string
  onPlanSelected?: () => void
}

export default function SubscriptionPlans({
  currentPlanId,
  onPlanSelected,
}: SubscriptionPlansProps) {
  const [plans, setPlans] = useState<Plan[]>([])
  const [currentPlan, setCurrentPlan] = useState<Plan | null>(null)
  const [loading, setLoading] = useState(true)
  const [subscribing, setSubscribing] = useState<string | null>(null)
  const [showPaymentForm, setShowPaymentForm] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null)

  useEffect(() => {
    fetchPlans()
  }, [currentPlanId])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/subscriptions/plans')
      if (response.ok) {
        const data = await response.json()
        const allPlans = data.plans || []
        setPlans(allPlans)
        
        // Find current plan
        if (currentPlanId) {
          const found = allPlans.find((p: Plan) => p.id === currentPlanId)
          setCurrentPlan(found || null)
        }
      } else {
        console.error('Failed to fetch plans:', response.status)
        toast.error('Failed to load subscription plans')
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
      toast.error('Failed to load subscription plans')
    } finally {
      setLoading(false)
    }
  }

  const handleSubscribe = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) {
      toast.error('Plan not found')
      return
    }
    setSelectedPlan(plan)
    setShowPaymentForm(true)
  }

  const handlePaymentMethodSuccess = async (paymentMethodId: string, customerInfo?: {
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
  }) => {
    if (!selectedPlan) return

    setShowPaymentForm(false)
    setSubscribing(selectedPlan.id)

    try {
      // Use upgrade endpoint if it's an upgrade, otherwise use purchase
      const endpoint = (currentPlanId && isUpgrade(selectedPlan)) 
        ? '/api/payments/upgrade' 
        : '/api/payments/purchase'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: selectedPlan.id,
          paymentMethodId,
          email: customerInfo?.email,
          firstName: customerInfo?.firstName,
          lastName: customerInfo?.lastName,
          phone: customerInfo?.phone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(data.message || 'Plan purchased successfully! Enjoy 1 year of access.')
        onPlanSelected?.()
      } else {
        toast.error(data.error || 'Failed to process payment', {
          duration: 6000,
        })
      }
    } catch (error: any) {
      console.error('Error processing payment:', error)
      toast.error('Failed to process payment')
    } finally {
      setSubscribing(null)
      setSelectedPlan(null)
    }
  }

  const handlePaymentMethodCancel = () => {
    setShowPaymentForm(false)
    setSelectedPlan(null)
  }

  const handleUpgrade = (planId: string) => {
    const plan = plans.find((p) => p.id === planId)
    if (!plan) {
      toast.error('Plan not found')
      return
    }
    setSelectedPlan(plan)
    setShowPaymentForm(true)
  }


  // Check if a plan is an upgrade from current plan
  const isUpgrade = (plan: Plan): boolean => {
    if (!currentPlan) return false
    const currentTier = PLAN_TIERS[currentPlan.name.toLowerCase()] || 0
    const planTier = PLAN_TIERS[plan.name.toLowerCase()] || 0
    return planTier > currentTier
  }

  // Check if a plan is a downgrade (should be disabled)
  const isDowngrade = (plan: Plan): boolean => {
    if (!currentPlan) return false
    const currentTier = PLAN_TIERS[currentPlan.name.toLowerCase()] || 0
    const planTier = PLAN_TIERS[plan.name.toLowerCase()] || 0
    return planTier < currentTier
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price / 100)
  }

  const getPlanIcon = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return <Zap className="w-6 h-6" />
      case 'basic':
        return <Shield className="w-6 h-6" />
      case 'pro':
        return <Crown className="w-6 h-6" />
      default:
        return <Crown className="w-6 h-6" />
    }
  }

  const getPlanColor = (planName: string) => {
    switch (planName.toLowerCase()) {
      case 'free':
        return 'border-gray-200'
      case 'basic':
        return 'border-teal-300'
      case 'pro':
        return 'border-orange-400 border-2'
      default:
        return 'border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
      </div>
    )
  }

  if (!loading && plans.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg border border-gray-200 p-8">
        <p className="text-gray-600 text-lg mb-2">No subscription plans available.</p>
        <p className="text-sm text-gray-500 mb-4">
          Please check that the database has been seeded with plans.
        </p>
        <button
          onClick={fetchPlans}
          className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
        >
          Retry
        </button>
      </div>
    )
  }

  return (
    <>
      {showPaymentForm && selectedPlan && (
        <PaymentMethodForm
          planName={currentPlanId && isUpgrade(selectedPlan) 
            ? `Upgrade to ${selectedPlan.displayName}`
            : selectedPlan.displayName}
          planPrice={selectedPlan.price}
          planCurrency={selectedPlan.currency}
          onSuccess={handlePaymentMethodSuccess}
          onCancel={handlePaymentMethodCancel}
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
        const isCurrent = plan.id === currentPlanId
        const isPro = plan.name.toLowerCase() === 'pro'

        return (
          <div
            key={plan.id}
            className={`relative bg-white rounded-lg border-2 p-6 ${getPlanColor(
              plan.name
            )} ${isPro ? 'shadow-lg' : 'shadow-sm'}`}
          >
            {isPro && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Popular
                </span>
              </div>
            )}

            <div className="flex items-center gap-3 mb-4">
              <div
                className={`p-3 rounded-lg ${
                  isPro
                    ? 'bg-orange-100 text-orange-600'
                    : plan.name.toLowerCase() === 'basic'
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {getPlanIcon(plan.name)}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {plan.displayName}
                </h3>
                <p className="text-gray-600 text-sm">
                  {plan.name.toLowerCase() === 'free' 
                    ? 'Free Forever'
                    : `${formatPrice(plan.price, plan.currency)} / year`}
                </p>
              </div>
            </div>

            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  {plan.maxCards === -1
                    ? 'Unlimited Cards'
                    : `${plan.maxCards} ${plan.maxCards === 1 ? 'Card' : 'Cards'}`}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                <span className="text-sm text-gray-700">
                  {plan.maxContacts === -1
                    ? 'Unlimited Contacts'
                    : `${plan.maxContacts} ${plan.maxContacts === 1 ? 'Contact' : 'Contacts'}`}
                </span>
              </li>
              {plan.hasAnalytics && (
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Analytics Dashboard</span>
                </li>
              )}
              {plan.hasIntegrations && (
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Integrations</span>
                </li>
              )}
              {plan.hasCustomBranding && (
                <li className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-700">Custom Branding</span>
                </li>
              )}
            </ul>

            {isCurrent ? (
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-100 text-gray-600 rounded-lg font-medium cursor-not-allowed"
              >
                Current Plan
              </button>
            ) : isDowngrade(plan) ? (
              <button
                disabled
                className="w-full px-4 py-2 bg-gray-100 text-gray-400 rounded-lg font-medium cursor-not-allowed"
                title="Downgrades are not allowed. You can only upgrade to a higher plan."
              >
                Downgrade Not Allowed
              </button>
            ) : (
              <button
                onClick={() =>
                  currentPlanId && isUpgrade(plan)
                    ? handleUpgrade(plan.id)
                    : handleSubscribe(plan.id)
                }
                disabled={subscribing === plan.id}
                className={`w-full px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                  isPro
                    ? 'bg-orange-600 text-white hover:bg-orange-700'
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                } disabled:opacity-50`}
              >
                {subscribing === plan.id ? (
                  'Processing...'
                ) : currentPlanId && isUpgrade(plan) ? (
                  <>
                    <ArrowUp className="w-4 h-4" />
                    Upgrade to {plan.displayName}
                  </>
                ) : plan.name.toLowerCase() === 'free' ? (
                  'Current Plan'
                ) : (
                  'Buy 1 Year'
                )}
              </button>
            )}
          </div>
        )
      })}
      </div>
    </>
  )
}

