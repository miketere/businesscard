import { prisma } from '@/lib/prisma'
import { getCardAnalytics } from '@/lib/analytics'
import { checkFeatureAccess } from '@/lib/subscription'
import AnalyticsDashboard from '@/components/AnalyticsDashboard'
import Header from '@/components/Header'
import Link from 'next/link'

// Force dynamic rendering to avoid build-time database access
export const dynamic = 'force-dynamic'

const TEMP_USER_ID = 'temp-user-id'

export default async function AnalyticsPage() {
  const hasAnalytics = await checkFeatureAccess('analytics')

  if (!hasAnalytics) {
    return (
      <>
        <Header breadcrumbs={[{ label: 'Analytics' }]} />
        <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Analytics</h1>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6 max-w-md mx-auto">
                <p className="text-yellow-800 font-semibold mb-2">Premium Feature</p>
                <p className="text-yellow-700 text-sm mb-4">
                  Analytics dashboard is available in Basic and Pro plans.
                </p>
                <Link
                  href="/settings/subscription"
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  Upgrade Plan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  const cards = await prisma.card.findMany({
    where: { userId: TEMP_USER_ID },
  })

  const analyticsData = await Promise.all(
    cards.map(async (card) => ({
      card: {
        id: card.id,
        name: card.name,
        template: card.template,
      },
      analytics: await getCardAnalytics(card.id),
    }))
  )

  return (
    <>
      <Header breadcrumbs={[{ label: 'Analytics' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-8">Analytics</h1>
        <AnalyticsDashboard data={analyticsData} />
        </div>
      </div>
    </>
  )
}

