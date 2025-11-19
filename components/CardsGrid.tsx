'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Edit, Eye, Share2, TrendingUp, Grid3x3, List } from 'lucide-react'
import { CardTemplates } from './CardTemplates'

interface Card {
  id: string
  name: string
  title: string | null
  company: string | null
  profileImage: string | null
  isDefault: boolean
  template: string
  primaryColor: string
  secondaryColor: string
  email: string
  phone: string | null
  website: string | null
  address: string | null
  bio: string | null
  socialLinks: string | null
  _count: {
    views: number
    shares: number
  }
}

interface CardsGridProps {
  cards: Card[]
}

type ViewMode = 'portrait' | 'list'

export default function CardsGrid({ cards }: CardsGridProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('portrait')

  if (cards.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      {/* View Toggle */}
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={() => setViewMode('portrait')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'portrait'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Portrait View"
        >
          <Grid3x3 className="w-5 h-5" />
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-lg transition-colors ${
            viewMode === 'list'
              ? 'bg-purple-600 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="List View"
        >
          <List className="w-5 h-5" />
        </button>
      </div>

      {/* Cards Display */}
      {viewMode === 'portrait' ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const TemplateComponent = CardTemplates[card.template as keyof typeof CardTemplates] || CardTemplates.default
            // Parse socialLinks if it's a JSON string
            let socialLinks = {}
            if (card.socialLinks) {
              try {
                socialLinks = typeof card.socialLinks === 'string' ? JSON.parse(card.socialLinks) : card.socialLinks
              } catch (e) {
                socialLinks = {}
              }
            }
            
            const cardData = {
              name: card.name,
              title: card.title || '',
              company: card.company || '',
              email: card.email,
              phone: card.phone || '',
              website: card.website || '',
              address: card.address || '',
              bio: card.bio || '',
              profileImage: card.profileImage || undefined,
              logo: undefined,
              primaryColor: card.primaryColor || '#3B82F6',
              secondaryColor: card.secondaryColor || '#1E40AF',
              template: card.template,
              socialLinks,
            }

            return (
              <div key={card.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 p-6 card-hover shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">{card.name}</h3>
                    <p className="text-neutral-600 text-sm">{card.title || card.company || 'No title'}</p>
                  </div>
                  {card.isDefault && (
                    <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold">
                      Default
                    </span>
                  )}
                </div>

                {/* Portrait Card Preview */}
                <div className="mb-4 flex justify-center overflow-hidden">
                  <div className="w-full max-w-[200px] aspect-[9/16] relative bg-gray-50 rounded-lg">
                    <div 
                      className="absolute inset-0"
                      style={{
                        transform: 'scale(0.52)',
                        transformOrigin: 'top left',
                        width: '192.3%',
                        height: '192.3%',
                      }}
                    >
                      <TemplateComponent cardData={cardData} />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-neutral-500 mb-6">
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4" />
                    {card._count.views}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" />
                    {card._count.shares}
                  </span>
                  <span className="flex items-center gap-1.5 ml-auto">
                    <TrendingUp className="w-4 h-4" />
                    {card._count.views > 0 ? Math.round((card._count.shares / card._count.views) * 100) : 0}%
                  </span>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/dashboard/card/${card.id}`}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:shadow-lg transition-all"
                  >
                    <Eye className="w-4 h-4" />
                    View Details
                  </Link>
                  <Link
                    href={`/edit/${card.id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 transition-all"
                  >
                    <Edit className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="space-y-4">
          {cards.map((card) => {
            const TemplateComponent = CardTemplates[card.template as keyof typeof CardTemplates] || CardTemplates.default
            // Parse socialLinks if it's a JSON string
            let socialLinks = {}
            if (card.socialLinks) {
              try {
                socialLinks = typeof card.socialLinks === 'string' ? JSON.parse(card.socialLinks) : card.socialLinks
              } catch (e) {
                socialLinks = {}
              }
            }
            
            const cardData = {
              name: card.name,
              title: card.title || '',
              company: card.company || '',
              email: card.email,
              phone: card.phone || '',
              website: card.website || '',
              address: card.address || '',
              bio: card.bio || '',
              profileImage: card.profileImage || undefined,
              logo: undefined,
              primaryColor: card.primaryColor || '#3B82F6',
              secondaryColor: card.secondaryColor || '#1E40AF',
              template: card.template,
              socialLinks,
            }

            return (
              <div key={card.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-neutral-200/50 p-6 card-hover shadow-sm">
                <div className="flex items-center gap-6">
                  {/* Card Preview - Portrait */}
                  <div className="flex-shrink-0">
                    <div className="w-32 aspect-[9/16] relative overflow-hidden bg-gray-50 rounded-lg">
                      <div 
                        className="absolute inset-0"
                        style={{
                          transform: 'scale(0.42)',
                          transformOrigin: 'top left',
                          width: '238%',
                          height: '238%',
                        }}
                      >
                        <TemplateComponent cardData={cardData} />
                      </div>
                    </div>
                  </div>

                  {/* Card Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-neutral-900 mb-1 truncate">{card.name}</h3>
                        <p className="text-neutral-600 text-sm truncate">{card.title || card.company || 'No title'}</p>
                      </div>
                      {card.isDefault && (
                        <span className="px-3 py-1 rounded-full bg-teal-100 text-teal-700 text-xs font-semibold flex-shrink-0 ml-2">
                          Default
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-6 text-sm text-neutral-500 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Eye className="w-4 h-4" />
                        {card._count.views}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Share2 className="w-4 h-4" />
                        {card._count.shares}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <TrendingUp className="w-4 h-4" />
                        {card._count.views > 0 ? Math.round((card._count.shares / card._count.views) * 100) : 0}%
                      </span>
                    </div>

                    <div className="flex gap-2">
                      <Link
                        href={`/card/${card.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl gradient-primary text-white font-medium hover:shadow-lg transition-all"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </Link>
                      <Link
                        href={`/edit/${card.id}`}
                        className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-100 text-neutral-700 font-medium hover:bg-neutral-200 transition-all"
                      >
                        <Edit className="w-4 h-4" />
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

