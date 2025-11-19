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

export default function ProfessionalNavyTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-white rounded-lg shadow-lg border-l-4 flex flex-col" style={{ borderLeftColor: cardData.primaryColor }}>
      {/* Cityscape Silhouette Header */}
      <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        {/* Cityscape Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="w-full h-full" viewBox="0 0 400 64" preserveAspectRatio="none">
            {/* Building silhouettes */}
            <rect x="0" y="40" width="40" height="24" fill="rgba(255,255,255,0.2)" />
            <rect x="50" y="30" width="35" height="34" fill="rgba(255,255,255,0.2)" />
            <rect x="95" y="35" width="30" height="29" fill="rgba(255,255,255,0.2)" />
            <rect x="135" y="25" width="45" height="39" fill="rgba(255,255,255,0.2)" />
            <rect x="190" y="38" width="35" height="26" fill="rgba(255,255,255,0.2)" />
            <rect x="235" y="28" width="40" height="36" fill="rgba(255,255,255,0.2)" />
            <rect x="285" y="32" width="38" height="32" fill="rgba(255,255,255,0.2)" />
            <rect x="330" y="20" width="50" height="44" fill="rgba(255,255,255,0.2)" />
            <rect x="385" y="42" width="15" height="22" fill="rgba(255,255,255,0.2)" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white transform -skew-y-1"></div>
        <div className="absolute bottom-2 left-4 text-white text-xs font-semibold">🏠 REAL ESTATE</div>
      </div>

      {/* Circular Profile Centered in Cityscape */}
      <div className="px-6 pb-6 -mt-6 flex-shrink-0">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-xl"
          />
        ) : (
          <div className="w-28 h-28 rounded-full mx-auto mb-3 border-4 border-white shadow-xl" style={{ backgroundColor: cardData.primaryColor }}></div>
        )}
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-base font-semibold mb-1" style={{ color: cardData.primaryColor }}>{cardData.title || 'Job Title'}</p>
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
      <div className="flex-1 p-6 flex flex-col justify-center space-y-2">
        {cardData.email && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}10` }}>
            <span style={{ color: cardData.primaryColor }}>📧</span>
            <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">
              {cardData.email}
            </a>
          </div>
        )}
        {cardData.phone && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}10` }}>
            <span style={{ color: cardData.primaryColor }}>📱</span>
            <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">
              {cardData.phone}
            </a>
          </div>
        )}
        {cardData.website && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}10` }}>
            <span style={{ color: cardData.primaryColor }}>🌐</span>
            <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline flex-1">
              {cardData.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {cardData.address && (
          <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}10` }}>
            <span style={{ color: cardData.primaryColor }}>📍</span>
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
