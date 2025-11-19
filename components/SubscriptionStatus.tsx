'use client'

import { useState } from 'react'
import { Calendar, CreditCard, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react'
import toast from 'react-hot-toast'
import PaymentMethodForm from './PaymentMethodForm'

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
  }
}

interface SubscriptionStatusProps {
  subscription: Subscription
  onUpdate: () => void
}

export default function SubscriptionStatus({
  subscription,
  onUpdate,
}: SubscriptionStatusProps) {
  const [renewing, setRenewing] = useState(false)
  const [showRenewalForm, setShowRenewalForm] = useState(false)

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price / 100)
  }

  const handleRenewal = () => {
    setShowRenewalForm(true)
  }

  const handleRenewalSuccess = async (paymentMethodId: string, customerInfo?: {
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
  }) => {
    setShowRenewalForm(false)
    setRenewing(true)

    try {
      const response = await fetch('/api/payments/purchase', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planId: subscription.plan.id,
          paymentMethodId,
          email: customerInfo?.email,
          firstName: customerInfo?.firstName,
          lastName: customerInfo?.lastName,
          phone: customerInfo?.phone,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Subscription renewed successfully! Enjoy another year of access.')
        onUpdate()
      } else {
        toast.error(data.error || 'Failed to renew subscription')
      }
    } catch (error: any) {
      console.error('Error renewing subscription:', error)
      toast.error('Failed to renew subscription')
    } finally {
      setRenewing(false)
    }
  }

  const handleRenewalCancel = () => {
    setShowRenewalForm(false)
  }

  // Check if subscription expires in 3 months or less
  const shouldShowRenewalPrompt = () => {
    if (!subscription.expiresAt && !subscription.currentPeriodEnd) return false
    
    const expiresAt = subscription.expiresAt || subscription.currentPeriodEnd
    if (!expiresAt) return false

    const expirationDate = new Date(expiresAt)
    const now = new Date()
    const threeMonthsFromNow = new Date()
    threeMonthsFromNow.setMonth(now.getMonth() + 3)

    return expirationDate <= threeMonthsFromNow && subscription.status === 'active'
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'past_due':
        return 'bg-yellow-100 text-yellow-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      case 'unpaid':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle2 className="w-5 h-5" />
      case 'past_due':
      case 'unpaid':
        return <AlertCircle className="w-5 h-5" />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">
            Current Subscription
          </h3>
          <p className="text-gray-600 mt-1">{subscription.plan.displayName} Plan</p>
        </div>
        <span
          className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
            subscription.status
          )}`}
        >
          {getStatusIcon(subscription.status)}
          {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-teal-100 rounded-lg">
            <CreditCard className="w-5 h-5 text-teal-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {subscription.plan.interval === 'year' ? 'Purchase Price' : 'Billing Amount'}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {subscription.plan.interval === 'year' 
                ? formatPrice(subscription.plan.price, subscription.plan.currency)
                : `${formatPrice(subscription.plan.price, subscription.plan.currency)}/${subscription.plan.interval === 'month' ? 'mo' : 'yr'}`}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">
              {subscription.plan.interval === 'year' ? 'Purchase Date' : 'Current Period'}
            </p>
            <p className="text-lg font-semibold text-gray-900">
              {subscription.plan.interval === 'year' 
                ? formatDate(subscription.currentPeriodStart)
                : `${formatDate(subscription.currentPeriodStart)} - ${formatDate(subscription.currentPeriodEnd)}`}
            </p>
          </div>
        </div>

        {(subscription.expiresAt || subscription.currentPeriodEnd) && (
          <div className="flex items-start gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">
                {subscription.plan.interval === 'year' ? 'Expires On' : 'Next Billing Date'}
              </p>
              <p className="text-lg font-semibold text-gray-900">
                {formatDate(subscription.expiresAt || subscription.currentPeriodEnd)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Renewal Prompt - Show when 3 months or less remaining */}
      {shouldShowRenewalPrompt() && (
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <p className="text-teal-900 font-medium mb-1">
                Renew Your Subscription
              </p>
              <p className="text-teal-800 text-sm">
                Your subscription expires on {formatDate(subscription.expiresAt || subscription.currentPeriodEnd)}. 
                Renew now to continue enjoying uninterrupted access.
              </p>
            </div>
            <button
              onClick={handleRenewal}
              disabled={renewing || showRenewalForm}
              className="ml-4 px-4 py-2 text-sm font-medium text-white bg-teal-600 rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              {renewing ? 'Renewing...' : 'Renew Now'}
            </button>
          </div>
        </div>
      )}

      {/* Renewal Payment Form */}
      {showRenewalForm && (
        <PaymentMethodForm
          planName={subscription.plan.displayName}
          planPrice={subscription.plan.price}
          planCurrency={subscription.plan.currency}
          onSuccess={handleRenewalSuccess}
          onCancel={handleRenewalCancel}
        />
      )}
    </div>
  )
}

