'use client'

import Header from '@/components/Header'

export default function ContactExchangePage() {
  return (
    <>
      <Header breadcrumbs={[{ label: 'Settings' }, { label: 'Contact Exchange' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8">Contact Exchange</h1>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-sm p-6 sm:p-8">
            <p className="text-sm sm:text-base text-gray-600">Contact exchange settings coming soon...</p>
          </div>
        </div>
      </div>
    </>
  )
}

