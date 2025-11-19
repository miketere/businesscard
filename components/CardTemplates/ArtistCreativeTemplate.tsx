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

export default function ArtistCreativeTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white relative">
      {/* Torn Paper Effect Header */}
      <div className="h-40 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        {/* Torn Paper Bottom Edge */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-12" viewBox="0 0 400 48" preserveAspectRatio="none">
            <path
              d="M0,48 Q30,40 60,42 T120,40 T180,44 T240,38 T300,42 T360,40 T400,42 L400,48 L0,48 Z"
              fill="white"
            />
          </svg>
        </div>
        {/* Creative Pattern Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-20 h-20 border-4 border-white/30 transform rotate-45"></div>
          <div className="absolute top-8 right-8 w-16 h-16 border-4 border-white/30 rounded-full"></div>
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-12 h-12 border-4 border-white/30 transform rotate-12"></div>
        </div>
      </div>

      {/* Full-width Hero Profile */}
      <div className="px-6 -mt-8 flex-shrink-0">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-full h-32 object-cover rounded-lg shadow-xl border-4 border-white"
          />
        ) : (
          <div className="w-full h-32 rounded-lg shadow-xl border-4 border-white" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}></div>
        )}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-lg font-semibold mb-1" style={{ color: cardData.primaryColor }}>{cardData.title || 'Job Title'}</p>
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
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-2 border-2" style={{ borderColor: cardData.primaryColor }}>
          {cardData.email && (
            <a href={`mailto:${cardData.email}`} className="flex items-center gap-2 text-sm text-gray-700 hover:underline">
              <span>📧</span> {cardData.email}
            </a>
          )}
          {cardData.phone && (
            <a href={`tel:${cardData.phone}`} className="flex items-center gap-2 text-sm text-gray-700 hover:underline">
              <span>📱</span> {cardData.phone}
            </a>
          )}
          {cardData.website && (
            <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-gray-700 hover:underline">
              <span>🌐</span> {cardData.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {cardData.address && (
            <div className="flex items-center gap-2 text-sm text-gray-700">
              <span>📍</span> {cardData.address}
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

      {/* Creative Pattern Footer */}
      <div className="p-4 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}20, ${cardData.secondaryColor}20)` }}>
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-2 left-4 w-6 h-6 border-2 transform rotate-45" style={{ borderColor: cardData.primaryColor }}></div>
          <div className="absolute top-2 right-4 w-8 h-8 border-2 rounded-full" style={{ borderColor: cardData.primaryColor }}></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-2 transform rotate-12" style={{ borderColor: cardData.primaryColor }}></div>
        </div>
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="relative flex justify-center gap-2 flex-wrap">
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
