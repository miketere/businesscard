'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Check, ArrowRight, Users, Zap, Crown, Building2, Sparkles } from 'lucide-react'
import SubscriptionPlans from '@/components/SubscriptionPlans'

interface Plan {
  id: string
  name: string
  displayName: string
  price: number
  currency: string
  interval: string
  maxCards: number
  maxContacts: number
  hasAnalytics: boolean
  hasIntegrations: boolean
  hasCustomBranding: boolean
}

export default function PricingPage() {
  const [plans, setPlans] = useState<Plan[]>([])
  const [loading, setLoading] = useState(true)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      const response = await fetch('/api/subscriptions/plans')
      if (response.ok) {
        const data = await response.json()
        setPlans(data.plans || [])
      }
    } catch (error) {
      console.error('Error fetching plans:', error)
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

  // Map existing plans to HiHello-style tiers
  const getPlanTier = (planName: string) => {
    const name = planName.toLowerCase()
    if (name === 'free') return 'personal'
    if (name === 'basic') return 'professional'
    if (name === 'pro') return 'business'
    return 'professional'
  }

  const personalPlan = plans.find(p => p.name.toLowerCase() === 'free')
  const professionalPlan = plans.find(p => p.name.toLowerCase() === 'basic')
  const businessPlan = plans.find(p => p.name.toLowerCase() === 'pro')
  const enterprisePlan = plans.find(p => p.name.toLowerCase() === 'enterprise')

  const features = {
    personal: [
      '4 digital business cards',
      'Email signature generator',
      'QR & widget sharing',
      'Card & badge scanner (5 scans/month)',
      'Virtual backgrounds',
      'Basic templates',
    ],
    professional: [
      '16 digital business cards',
      'Additional card designs',
      'Custom colors & fonts',
      'Card & badge scanner (20 scans/month)',
      'Branding for QR codes',
      'Add videos, badges, & PDFs',
      'Card analytics',
      'Auto-tagging for events',
      'Manage contacts',
      'Notes & tags for contacts',
      'Contact enrichment',
    ],
    business: [
      'Unlimited digital business cards',
      'Cards for your whole team',
      'Templates for sub-teams',
      'Universal contact scanner (Unlimited scans)',
      'Team email signatures',
      'Team virtual backgrounds',
      'CRM integrations',
      'Manage team events',
      'SSO & directory sync',
      'Individual & team analytics',
      'Team leaderboard',
      'Custom lead capture forms',
      'Unlimited contact enrichment',
    ],
    enterprise: [
      'Unlimited digital business cards',
      'Cards for your whole company',
      'Templates for departments',
      'Universal contact scanner (Unlimited scans)',
      'Email signature management',
      'Custom virtual backgrounds',
      'Verified badge on cards',
      'Manage company events',
      'SSO & directory sync (Advanced SAML/SCIM)',
      'SOC II level security',
      'Reports & audits',
      'Dedicated Success team',
      'Onboarding & training',
      'Brand Partner Program',
    ],
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-orange-50/50">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-effect border-b border-neutral-200/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-icon.svg" 
                alt="NexCard" 
                width={44} 
                height={44}
                className="rounded-xl"
              />
              <span className="text-2xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                NexCard
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-neutral-700 hover:text-teal-600 font-medium transition-colors hidden sm:block"
              >
                Dashboard
              </Link>
              <Link 
                href="/create" 
                className="px-6 py-2.5 rounded-xl gradient-primary text-white font-semibold hover:shadow-xl hover:shadow-teal-500/30 transition-all flex items-center gap-2"
              >
                Get Started
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-100 to-orange-100 text-teal-700 text-sm font-medium mb-8">
              <Sparkles className="w-4 h-4 text-orange-500" />
              <span>Simple, Transparent Pricing</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                Pricing Plans
              </span>
              <br />
              <span className="text-neutral-900">for Everyone</span>
            </h1>
            <p className="text-xl text-neutral-600 mb-8 max-w-2xl mx-auto">
              Choose the plan that&apos;s right for you or your organization. Start free and upgrade as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {/* Personal Plan */}
              <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-gray-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal</h3>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gray-900">Free</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Best for personal connections</p>
                </div>
                <ul className="space-y-3 mb-8">
                  {features.personal.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/create"
                  className="block w-full text-center px-6 py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                >
                  Create my first card
                </Link>
              </div>

              {/* Professional Plan */}
              {professionalPlan && (
                <div className="bg-white rounded-2xl border-2 border-teal-300 p-8 shadow-lg relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-teal-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                      Popular
                    </span>
                  </div>
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center mb-4">
                      <Zap className="w-6 h-6 text-teal-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Professional</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatPrice(professionalPlan.price, professionalPlan.currency)}
                      </span>
                      <span className="text-gray-600">/ {professionalPlan.interval}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Network with a branded card</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {features.professional.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/settings/subscription"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors"
                  >
                    Sign up
                  </Link>
                </div>
              )}

              {/* Business Plan */}
              {businessPlan && (
                <div className="bg-white rounded-2xl border-2 border-orange-400 p-8 shadow-lg">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                      <Crown className="w-6 h-6 text-orange-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Business</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">
                        {formatPrice(businessPlan.price, businessPlan.currency)}
                      </span>
                      <span className="text-gray-600">/ {businessPlan.interval}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Unify your brand everywhere</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {features.business.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/settings/subscription"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
                  >
                    View pricing
                  </Link>
                </div>
              )}

              {/* Enterprise Plan */}
              {enterprisePlan ? (
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <Building2 className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">Custom</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Scale securely, stay on-brand</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {features.enterprise.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/support"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Contact us
                  </Link>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
                      <Building2 className="w-6 h-6 text-gray-600" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-gray-900">Custom</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">Scale securely, stay on-brand</p>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {features.enterprise.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    href="/support"
                    className="block w-full text-center px-6 py-3 rounded-xl bg-gray-100 text-gray-900 font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Contact us
                  </Link>
                </div>
              )}
            </div>

            {/* Enterprise CTA */}
            <div className="bg-gradient-to-r from-teal-600 to-orange-500 rounded-2xl p-8 text-center text-white mb-16">
              <h3 className="text-2xl font-bold mb-2">Over 100 Users?</h3>
              <p className="text-white/90 mb-6">
                Looking for a company-wide rollout? If your team has 101 or more users, we&apos;ll work with you to deliver the best solution at the right price.
              </p>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-white text-teal-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Book a Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Feature Comparison Table */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
              <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
                <h2 className="text-2xl font-bold text-gray-900">Compare our plans</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Features</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Personal</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Professional</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Business</th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Enterprise</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Number of users</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">1</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">1</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">5+</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">101+</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Number of cards</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">4</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">16</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">Unlimited</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-900">Unlimited</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Unlimited card sharing</td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Customizable virtual backgrounds</td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Analytics</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">CRM integrations</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">SSO & directory sync</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 text-sm text-gray-700">Dedicated support</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center">—</td>
                      <td className="px-6 py-4 text-center"><Check className="w-5 h-5 text-teal-600 mx-auto" /></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-neutral-200/50 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo-icon.svg" 
                alt="NexCard" 
                width={40} 
                height={40}
                className="rounded-xl"
              />
              <span className="text-xl font-bold bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 bg-clip-text text-transparent">
                NexCard
              </span>
            </Link>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/help" className="text-neutral-600 hover:text-teal-600 transition-colors">
                Help
              </Link>
              <Link href="/support" className="text-neutral-600 hover:text-teal-600 transition-colors">
                Support
              </Link>
              <span className="text-neutral-400">•</span>
              <span className="text-neutral-500">
                © 2024 NexCard. All rights reserved.
              </span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

