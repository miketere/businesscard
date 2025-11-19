'use client'

import Header from '@/components/Header'
import Link from 'next/link'

export default function IntegrationsPage() {
  return (
    <>
      <Header breadcrumbs={[{ label: 'Settings' }, { label: 'Integrations' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Integrations</h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-sm p-6 sm:p-8">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
              <p className="text-yellow-800 font-semibold text-sm sm:text-base">Premium Feature</p>
              <p className="text-yellow-700 text-xs sm:text-sm mt-1 mb-3">
                Integrations are available in Basic and Pro plans.
              </p>
              <Link
                href="/settings/subscription"
                className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors text-xs sm:text-sm w-full sm:w-auto justify-center"
              >
                Upgrade Plan
              </Link>
            </div>
            <p className="text-sm sm:text-base text-gray-600">Integrations settings coming soon...</p>
          </div>
        </div>
      </div>
    </>
  )
}

