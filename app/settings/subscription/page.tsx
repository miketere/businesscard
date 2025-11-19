'use client'

import { useEffect, useState } from 'react'
import { Check, X, Crown, Zap, Shield } from 'lucide-react'
import Header from '@/components/Header'
import SubscriptionStatus from '@/components/SubscriptionStatus'
import SubscriptionPlans from '@/components/SubscriptionPlans'
import PaymentHistory from '@/components/PaymentHistory'

interface Subscription {
  id: string
  status: string
  currentPeriodStart: string | null
  currentPeriodEnd: string | null
  expiresAt: string | null
  cancelAtPeriodEnd: boolean
  plan: {
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
}

export default function SubscriptionPage() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    try {
      const response = await fetch('/api/subscriptions/current')
      if (response.ok) {
        const data = await response.json()
        setSubscription(data.subscription)
      }
    } catch (error) {
      console.error('Error fetching subscription:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <>
        <Header breadcrumbs={[{ label: 'Settings' }, { label: 'Subscription' }]} />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      </>
    )
  }

  return (
    <>
      <Header breadcrumbs={[{ label: 'Settings' }, { label: 'Subscription' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Subscription</h1>
        <p className="text-sm sm:text-base text-gray-600 mt-2">
          Manage your subscription and billing preferences
        </p>
      </div>

      {/* Payment History */}
      <div className="mt-8 sm:mt-12">
        <PaymentHistory />
      </div>

      {/* Available Plans */}
      <div className="mt-8 sm:mt-12">
        <div className="mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            {subscription ? 'Change Plan' : 'Choose Your Plan'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            {subscription ? 'Upgrade or switch to a different plan' : 'Select a plan to get started'}
          </p>
        </div>
        <SubscriptionPlans
          currentPlanId={subscription?.plan.id}
          onPlanSelected={fetchSubscription}
        />
      </div>
        </div>
      </div>
    </>
  )
}

