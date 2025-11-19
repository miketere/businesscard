'use client'

import { useState, useEffect } from 'react'
import { RefreshCw, Check, X, AlertCircle } from 'lucide-react'
import Header from '@/components/Header'
import toast from 'react-hot-toast'

interface Plan {
  id: string
  name: string
  price: number
  currency: string
  interval: string
  paymongoPlanId: string | null
  status: 'configured' | 'not_configured'
}

export default function SyncPlansPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [manualPlanId, setManualPlanId] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/subscriptions/plans/manual')
      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans || [])
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
      toast.error('Failed to load plans')
    } finally {
      setLoading(false)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      const response = await fetch('/api/subscriptions/plans/sync', {
        method: 'POST',
      })
      const data = await response.json()

      if (response.ok) {
        if (data.synced && data.synced.length > 0) {
          toast.success(`Successfully synced ${data.synced.length} plan(s)`)
          fetchPlans()
        } else if (data.errors && data.errors.length > 0) {
          const errorMessages = data.errors.map((e: any) => `${e.planName}: ${e.error}`).join('\n')
          toast.error(`Sync failed. ${errorMessages}`, { duration: 8000 })
          console.error('Sync errors:', data.errors)
        } else {
          toast(data.message || 'No plans to sync')
        }
      } else {
        toast.error(data.error || 'Failed to sync plans')
      }
    } catch (error: any) {
      console.error('Error syncing plans:', error)
      toast.error('Failed to sync plans')
    } finally {
      setSyncing(false)
    }
  }

  const handleManualUpdate = async (planId: string) => {
    const paymongoPlanId = manualPlanId[planId]?.trim()
    if (!paymongoPlanId) {
      toast.error('Please enter a PayMongo Plan ID')
      return
    }

    try {
      const response = await fetch('/api/subscriptions/plans/manual', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId,
          paymongoPlanId,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(`Plan "${data.plan.name}" updated successfully!`)
        setManualPlanId({ ...manualPlanId, [planId]: '' })
        fetchPlans()
      } else {
        toast.error(data.error || 'Failed to update plan')
      }
    } catch (error: any) {
      console.error('Error updating plan:', error)
      toast.error('Failed to update plan')
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price / 100)
  }

  if (loading) {
    return (
      <>
        <Header breadcrumbs={[{ label: 'Settings' }, { label: 'Subscription' }, { label: 'Sync Plans' }]} />
        <div className="flex items-center justify-center min-h-screen pt-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
        </div>
      </>
    )
  }

  const needsSync = plans.filter((p) => p.status === 'not_configured' && p.price > 0)

  return (
    <>
      <Header breadcrumbs={[{ label: 'Settings' }, { label: 'Subscription' }, { label: 'Sync Plans' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Sync Plans with PayMongo</h1>
            <p className="text-gray-600 mt-2">
              Configure your subscription plans to work with PayMongo
            </p>
          </div>

          {/* Info Alert */}
          {needsSync.length > 0 && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-yellow-900 mb-1">
                    PayMongo Subscriptions Required
                  </h3>
                  <p className="text-sm text-yellow-800 mb-2">
                    {needsSync.length} plan(s) need to be configured. You need to:
                  </p>
                  <ol className="text-sm text-yellow-800 list-decimal list-inside space-y-1">
                    <li>Enable subscriptions in your PayMongo account (email [email protected])</li>
                    <li>Create plans in PayMongo dashboard, or</li>
                    <li>Use the sync button below (requires subscriptions enabled)</li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          {/* Sync Button */}
          <div className="mb-6">
            <button
              onClick={handleSync}
              disabled={syncing || needsSync.length === 0}
              className="px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <RefreshCw className={`w-5 h-5 ${syncing ? 'animate-spin' : ''}`} />
              {syncing ? 'Syncing...' : 'Sync Plans with PayMongo'}
            </button>
            <p className="text-sm text-gray-500 mt-2">
              This will create plans in PayMongo and link them to your database plans.
              Requires subscriptions to be enabled in your PayMongo account.
            </p>
          </div>

          {/* Plans List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Subscription Plans</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {plans.map((plan) => (
                <div key={plan.id} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                      <p className="text-sm text-gray-600">
                        {formatPrice(plan.price, plan.currency)} / {plan.interval}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {plan.status === 'configured' ? (
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium flex items-center gap-1">
                          <Check className="w-4 h-4" />
                          Configured
                        </span>
                      ) : plan.price === 0 ? (
                        <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                          Free Plan
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium flex items-center gap-1">
                          <X className="w-4 h-4" />
                          Not Configured
                        </span>
                      )}
                    </div>
                  </div>

                  {plan.status === 'configured' ? (
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">PayMongo Plan ID:</span>{' '}
                        <code className="bg-white px-2 py-1 rounded text-xs font-mono">
                          {plan.paymongoPlanId}
                        </code>
                      </p>
                    </div>
                  ) : plan.price > 0 ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          PayMongo Plan ID
                        </label>
                        <p className="text-xs text-gray-500 mb-2">
                          If you created this plan manually in PayMongo dashboard, enter the plan ID here
                          (starts with <code className="bg-gray-100 px-1 rounded">plan_</code>)
                        </p>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={manualPlanId[plan.id] || ''}
                            onChange={(e) =>
                              setManualPlanId({ ...manualPlanId, [plan.id]: e.target.value })
                            }
                            placeholder="plan_XXXXXXXXXX"
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                          />
                          <button
                            onClick={() => handleManualUpdate(plan.id)}
                            disabled={!manualPlanId[plan.id]?.trim()}
                            className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Update
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          {/* Back Link */}
          <div className="mt-6">
            <a
              href="/settings/subscription"
              className="text-teal-600 hover:text-teal-700 font-medium"
            >
              ← Back to Subscription Settings
            </a>
          </div>
        </div>
      </div>
    </>
  )
}

