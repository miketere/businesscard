/**
 * PayMongo API Service
 * Handles all interactions with PayMongo's API (Subscriptions and Payment Intents)
 */

const PAYMONGO_API_BASE = 'https://api.paymongo.com/v1'

interface PayMongoPlan {
  id: string
  type: string
  attributes: {
    name: string
    amount: number
    currency: string
    interval: string
    interval_count: number
    created: number
    updated: number
  }
}

interface PayMongoSubscription {
  id: string
  type: string
  attributes: {
    status: string
    current_period_start: number
    current_period_end: number
    cancel_at_period_end: boolean
    cancelled_at: number | null
    created: number
    updated: number
  }
  relationships: {
    plan: {
      data: {
        id: string
        type: string
      }
    }
  }
}

interface PayMongoInvoice {
  id: string
  type: string
  attributes: {
    amount: number
    currency: string
    status: string
    paid_at: number | null
    due_date: number
    created: number
    updated: number
  }
}

interface PayMongoPaymentMethod {
  id: string
  type: string
  attributes: {
    type: string
    details: {
      card_number?: string
      exp_month?: number
      exp_year?: number
      cvc?: string
      last4?: string
      exp_month_display?: number
      exp_year_display?: number
      brand?: string
    }
    billing?: {
      name?: string
      email?: string
      phone?: string
      address?: {
        line1?: string
        line2?: string
        city?: string
        state?: string
        postal_code?: string
        country?: string
      }
    }
    created: number
    updated: number
  }
}

/**
 * Get PayMongo API headers with authentication
 */
function getHeaders(usePublicKey = false): HeadersInit {
  const apiKey = usePublicKey
    ? process.env.PAYMONGO_PUBLIC_KEY
    : process.env.PAYMONGO_SECRET_KEY
  
  if (!apiKey) {
    // Return a more helpful error message
    const keyName = usePublicKey ? 'PAYMONGO_PUBLIC_KEY' : 'PAYMONGO_SECRET_KEY'
    throw new Error(
      `${keyName} is not set. Please add it to your environment variables. ` +
      `For subscriptions to work, you need to set both PAYMONGO_PUBLIC_KEY and PAYMONGO_SECRET_KEY in your Vercel environment variables.`
    )
  }

  return {
    'Authorization': `Basic ${Buffer.from(apiKey + ':').toString('base64')}`,
    'Content-Type': 'application/json',
  }
}

/**
 * Create a payment method in PayMongo
 * Note: This should be called from the client side using the public key
 * For security, we'll create an API endpoint that handles this server-side
 */
export async function createPaymentMethod(data: {
  type: 'card'
  cardNumber: string
  expMonth: number
  expYear: number
  cvc: string
  billing?: {
    name?: string
    email?: string
    phone?: string
    address?: {
      line1?: string
      line2?: string
      city?: string
      state?: string
      postal_code?: string
      country?: string
    }
  }
}, usePublicKey = true): Promise<PayMongoPaymentMethod> {
  // Ensure card number is clean (digits only, no spaces)
  const cleanCardNumber = String(data.cardNumber || '').replace(/\s/g, '').replace(/\D/g, '').trim()
  
  // Validate card number format before sending
  if (!cleanCardNumber || cleanCardNumber.length < 13 || cleanCardNumber.length > 19) {
    throw new Error(`Invalid card number format: must be 13-19 digits, got ${cleanCardNumber.length} digits`)
  }
  
  // Ensure it's only digits
  if (!/^\d{13,19}$/.test(cleanCardNumber)) {
    throw new Error('Card number must contain only digits (13-19 digits)')
  }
  
  // Prepare billing object - only include if it has meaningful data
  const billing = data.billing && (
    data.billing.name || 
    data.billing.email || 
    data.billing.phone || 
    data.billing.address
  ) ? data.billing : undefined

  // Use public key for payment method creation (client-side safe)
  const requestBody: any = {
    data: {
      attributes: {
        type: data.type,
        details: {
          card_number: cleanCardNumber, // Send cleaned card number as string
          exp_month: parseInt(String(data.expMonth)),
          exp_year: parseInt(String(data.expYear)),
          cvc: String(data.cvc),
        },
      },
    },
  }
  
  // Only add billing if it exists
  if (billing) {
    requestBody.data.attributes.billing = billing
  }

  const response = await fetch(`${PAYMONGO_API_BASE}/payment_methods`, {
    method: 'POST',
    headers: getHeaders(usePublicKey), // Use public key by default
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Create a subscription plan in PayMongo
 * According to: https://developers.paymongo.com/docs/subscriptions-api#/
 */
export async function createPlan(data: {
  name: string
  description?: string
  amount: number // in cents
  currency: string
  interval: string // 'monthly' or 'yearly' (not 'month' or 'year')
  interval_count?: number
  cycle_count?: number // optional, if not provided plan runs indefinitely
}): Promise<PayMongoPlan> {
  // Convert interval format: 'month' -> 'monthly', 'year' -> 'yearly'
  const intervalMap: Record<string, string> = {
    month: 'monthly',
    monthly: 'monthly',
    year: 'yearly',
    yearly: 'yearly',
  }
  const paymongoInterval = intervalMap[data.interval.toLowerCase()] || data.interval

  const requestBody: any = {
    data: {
      attributes: {
        name: data.name,
        amount: String(data.amount), // PayMongo expects amount as string
        currency: data.currency,
        interval: paymongoInterval,
        interval_count: data.interval_count || 1,
      },
    },
  }

  if (data.description) {
    requestBody.data.attributes.description = data.description
  }

  if (data.cycle_count !== undefined) {
    requestBody.data.attributes.cycle_count = data.cycle_count
  }

  const response = await fetch(`${PAYMONGO_API_BASE}/plans`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(requestBody),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Create a customer in PayMongo
 */
export async function createCustomer(data: {
  email?: string
  phone?: string
  firstName?: string
  lastName?: string
}): Promise<{ id: string }> {
  const attributes: any = {}

  if (data.email) attributes.email = data.email
  if (data.phone) attributes.phone = data.phone
  if (data.firstName || data.lastName) {
    attributes.name = [data.firstName, data.lastName].filter(Boolean).join(' ')
  }

  const response = await fetch(`${PAYMONGO_API_BASE}/customers`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        attributes,
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return { id: result.data.id }
}

/**
 * Create a subscription for a customer
 * According to: https://developers.paymongo.com/reference/create-a-subscription
 * API Reference format: customer (ID), plan (ID), default_payment_method (ID)
 */
export async function createSubscription(data: {
  customerId: string
  planId: string
  paymentMethodId: string
}): Promise<PayMongoSubscription> {
  // According to PayMongo API, attributes should contain:
  // - customer: customer ID (string)
  // - plan: plan ID (string)
  // - default_payment_method: payment method ID (string)
  const response = await fetch(`${PAYMONGO_API_BASE}/subscriptions`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        attributes: {
          customer: data.customerId,
          plan: data.planId,
          default_payment_method: data.paymentMethodId,
        },
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const errorDetails = typeof error === 'object' ? JSON.stringify(error, null, 2) : error
    throw new Error(`PayMongo API error: ${errorDetails}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Get subscription details from PayMongo
 */
export async function getSubscription(subscriptionId: string): Promise<PayMongoSubscription> {
  const response = await fetch(`${PAYMONGO_API_BASE}/subscriptions/${subscriptionId}`, {
    method: 'GET',
    headers: getHeaders(),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Cancel a subscription
 */
export async function cancelSubscription(subscriptionId: string): Promise<PayMongoSubscription> {
  const response = await fetch(`${PAYMONGO_API_BASE}/subscriptions/${subscriptionId}/cancel`, {
    method: 'POST',
    headers: getHeaders(),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Update subscription (change plan)
 */
export async function updateSubscription(
  subscriptionId: string,
  planId: string
): Promise<PayMongoSubscription> {
  const response = await fetch(`${PAYMONGO_API_BASE}/subscriptions/${subscriptionId}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        attributes: {
          plan: {
            id: planId,
            type: 'plan',
          },
        },
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Get invoices for a subscription
 */
export async function getInvoices(subscriptionId: string): Promise<PayMongoInvoice[]> {
  const response = await fetch(
    `${PAYMONGO_API_BASE}/invoices?subscription_id=${subscriptionId}`,
    {
      method: 'GET',
      headers: getHeaders(),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(`PayMongo API error: ${JSON.stringify(error)}`)
  }

  const result = await response.json()
  return result.data || []
}

/**
 * Verify webhook signature
 * PayMongo sends signature in format: t=<timestamp>,v1=<signature>
 */
export function verifyWebhookSignature(
  payload: string,
  signatureHeader: string,
  secret: string
): boolean {
  try {
    // Parse signature header (format: t=<timestamp>,v1=<signature>)
    const parts = signatureHeader.split(',')
    const signaturePart = parts.find((p) => p.startsWith('v1='))
    if (!signaturePart) {
      return false
    }
    const signature = signaturePart.split('=')[1]

    // PayMongo uses HMAC SHA256 for webhook verification
    const crypto = require('crypto')
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(payload)
      .digest('hex')

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    )
  } catch (error) {
    console.error('Error verifying webhook signature:', error)
    return false
  }
}

/**
 * Handle webhook event
 */
export interface WebhookEvent {
  id: string
  type: string
  attributes: {
    type: string
    livemode: boolean
    data: {
      id: string
      type: string
      attributes: any
    }
    created: number
  }
}

export function parseWebhookEvent(body: any): WebhookEvent {
  return body.data
}

/**
 * Payment Intent interfaces
 */
interface PayMongoPaymentIntent {
  id: string
  type: string
  attributes: {
    amount: number
    currency: string
    status: string
    client_key: string
    description?: string
    created: number
    updated: number
  }
}

/**
 * Create a Payment Intent for one-time payment
 * According to: https://developers.paymongo.com/reference/create-a-payment-intent
 */
export async function createPaymentIntent(data: {
  amount: number // in cents
  currency: string
  description?: string
  paymentMethodAllowed?: string[] // Defaults to ['card']
}): Promise<PayMongoPaymentIntent> {
  const response = await fetch(`${PAYMONGO_API_BASE}/payment_intents`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({
      data: {
        attributes: {
          amount: data.amount,
          currency: data.currency,
          description: data.description || 'Plan purchase',
          payment_method_allowed: data.paymentMethodAllowed || ['card'], // Required by PayMongo
        },
      },
    }),
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const errorDetails = typeof error === 'object' ? JSON.stringify(error, null, 2) : error
    throw new Error(`PayMongo API error: ${errorDetails}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Attach payment method to payment intent
 * According to: https://developers.paymongo.com/reference/attach-to-payment-intent
 */
export async function attachPaymentMethodToIntent(data: {
  paymentIntentId: string
  paymentMethodId: string
  clientKey: string
}): Promise<PayMongoPaymentIntent> {
  const response = await fetch(
    `${PAYMONGO_API_BASE}/payment_intents/${data.paymentIntentId}/attach`,
    {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        data: {
          attributes: {
            payment_method: data.paymentMethodId,
            client_key: data.clientKey,
          },
        },
      }),
    }
  )

  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    const errorDetails = typeof error === 'object' ? JSON.stringify(error, null, 2) : error
    throw new Error(`PayMongo API error: ${errorDetails}`)
  }

  const result = await response.json()
  return result.data
}

/**
 * Create and process a one-time payment
 * Combines payment intent creation and attachment
 */
export async function processOneTimePayment(data: {
  amount: number // in cents
  currency: string
  paymentMethodId: string
  description?: string
}): Promise<{
  id: string
  status: string
  client_key: string
}> {
  // Step 1: Create payment intent
  const paymentIntent = await createPaymentIntent({
    amount: data.amount,
    currency: data.currency,
    description: data.description,
  })

  // Step 2: Attach payment method
  const attachedIntent = await attachPaymentMethodToIntent({
    paymentIntentId: paymentIntent.id,
    paymentMethodId: data.paymentMethodId,
    clientKey: paymentIntent.attributes.client_key,
  })

  return {
    id: attachedIntent.id,
    status: attachedIntent.attributes.status,
    client_key: attachedIntent.attributes.client_key,
  }
}

