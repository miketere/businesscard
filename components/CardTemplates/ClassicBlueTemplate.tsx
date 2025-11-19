'use client'

import SocialIcon from '@/components/SocialIcon'

interface CardData {
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
  socialLinks?: Record<string, string>
}

export default function ClassicBlueTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white">
      {/* Full-width Hero Header with Profile */}
      <div
        className="h-48 relative"
        style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}
      >
        {/* Decorative Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-16 h-16 border-2 border-white/30 rounded-full"></div>
          <div className="absolute top-8 right-8 w-12 h-12 border-2 border-white/30 rounded-full"></div>
          <div className="absolute bottom-8 left-8 w-20 h-20 border-2 border-white/30 rounded-full"></div>
        </div>
        
        {/* Profile Image - Full Width Hero Style */}
        <div className="absolute inset-0 flex items-center justify-center">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-2xl"
            />
          ) : (
            <div className="w-32 h-32 bg-white/20 rounded-full border-4 border-white shadow-2xl"></div>
          )}
        </div>
        
        {/* Name and Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
          <h2 className="text-xl font-bold text-white mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-sm text-white/90">{cardData.title || 'Job Title'}</p>
        </div>
      </div>

      {/* Middle Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        {/* Logo Display */}
        {cardData.logo && (
          <div className="flex justify-center mb-4">
            <img
              src={cardData.logo}
              alt={cardData.company || 'Company Logo'}
              className="h-12 max-w-[120px] object-contain"
            />
          </div>
        )}
        <p className="text-center text-gray-600 text-sm mb-4 font-medium">{cardData.company || 'Company'}</p>
        
        <div className="space-y-3">
          {cardData.email && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-blue-600 text-lg">📧</span>
              <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:text-blue-600 flex-1">
                {cardData.email}
              </a>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-blue-600 text-lg">📱</span>
              <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:text-blue-600 flex-1">
                {cardData.phone}
              </a>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-blue-600 text-lg">🌐</span>
              <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-blue-600 flex-1">
                {cardData.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {cardData.address && (
            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <span className="text-blue-600 text-lg">📍</span>
              <p className="text-sm text-gray-700 flex-1">{cardData.address}</p>
            </div>
          )}
        </div>
        
        {/* Bio Section */}
        {cardData.bio && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center leading-relaxed">{cardData.bio}</p>
          </div>
        )}
      </div>

      {/* Icon Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50">
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="flex justify-center gap-3 flex-wrap">
            {Object.entries(cardData.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 hover:scale-110 transition-all shadow-sm"
                style={{ backgroundColor: cardData.primaryColor }}
                title={platform.charAt(0).toUpperCase() + platform.slice(1)}
              >
                <SocialIcon platform={platform} size={20} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
