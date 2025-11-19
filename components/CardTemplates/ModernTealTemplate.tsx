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

export default function ModernTealTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Icon-based Header - Lightbulb */}
      <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
            <span className="text-4xl">💡</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white transform -skew-y-1"></div>
      </div>

      {/* Large Center Circle Profile */}
      <div className="px-6 pb-6 -mt-16 flex-shrink-0">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-xl"
          />
        ) : (
          <div className="w-32 h-32 bg-teal-200 rounded-full mx-auto mb-4 border-4 border-white shadow-xl"></div>
        )}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-base text-teal-600 font-medium mb-1">{cardData.title || 'Job Title'}</p>
          {cardData.logo ? (
            <div className="mb-2 flex justify-center">
              <img
                src={cardData.logo}
                alt={cardData.company || 'Company Logo'}
                className="h-10 max-w-[120px] object-contain"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 px-6 pb-6 flex flex-col justify-center space-y-2">
        {cardData.email && (
          <div className="flex items-center gap-2 p-2 bg-teal-50 rounded">
            <span className="text-teal-600">📧</span>
            <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:text-teal-600 flex-1">
              {cardData.email}
            </a>
          </div>
        )}
        {cardData.phone && (
          <div className="flex items-center gap-2 p-2 bg-teal-50 rounded">
            <span className="text-teal-600">📱</span>
            <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:text-teal-600 flex-1">
              {cardData.phone}
            </a>
          </div>
        )}
        {cardData.website && (
          <div className="flex items-center gap-2 p-2 bg-teal-50 rounded">
            <span className="text-teal-600">🌐</span>
            <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-teal-600 flex-1">
              {cardData.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {cardData.address && (
          <div className="flex items-center gap-2 p-2 bg-teal-50 rounded">
            <span className="text-teal-600">📍</span>
            <p className="text-sm text-gray-700 flex-1">{cardData.address}</p>
          </div>
        )}
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Icon Footer */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="px-6 pb-6 flex justify-center gap-3 flex-wrap">
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
  )
}
