'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import CardPreview from './CardPreview'
import CardCreationTabs from './CardCreationTabs'
import DesignSelector from './DesignSelector'
import ColorPicker from './ColorPicker'
import FontSelector from './FontSelector'
import ProfilePhotoUpload from './ProfilePhotoUpload'
import LogoUpload from './LogoUpload'
import SocialLinksEditor from './SocialLinksEditor'
import { getTemplateById } from '@/lib/templates'

interface SocialLinks {
  linkedin?: string
  twitter?: string
  github?: string
  instagram?: string
  facebook?: string
}

interface CardData {
  name: string
  title: string
  company: string
  email: string
  phone: string
  website: string
  address: string
  bio: string
  primaryColor: string
  secondaryColor: string
  template: string
  socialLinks: SocialLinks
}

const designs = [
  { id: 'default', name: 'Classic', isPro: false, template: 'default' },
  { id: 'modern', name: 'Modern', isPro: true, template: 'modern' },
  { id: 'minimal', name: 'Minimal', isPro: true, template: 'minimal' },
  { id: 'flat', name: 'Flat', isPro: true, template: 'default' }, // Maps to default for now
  { id: 'blend', name: 'Blend', isPro: true, template: 'modern' }, // Maps to modern for now
]

export default function CardEditorNew({ cardId, initialData }: { cardId?: string; initialData?: Partial<CardData> }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('display')
  
  // Get template from URL query param
  const templateParam = searchParams?.get('template')
  const selectedTemplate = templateParam ? getTemplateById(templateParam) : null
  
  const [cardData, setCardData] = useState<CardData>({
    name: initialData?.name || '',
    title: initialData?.title || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    address: initialData?.address || '',
    bio: initialData?.bio || '',
    primaryColor: selectedTemplate?.previewColors.primary || initialData?.primaryColor || '#9333EA',
    secondaryColor: selectedTemplate?.previewColors.secondary || initialData?.secondaryColor || '#A855F7',
    template: selectedTemplate?.id || initialData?.template || 'default',
    socialLinks: initialData?.socialLinks || {},
  })
  const [profileImage, setProfileImage] = useState<string | null>(initialData?.profileImage || null)
  const [logo, setLogo] = useState<string | null>(initialData?.logo || null)
  const [selectedFont, setSelectedFont] = useState('nunito')

  // Update template when query param changes
  useEffect(() => {
    if (selectedTemplate) {
      setCardData(prev => ({
        ...prev,
        template: selectedTemplate.id,
        primaryColor: selectedTemplate.previewColors.primary,
        secondaryColor: selectedTemplate.previewColors.secondary,
      }))
      toast.success(`Template "${selectedTemplate.name}" selected!`)
    }
  }, [templateParam, selectedTemplate])

  const handleSubmit = async () => {
    setLoading(true)

    try {
      const url = cardId ? `/api/cards/${cardId}` : '/api/cards'
      const method = cardId ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...cardData,
          profileImage,
          logo,
          socialLinks: JSON.stringify(cardData.socialLinks),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast.success(cardId ? 'Card updated!' : 'Card created!')
        router.push(`/dashboard`)
      } else {
        throw new Error(data.error || 'Failed to save card')
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const tabs = [
    { id: 'display', label: 'Display' },
    { id: 'information', label: 'Information' },
    { id: 'fields', label: 'Fields' },
    { id: 'card', label: 'Card' },
  ]

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] pt-16">
      {/* Left: Preview */}
      <div className="w-full lg:w-1/2 p-4 sm:p-8 bg-gray-50 overflow-y-auto flex items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-200">
        <div className="w-full max-w-md">
          <CardPreview
            cardData={{
              ...cardData,
              profileImage: profileImage || undefined,
              logo: logo || undefined,
            }}
            showQR={false}
          />
        </div>
      </div>

      {/* Right: Customization Panel */}
      <div className="w-full lg:w-1/2 bg-white flex flex-col overflow-y-auto">
        <CardCreationTabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab}>
          <div className="p-6 space-y-6">
            {activeTab === 'display' && (
              <div className="space-y-6">
                <DesignSelector
                  designs={designs}
                  selected={designs.find(d => d.template === cardData.template)?.id || 'default'}
                  onSelect={(designId) => {
                    const design = designs.find(d => d.id === designId)
                    if (design) {
                      setCardData({ ...cardData, template: design.template })
                    }
                  }}
                />

                <ProfilePhotoUpload
                  currentImage={profileImage}
                  onUpload={(url) => setProfileImage(url)}
                />

                <ColorPicker
                  selectedColor={cardData.primaryColor}
                  onColorChange={(color) => {
                    // Create a lighter version for secondary color
                    const hex = color.replace('#', '')
                    const r = parseInt(hex.substring(0, 2), 16)
                    const g = parseInt(hex.substring(2, 4), 16)
                    const b = parseInt(hex.substring(4, 6), 16)
                    const lighterR = Math.min(255, Math.floor(r + (255 - r) * 0.3))
                    const lighterG = Math.min(255, Math.floor(g + (255 - g) * 0.3))
                    const lighterB = Math.min(255, Math.floor(b + (255 - b) * 0.3))
                    const secondaryColor = `#${lighterR.toString(16).padStart(2, '0')}${lighterG.toString(16).padStart(2, '0')}${lighterB.toString(16).padStart(2, '0')}`
                    setCardData({ ...cardData, primaryColor: color, secondaryColor })
                  }}
                />

                <FontSelector
                  selected={selectedFont}
                  onSelect={setSelectedFont}
                />

                <LogoUpload
                  currentLogo={logo}
                  onUpload={(url) => setLogo(url)}
                />
              </div>
            )}

            {activeTab === 'information' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Job Title</label>
                  <input
                    type="text"
                    value={cardData.title}
                    onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    value={cardData.company}
                    onChange={(e) => setCardData({ ...cardData, company: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={cardData.email}
                    onChange={(e) => setCardData({ ...cardData, email: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    value={cardData.phone}
                    onChange={(e) => setCardData({ ...cardData, phone: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Website</label>
                  <input
                    type="url"
                    value={cardData.website}
                    onChange={(e) => setCardData({ ...cardData, website: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <input
                    type="text"
                    value={cardData.address}
                    onChange={(e) => setCardData({ ...cardData, address: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    value={cardData.bio}
                    onChange={(e) => setCardData({ ...cardData, bio: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    rows={4}
                    placeholder="Tell people about yourself..."
                  />
                </div>
              </div>
            )}

            {activeTab === 'fields' && (
              <div className="space-y-4">
                <p className="text-sm text-gray-600">Custom field management coming soon...</p>
              </div>
            )}

            {activeTab === 'card' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Social Links</label>
                  <SocialLinksEditor
                    links={cardData.socialLinks}
                    onChange={(links) => setCardData({ ...cardData, socialLinks: links })}
                  />
                </div>
              </div>
            )}
          </div>
        </CardCreationTabs>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 p-4 bg-white flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !cardData.name || !cardData.email}
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

