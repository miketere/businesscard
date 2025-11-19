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

export default function MarketingVibrantTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white">
      {/* Office Scene Background Header */}
      <div className="h-36 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        {/* Office Environment Pattern */}
        <div className="absolute inset-0 opacity-20">
          {/* Abstract office shapes */}
          <div className="absolute bottom-0 left-0 right-0 h-20">
            <div className="absolute bottom-0 left-4 w-16 h-12 bg-white/30 rounded-t"></div>
            <div className="absolute bottom-0 left-24 w-20 h-16 bg-white/30 rounded-t"></div>
            <div className="absolute bottom-0 right-8 w-14 h-10 bg-white/30 rounded-t"></div>
            <div className="absolute bottom-0 right-28 w-18 h-14 bg-white/30 rounded-t"></div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-10 bg-white transform -skew-y-1"></div>
        <div className="absolute top-2 left-4 text-white text-xs font-bold">GENIUS</div>
      </div>

      {/* Professional Photo Overlay */}
      <div className="px-6 -mt-12 flex-shrink-0">
        <div className="flex items-start gap-4">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-24 h-24 rounded-lg object-cover border-4 border-white shadow-xl flex-shrink-0"
            />
          ) : (
            <div className="w-24 h-24 rounded-lg border-4 border-white shadow-xl flex-shrink-0" style={{ backgroundColor: cardData.primaryColor }}></div>
          )}
          <div className="flex-1 pt-2">
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
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="space-y-2">
          {cardData.email && (
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
              <span style={{ color: cardData.primaryColor }} className="text-lg">📧</span>
              <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">
                {cardData.email}
              </a>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
              <span style={{ color: cardData.primaryColor }} className="text-lg">📱</span>
              <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">
                {cardData.phone}
              </a>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
              <span style={{ color: cardData.primaryColor }} className="text-lg">🌐</span>
              <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline flex-1">
                {cardData.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {cardData.address && (
            <div className="flex items-center gap-2 p-3 rounded-lg" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
              <span style={{ color: cardData.primaryColor }} className="text-lg">📍</span>
              <p className="text-sm text-gray-700 flex-1">{cardData.address}</p>
            </div>
          )}
        </div>
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Icon Footer */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="p-4 border-t border-gray-200 flex justify-center gap-3 flex-wrap">
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
