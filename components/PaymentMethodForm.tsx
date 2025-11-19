'use client'

import { useState } from 'react'
import { CreditCard, Lock, X } from 'lucide-react'
import toast from 'react-hot-toast'

interface PaymentMethodFormProps {
  planName: string
  planPrice: number
  planCurrency: string
  onSuccess: (paymentMethodId: string, customerInfo?: {
    email?: string
    firstName?: string
    lastName?: string
    phone?: string
  }) => void
  onCancel: () => void
}

export default function PaymentMethodForm({
  planName,
  planPrice,
  planCurrency,
  onSuccess,
  onCancel,
}: PaymentMethodFormProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expMonth: '',
    expYear: '',
    cvc: '',
    cardholderName: '',
    email: '',
    phone: '',
  })

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const formatted = cleaned.match(/.{1,4}/g)?.join(' ') || cleaned
    return formatted.slice(0, 19) // Max 16 digits + 3 spaces
  }

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData({ ...formData, cardNumber: formatted })
  }

  const handleExpMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2)
    if (value === '' || (parseInt(value) >= 1 && parseInt(value) <= 12)) {
      setFormData({ ...formData, expMonth: value })
    }
  }

  const handleExpYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData({ ...formData, expYear: value })
  }

  const handleCvcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4)
    setFormData({ ...formData, cvc: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Validate form - ensure card number is valid (13-19 digits)
      const cleanCardNumber = formData.cardNumber.replace(/\s/g, '').replace(/\D/g, '')
      if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
        toast.error('Please enter a valid card number (13-19 digits)')
        setLoading(false)
        return
      }
      
      if (!/^\d+$/.test(cleanCardNumber)) {
        toast.error('Card number must contain only digits')
        setLoading(false)
        return
      }

      if (!formData.expMonth || !formData.expYear) {
        toast.error('Please enter card expiration date')
        setLoading(false)
        return
      }

      if (!formData.cvc || formData.cvc.length < 3) {
        toast.error('Please enter a valid CVC')
        setLoading(false)
        return
      }

      // Create payment method (using cleanCardNumber from validation above)
      const response = await fetch('/api/payment-methods', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'card',
          cardNumber: cleanCardNumber, // Send only digits
          expMonth: parseInt(formData.expMonth),
          expYear: parseInt(formData.expYear),
          cvc: formData.cvc,
          billing: {
            name: formData.cardholderName || undefined,
            email: formData.email || undefined,
            phone: formData.phone || undefined,
          },
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to process payment method')
      }

      toast.success('Payment method added successfully!')
      
      // Extract customer info from form
      const customerInfo = {
        email: formData.email || undefined,
        firstName: formData.cardholderName?.split(' ')[0] || undefined,
        lastName: formData.cardholderName?.split(' ').slice(1).join(' ') || undefined,
        phone: formData.phone || undefined,
      }
      
      onSuccess(data.paymentMethod.id, customerInfo)
    } catch (error: any) {
      console.error('Error creating payment method:', error)
      toast.error(error.message || 'Failed to process payment method')
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

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Payment Information</h2>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={loading}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="mb-6 p-4 bg-teal-50 rounded-lg border border-teal-200">
            <p className="text-sm text-gray-600 mb-1">Purchasing</p>
            <p className="text-lg font-semibold text-gray-900">{planName} - 1 Year Access</p>
            <p className="text-2xl font-bold text-teal-600">
              {formatPrice(planPrice, planCurrency)}
            </p>
            <p className="text-xs text-gray-500 mt-1">One-time payment for 1 year</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Card Number
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                  disabled={loading}
                  maxLength={19}
                />
              </div>
            </div>

            {/* Expiration and CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Expiration Date
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={formData.expMonth}
                    onChange={handleExpMonthChange}
                    placeholder="MM"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                    disabled={loading}
                    maxLength={2}
                  />
                  <input
                    type="text"
                    value={formData.expYear}
                    onChange={handleExpYearChange}
                    placeholder="YYYY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                    required
                    disabled={loading}
                    maxLength={4}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  CVC
                </label>
                <input
                  type="text"
                  value={formData.cvc}
                  onChange={handleCvcChange}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  required
                  disabled={loading}
                  maxLength={4}
                />
              </div>
            </div>

            {/* Cardholder Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cardholder Name (Optional)
              </label>
              <input
                type="text"
                value={formData.cardholderName}
                onChange={(e) =>
                  setFormData({ ...formData, cardholderName: e.target.value })
                }
                placeholder="John Doe"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="john@example.com"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                disabled={loading}
              />
            </div>

            {/* Security Notice */}
            <div className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
              <Lock className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-gray-600">
                Your payment information is encrypted and securely processed by PayMongo.
                We never store your full card details.
              </p>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onCancel}
                disabled={loading}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  'Continue'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

