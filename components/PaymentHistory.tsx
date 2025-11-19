'use client'

import { useEffect, useState } from 'react'
import { Receipt, CheckCircle2, XCircle, Clock, CreditCard } from 'lucide-react'

interface Payment {
  id: string
  paymongoPaymentIntentId: string
  amount: number
  currency: string
  status: string
  paymentMethodType: string | null
  description: string | null
  paidAt: string | null
  createdAt: string
  plan: {
    id: string
    name: string
    displayName: string
    price: number
    currency: string
    interval: string
  }
}

export default function PaymentHistory() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPayments()
  }, [])

  const fetchPayments = async () => {
    try {
      const response = await fetch('/api/payments/history')
      if (response.ok) {
        const data = await response.json()
        setPayments(data.payments || [])
      }
    } catch (error) {
      console.error('Error fetching payments:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2,
    }).format(price / 100)
  }

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case 'failed':
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-600" />
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'succeeded':
        return 'bg-green-100 text-green-800'
      case 'failed':
      case 'cancelled':
        return 'bg-red-100 text-red-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
        </div>
      </div>
    )
  }

  if (payments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-teal-100 rounded-lg">
            <Receipt className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Payment History</h3>
            <p className="text-sm text-gray-600">View all your past transactions</p>
          </div>
        </div>
        <div className="text-center py-12">
          <Receipt className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg mb-2">No payments yet</p>
          <p className="text-gray-500 text-sm">
            Your payment history will appear here once you make a purchase.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-teal-100 rounded-lg">
          <Receipt className="w-6 h-6 text-teal-600" />
        </div>
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Payment History</h3>
          <p className="text-sm text-gray-600">View all your past transactions</p>
        </div>
      </div>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 bg-teal-50 rounded-lg">
                  <CreditCard className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900">
                      {payment.plan.displayName} Plan
                    </h4>
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        payment.status
                      )}`}
                    >
                      {getStatusIcon(payment.status)}
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </div>
                  {payment.description && (
                    <p className="text-sm text-gray-600 mb-1">{payment.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-500 mt-2">
                    <span>{formatDate(payment.createdAt)}</span>
                    {payment.paymentMethodType && (
                      <span className="capitalize">
                        {payment.paymentMethodType === 'card' ? '💳 Card' : payment.paymentMethodType}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">
                  {formatPrice(payment.amount, payment.currency)}
                </p>
                {payment.paidAt && (
                  <p className="text-xs text-gray-500 mt-1">
                    Paid {formatDate(payment.paidAt)}
                  </p>
                )}
              </div>
            </div>
            {payment.paymongoPaymentIntentId && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  Payment ID: <span className="font-mono">{payment.paymongoPaymentIntentId}</span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

