'use client'

import { useEffect, useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { CardTemplates } from './CardTemplates'

interface CardPreviewProps {
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
  showQR?: boolean
  cardUrl?: string
}

export default function CardPreview({ cardData, showQR = true, cardUrl }: CardPreviewProps) {
  const [renderKey, setRenderKey] = useState(0)
  const TemplateComponent = CardTemplates[cardData.template as keyof typeof CardTemplates] || CardTemplates.default
  
  // Debug logging
  console.log('CardPreview - Template:', cardData.template)
  console.log('CardPreview - Address:', cardData.address)
  console.log('CardPreview - Bio:', cardData.bio)
  
  // Force re-render when cardData changes
  useEffect(() => {
    setRenderKey(prev => prev + 1)
  }, [cardData.name, cardData.title, cardData.company, cardData.email, cardData.phone, cardData.website, cardData.address, cardData.bio, cardData.template, cardData.primaryColor, cardData.secondaryColor, cardData.profileImage, cardData.logo])

  return (
    <div className="w-full flex justify-center">
      {showQR && cardUrl && (
        <div className="mb-4 p-4 bg-gray-50 rounded-lg text-center">
          <QRCodeSVG value={cardUrl} size={150} className="mx-auto" />
          <p className="mt-2 text-xs text-gray-600">Scan to view card</p>
        </div>
      )}
      <div key={renderKey} className="w-full">
        <TemplateComponent cardData={cardData} />
      </div>
    </div>
  )
}

