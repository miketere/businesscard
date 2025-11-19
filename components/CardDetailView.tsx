'use client'

import { useState } from 'react'
import { CardTemplates } from './CardTemplates'
import { QRCodeSVG } from 'qrcode.react'
import { 
  Copy, 
  Check, 
  Mail, 
  MessageSquare, 
  Download, 
  Share2, 
  Eye, 
  Users, 
  BarChart3,
  Settings,
  ExternalLink,
  Sparkles
} from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { generateVCard } from '@/lib/utils'

interface CardDetailViewProps {
  card: {
    id: string
    name: string
    title: string | null
    company: string | null
    email: string
    phone: string | null
    website: string | null
    address: string | null
    bio: string | null
    profileImage: string | null
    logo: string | null
    primaryColor: string
    secondaryColor: string
    template: string
    socialLinks: string | null
    isDefault: boolean
    createdAt: Date
    updatedAt: Date
  }
  cardData: {
    name: string
    title?: string
    company?: string
    email: string
    phone?: string
    website?: string
    address?: string
    bio?: string
    profileImage?: string
    logo?: string
    primaryColor: string
    secondaryColor: string
    template: string
    socialLinks?: Record<string, string>
  }
  cardUrl: string
  analytics: {
    totalViews: number
    totalShares: number
    totalSaves: number
    totalContacts: number
    viewsByDate?: Record<string, number>
    sharesByMethod?: Record<string, number>
  }
}

export default function CardDetailView({ card, cardData, cardUrl, analytics }: CardDetailViewProps) {
  const [activeTab, setActiveTab] = useState<'share' | 'analytics' | 'settings'>('share')
  const [copied, setCopied] = useState(false)
  const [emailModal, setEmailModal] = useState(false)
  const [emailAddress, setEmailAddress] = useState('')

  const TemplateComponent = CardTemplates[cardData.template as keyof typeof CardTemplates] || CardTemplates.default

  const copyToClipboard = () => {
    navigator.clipboard.writeText(cardUrl)
    setCopied(true)
    toast.success('Link copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const handleEmailShare = async () => {
    if (!emailAddress) {
      toast.error('Please enter an email address')
      return
    }

    try {
      const response = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: emailAddress,
          cardUrl,
          cardName: card.name,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success('Card shared via email!')
        setEmailModal(false)
        setEmailAddress('')
      } else {
        throw new Error(data.error || 'Failed to send email')
      }
    } catch (error: any) {
      toast.error(error.message || 'Failed to send email')
    }
  }

  const handleDownloadVCard = () => {
    const vcard = generateVCard({
      name: card.name,
      title: card.title,
      company: card.company,
      email: card.email,
      phone: card.phone,
      website: card.website,
      address: card.address,
    })
    const blob = new Blob([vcard], { type: 'text/vcard' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${card.name.replace(/\s+/g, '_')}.vcf`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('vCard downloaded!')
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Mobile: Stack layout, Desktop: Side-by-side */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Pane: Card Preview */}
        <div className="w-full lg:w-2/5 xl:w-2/5">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-xl p-6 sm:p-8 sticky top-20">
            {/* Card Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-1">{card.name}</h1>
                  {(card.title || card.company) && (
                    <p className="text-neutral-600 text-sm sm:text-base">
                      {card.title && card.company ? `${card.title} at ${card.company}` : card.title || card.company}
                    </p>
                  )}
                </div>
                {card.isDefault && (
                  <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold whitespace-nowrap">
                    Default
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-xs sm:text-sm text-neutral-500 mt-3">
                <span className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {analytics.totalViews} views
                </span>
                <span className="flex items-center gap-1.5">
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  {analytics.totalShares} shares
                </span>
              </div>
            </div>

            {/* Card Preview */}
            <div className="flex justify-center mb-6">
              <div className="w-full max-w-[280px] sm:max-w-sm">
                <TemplateComponent cardData={cardData} />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-3">
              <Link
                href={`/card/${card.id}`}
                target="_blank"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-teal-600 to-orange-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <ExternalLink className="w-4 h-4" />
                View Public Card
              </Link>
              <Link
                href={`/edit/${card.id}`}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-neutral-100 text-neutral-700 rounded-xl font-semibold hover:bg-neutral-200 transition-all"
              >
                <Settings className="w-4 h-4" />
                Edit Card
              </Link>
            </div>
          </div>
        </div>

        {/* Right Pane: Share & Analytics */}
        <div className="w-full lg:w-3/5 xl:w-3/5">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl border border-neutral-200/50 shadow-xl overflow-hidden">
            {/* Tabs */}
            <div className="border-b border-neutral-200">
              <nav className="flex overflow-x-auto hide-scrollbar" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('share')}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'share'
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }
                  `}
                >
                  <Share2 className="w-4 h-4" />
                  <span className="hidden sm:inline">Share</span>
                </button>
                <button
                  onClick={() => setActiveTab('analytics')}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'analytics'
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }
                  `}
                >
                  <BarChart3 className="w-4 h-4" />
                  <span className="hidden sm:inline">Analytics</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`
                    flex items-center gap-2 px-6 py-4 border-b-2 font-medium text-sm transition-colors whitespace-nowrap
                    ${activeTab === 'settings'
                      ? 'border-teal-600 text-teal-600'
                      : 'border-transparent text-neutral-500 hover:text-neutral-700 hover:border-neutral-300'
                    }
                  `}
                >
                  <Settings className="w-4 h-4" />
                  <span className="hidden sm:inline">Settings</span>
                </button>
              </nav>
            </div>

            {/* Tab Content */}
            <div className="p-6 sm:p-8">
              {activeTab === 'share' && (
                <div className="space-y-8">
                  {/* Analytics Summary */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 border border-blue-200">
                      <div className="flex items-center justify-between mb-2">
                        <Eye className="w-4 h-4 text-blue-600" />
                        <span className="text-xs text-blue-600 font-medium">Views</span>
                      </div>
                      <p className="text-2xl font-bold text-blue-900">{analytics.totalViews}</p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 border border-purple-200">
                      <div className="flex items-center justify-between mb-2">
                        <Users className="w-4 h-4 text-purple-600" />
                        <span className="text-xs text-purple-600 font-medium">Contacts</span>
                      </div>
                      <p className="text-2xl font-bold text-purple-900">{analytics.totalContacts}</p>
                    </div>
                    <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                      <div className="flex items-center justify-between mb-2">
                        <Download className="w-4 h-4 text-orange-600" />
                        <span className="text-xs text-orange-600 font-medium">Saves</span>
                      </div>
                      <p className="text-2xl font-bold text-orange-900">{analytics.totalSaves}</p>
                    </div>
                    <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                      <div className="flex items-center justify-between mb-2">
                        <Share2 className="w-4 h-4 text-teal-600" />
                        <span className="text-xs text-teal-600 font-medium">Shares</span>
                      </div>
                      <p className="text-2xl font-bold text-teal-900">{analytics.totalShares}</p>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-8 border border-slate-200">
                    <div className="text-center">
                      <h3 className="text-lg font-bold text-neutral-900 mb-4">QR Code</h3>
                      <div className="inline-flex p-4 bg-white rounded-2xl border-4 border-teal-500 shadow-lg mb-4">
                        <QRCodeSVG 
                          value={cardUrl} 
                          size={200}
                          level="H"
                          includeMargin={true}
                        />
                      </div>
                      <p className="text-sm text-neutral-600 mt-4">
                        Scan or click to view your card
                      </p>
                    </div>
                  </div>

                  {/* Share Options */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-bold text-neutral-900">Share Your Card</h3>
                    
                    {/* Copy Link */}
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 hover:border-indigo-300 transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-600 flex items-center justify-center">
                          {copied ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <Copy className="w-5 h-5 text-white" />
                          )}
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-neutral-900">Copy Link</p>
                          <p className="text-xs text-neutral-500 truncate max-w-[200px] sm:max-w-none">{cardUrl}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-indigo-600 group-hover:text-indigo-700">
                        {copied ? 'Copied!' : 'Copy'}
                      </span>
                    </button>

                    {/* Share Buttons Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setEmailModal(true)}
                        className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-neutral-200 rounded-xl hover:border-teal-300 hover:bg-teal-50 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center group-hover:bg-teal-200 transition-colors">
                          <Mail className="w-6 h-6 text-teal-600" />
                        </div>
                        <span className="text-sm font-medium text-neutral-700">Email</span>
                      </button>

                      <button
                        onClick={handleDownloadVCard}
                        className="flex flex-col items-center gap-2 p-4 bg-white border-2 border-neutral-200 rounded-xl hover:border-orange-300 hover:bg-orange-50 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                          <Download className="w-6 h-6 text-orange-600" />
                        </div>
                        <span className="text-sm font-medium text-neutral-700">Download</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Performance Overview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                        <div className="flex items-center justify-between mb-3">
                          <Eye className="w-5 h-5 text-blue-600" />
                          <span className="text-xs text-blue-600 font-medium">Total Views</span>
                        </div>
                        <p className="text-3xl font-bold text-blue-900">{analytics.totalViews}</p>
                        <p className="text-xs text-blue-700 mt-1">All time</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                        <div className="flex items-center justify-between mb-3">
                          <Users className="w-5 h-5 text-purple-600" />
                          <span className="text-xs text-purple-600 font-medium">Contacts Captured</span>
                        </div>
                        <p className="text-3xl font-bold text-purple-900">{analytics.totalContacts}</p>
                        <p className="text-xs text-purple-700 mt-1">Leads generated</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-semibold text-neutral-900">View Full Analytics</h4>
                      <Link
                        href={`/analytics?card=${card.id}`}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1"
                      >
                        Go to Dashboard
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                    <p className="text-sm text-neutral-600">
                      Get detailed insights into your card&apos;s performance, including views by location, device, and time.
                    </p>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-4">Card Settings</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-xl">
                        <div>
                          <p className="font-medium text-neutral-900">Default Card</p>
                          <p className="text-sm text-neutral-600">Set as your primary business card</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          card.isDefault 
                            ? 'bg-teal-100 text-teal-700' 
                            : 'bg-neutral-200 text-neutral-600'
                        }`}>
                          {card.isDefault ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      
                      <div className="p-4 bg-neutral-50 rounded-xl">
                        <p className="font-medium text-neutral-900 mb-2">Card Information</p>
                        <div className="space-y-2 text-sm text-neutral-600">
                          <p><span className="font-medium">Created:</span> {new Date(card.createdAt).toLocaleDateString()}</p>
                          <p><span className="font-medium">Last Updated:</span> {new Date(card.updatedAt).toLocaleDateString()}</p>
                          <p><span className="font-medium">Template:</span> {card.template}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {emailModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl">
            <h3 className="text-xl font-bold mb-4">Share via Email</h3>
            <input
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="Enter email address"
              className="w-full px-4 py-3 border-2 border-neutral-200 rounded-xl mb-4 focus:outline-none focus:border-teal-500"
              onKeyDown={(e) => e.key === 'Enter' && handleEmailShare()}
            />
            <div className="flex gap-3">
              <button
                onClick={handleEmailShare}
                className="flex-1 bg-gradient-to-r from-teal-600 to-orange-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Send
              </button>
              <button
                onClick={() => {
                  setEmailModal(false)
                  setEmailAddress('')
                }}
                className="flex-1 bg-neutral-100 text-neutral-700 py-3 rounded-xl font-semibold hover:bg-neutral-200 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

