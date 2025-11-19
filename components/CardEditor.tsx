'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import CardPreview from './CardPreview'
import TemplateSelector from './TemplateSelector'
import SocialLinksEditor from './SocialLinksEditor'
import FileUpload from './FileUpload'

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
  profileImage?: string | null
  logo?: string | null
  primaryColor: string
  secondaryColor: string
  template: string
  socialLinks: SocialLinks
}

export default function CardEditor({ cardId, initialData }: { cardId?: string; initialData?: Partial<CardData> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [cardData, setCardData] = useState<CardData>({
    name: initialData?.name || '',
    title: initialData?.title || '',
    company: initialData?.company || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    website: initialData?.website || '',
    address: initialData?.address || '',
    bio: initialData?.bio || '',
    primaryColor: initialData?.primaryColor || '#3B82F6',
    secondaryColor: initialData?.secondaryColor || '#1E40AF',
    template: initialData?.template || 'default',
    socialLinks: initialData?.socialLinks || {},
  })
  const [profileImage, setProfileImage] = useState<string | null>(initialData?.profileImage || null)
  const [logo, setLogo] = useState<string | null>(initialData?.logo || null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
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

  const cardUrl = cardId ? `${window.location.origin}/card/${cardId}` : undefined

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Editor Form */}
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-lg">
          <h2 className="text-3xl font-bold mb-6">{cardId ? 'Edit' : 'Create'} Your Card</h2>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Full Name *</label>
              <input
                type="text"
                value={cardData.name}
                onChange={(e) => {
                  const newValue = e.target.value
                  setCardData(prev => ({...prev, name: newValue}))
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <input
                type="text"
                value={cardData.title}
                onChange={(e) => {
                  const newValue = e.target.value
                  setCardData(prev => ({...prev, title: newValue}))
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company</label>
            <input
              type="text"
              value={cardData.company}
              onChange={(e) => {
                const newValue = e.target.value
                setCardData(prev => ({...prev, company: newValue}))
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              type="email"
              value={cardData.email}
              onChange={(e) => {
                const newValue = e.target.value
                setCardData(prev => ({...prev, email: newValue}))
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <input
                type="tel"
                value={cardData.phone}
                onChange={(e) => {
                  const newValue = e.target.value
                  setCardData(prev => ({...prev, phone: newValue}))
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Website</label>
              <input
                type="url"
                value={cardData.website}
                onChange={(e) => {
                  const newValue = e.target.value
                  setCardData(prev => ({...prev, website: newValue}))
                }}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Address</label>
            <input
              type="text"
              value={cardData.address}
              onChange={(e) => {
                const newValue = e.target.value
                setCardData(prev => ({...prev, address: newValue}))
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Bio</label>
            <textarea
              value={cardData.bio}
              onChange={(e) => {
                const newValue = e.target.value
                setCardData(prev => ({...prev, bio: newValue}))
              }}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={4}
              placeholder="Tell people about yourself..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Profile Image</label>
            <FileUpload
              currentImage={profileImage}
              onUpload={(url) => setProfileImage(url)}
              folder="profiles"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Company Logo</label>
            <FileUpload
              currentImage={logo}
              onUpload={(url) => setLogo(url)}
              folder="logos"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Template</label>
            <TemplateSelector
              selected={cardData.template}
              onSelect={(template) => setCardData({...cardData, template})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <input
                type="color"
                value={cardData.primaryColor}
                onChange={(e) => setCardData({...cardData, primaryColor: e.target.value})}
                className="w-full h-12 rounded cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <input
                type="color"
                value={cardData.secondaryColor}
                onChange={(e) => setCardData({...cardData, secondaryColor: e.target.value})}
                className="w-full h-12 rounded cursor-pointer"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Social Links</label>
            <SocialLinksEditor
              links={cardData.socialLinks}
              onChange={(links) => setCardData({...cardData, socialLinks: links})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? 'Saving...' : cardId ? 'Update Card' : 'Create Card'}
          </button>
        </form>

        {/* Preview */}
        <div className="sticky top-4 h-fit">
          <CardPreview
            key={`preview-${cardData.name}-${cardData.title}-${cardData.company}-${cardData.email}`}
            cardData={{
              name: cardData.name,
              title: cardData.title,
              company: cardData.company,
              email: cardData.email,
              phone: cardData.phone,
              website: cardData.website,
              address: cardData.address,
              bio: cardData.bio,
              profileImage: profileImage || undefined,
              logo: logo || undefined,
              primaryColor: cardData.primaryColor,
              secondaryColor: cardData.secondaryColor,
              template: cardData.template,
              socialLinks: cardData.socialLinks,
            }}
            cardUrl={cardUrl}
          />
        </div>
      </div>
    </div>
  )
}

