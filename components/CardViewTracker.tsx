'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

export default function CardViewTracker({ cardId }: { cardId: string }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    // Extract UTM parameters
    const utmParams = {
      source: searchParams?.get('utm_source') || undefined,
      medium: searchParams?.get('utm_medium') || undefined,
      campaign: searchParams?.get('utm_campaign') || undefined,
      term: searchParams?.get('utm_term') || undefined,
      content: searchParams?.get('utm_content') || undefined,
    }

    // Track view with proper headers
    fetch('/api/analytics/view', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cardId, utmParams }),
    }).catch(error => {
      console.error('Failed to track view:', error)
    })
  }, [cardId, searchParams])

  return null
}

