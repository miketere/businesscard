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

export default function CreativePinkTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col relative">
      {/* Textured Overlay Header - Paper Effect */}
      <div className="h-28 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        {/* Torn Paper Effect */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-8" viewBox="0 0 400 32" preserveAspectRatio="none">
            <path
              d="M0,32 Q50,24 100,28 T200,26 T300,30 T400,28 L400,32 L0,32 Z"
              fill="white"
            />
          </svg>
        </div>
        {/* Decorative Circles */}
        <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full"></div>
        <div className="absolute bottom-8 left-4 w-12 h-12 bg-white/15 rounded-full"></div>
      </div>

      {/* Square Profile Top-Left */}
      <div className="px-6 pt-4 flex gap-4 flex-shrink-0">
        <div className="flex-shrink-0">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-20 h-20 rounded-lg object-cover border-2 shadow-lg"
              style={{ borderColor: cardData.primaryColor }}
            />
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 shadow-lg" style={{ borderColor: cardData.primaryColor, backgroundColor: `${cardData.primaryColor}20` }}></div>
          )}
        </div>
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-base font-semibold mb-1" style={{ color: cardData.primaryColor }}>{cardData.title || 'Job Title'}</p>
          {cardData.logo ? (
            <div className="mb-2">
              <img
                src={cardData.logo}
                alt={cardData.company || 'Company Logo'}
                className="h-8 max-w-[100px] object-contain"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center space-y-2">
        {cardData.email && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
            <span style={{ color: cardData.primaryColor }}>📧</span>
            <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">
              {cardData.email}
            </a>
          </div>
        )}
        {cardData.phone && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
            <span style={{ color: cardData.primaryColor }}>📱</span>
            <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">
              {cardData.phone}
            </a>
          </div>
        )}
        {cardData.website && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
            <span style={{ color: cardData.primaryColor }}>🌐</span>
            <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline flex-1">
              {cardData.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {cardData.address && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
            <span style={{ color: cardData.primaryColor }}>📍</span>
            <p className="text-sm text-gray-700 flex-1">{cardData.address}</p>
          </div>
        )}
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t" style={{ borderColor: `${cardData.primaryColor}30` }}>
          <p className="text-sm text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Decorative Pattern Footer */}
      <div className="p-4 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}15, ${cardData.secondaryColor}15)` }}>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-2 left-4 w-8 h-8 border-2 rounded-full" style={{ borderColor: cardData.primaryColor }}></div>
          <div className="absolute top-2 right-4 w-6 h-6 border-2 rounded-full" style={{ borderColor: cardData.primaryColor }}></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 rounded-full" style={{ borderColor: cardData.primaryColor }}></div>
        </div>
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="relative flex justify-center gap-3 flex-wrap">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a
                key={p}
                href={u}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 hover:scale-110 transition-all shadow-sm"
                style={{ backgroundColor: cardData.primaryColor }}
                title={p.charAt(0).toUpperCase() + p.slice(1)}
              >
                <SocialIcon platform={p} size={20} />
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
