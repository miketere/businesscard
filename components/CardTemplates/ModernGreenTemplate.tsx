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

export default function ModernGreenTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
      {/* Gradient Header */}
      <div className="h-20" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}></div>

      {/* Split Layout: Photo Right Side */}
      <div className="flex-1 p-6 flex gap-4">
        {/* Left Side - Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-base text-green-600 font-medium mb-1">{cardData.title || 'Job Title'}</p>
          {cardData.logo ? (
            <div className="mb-4">
              <img
                src={cardData.logo}
                alt={cardData.company || 'Company Logo'}
                className="h-10 max-w-[120px] object-contain"
              />
            </div>
          ) : (
            <p className="text-sm text-gray-600 mb-4">{cardData.company || 'Company'}</p>
          )}
          
          <div className="space-y-2">
            {cardData.email && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">📧</span>
                <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:text-green-600 flex-1">
                  {cardData.email}
                </a>
              </div>
            )}
            {cardData.phone && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">📱</span>
                <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:text-green-600 flex-1">
                  {cardData.phone}
                </a>
              </div>
            )}
            {cardData.website && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">🌐</span>
                <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-green-600 flex-1">
                  {cardData.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {cardData.address && (
              <div className="flex items-center gap-2">
                <span className="text-green-600">📍</span>
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

        {/* Right Side - Profile Photo */}
        <div className="flex-shrink-0">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-24 h-24 rounded-lg object-cover border-2 shadow-md"
              style={{ borderColor: cardData.primaryColor }}
            />
          ) : (
            <div className="w-24 h-24 rounded-lg border-2 shadow-md" style={{ borderColor: cardData.primaryColor, backgroundColor: `${cardData.primaryColor}20` }}></div>
          )}
        </div>
      </div>

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

