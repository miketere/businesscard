import { NextRequest, NextResponse } from 'next/server'
import { createPaymentMethod } from '@/lib/paymongo'
import { getSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const {
      type,
      cardNumber,
      expMonth,
      expYear,
      cvc,
      billing,
    } = body

    // Get user session to use email as fallback
    const session = await getSession()
    const userEmail = session?.user?.email

    if (!type || !cardNumber || !expMonth || !expYear || !cvc) {
      return NextResponse.json(
        { error: 'Missing required payment method fields' },
        { status: 400 }
      )
    }

    // Validate and clean card number (must be digits only, 13-19 digits)
    const cleanedCardNumber = cardNumber.replace(/\s/g, '').replace(/\D/g, '')
    
    if (!cleanedCardNumber || cleanedCardNumber.length < 13 || cleanedCardNumber.length > 19) {
      return NextResponse.json(
        { error: 'Invalid card number. Please enter a valid 13-19 digit card number.' },
        { status: 400 }
      )
    }
    
    // Ensure it's only digits
    if (!/^\d+$/.test(cleanedCardNumber)) {
      return NextResponse.json(
        { error: 'Card number must contain only digits' },
        { status: 400 }
      )
    }

    // Validate expiration
    const currentYear = new Date().getFullYear()
    const currentMonth = new Date().getMonth() + 1
    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth < currentMonth)
    ) {
      return NextResponse.json(
        { error: 'Card has expired' },
        { status: 400 }
      )
    }

    // Validate CVC
    if (cvc.length < 3 || cvc.length > 4) {
      return NextResponse.json(
        { error: 'Invalid CVC' },
        { status: 400 }
      )
    }

    // Prepare billing with email fallback to user's login email
    const billingWithEmail = billing
      ? {
          ...billing,
          email: billing.email || userEmail || undefined,
        }
      : userEmail
        ? { email: userEmail }
        : undefined

    // Create payment method in PayMongo
    const paymentMethod = await createPaymentMethod({
      type: 'card',
      cardNumber: cleanedCardNumber,
      expMonth: parseInt(expMonth),
      expYear: parseInt(expYear),
      cvc,
      billing: billingWithEmail,
    })

    return NextResponse.json({
      paymentMethod: {
        id: paymentMethod.id,
        type: paymentMethod.attributes.type,
        details: {
          last4: paymentMethod.attributes.details.last4,
          brand: paymentMethod.attributes.details.brand,
          exp_month: paymentMethod.attributes.details.exp_month_display,
          exp_year: paymentMethod.attributes.details.exp_year_display,
        },
      },
    })
  } catch (error: any) {
    console.error('Error creating payment method:', error)
    
    // Check if it's a missing environment variable error
    if (error.message?.includes('PAYMONGO_PUBLIC_KEY is not set')) {
      return NextResponse.json(
        {
          error: 'Payment processing is not configured. Please contact support or check your environment variables.',
          details: 'PAYMONGO_PUBLIC_KEY is required for payment processing.',
        },
        { status: 500 }
      )
    }
    
    return NextResponse.json(
      {
        error:
          error.message || 'Failed to create payment method. Please check your card details.',
      },
      { status: 500 }
    )
  }
}

