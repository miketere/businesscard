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

export default function SimpleWhiteTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-lg shadow-md border border-gray-100 flex flex-col bg-white">
      {/* Gradient Header */}
      <div
        className="h-20 relative"
        style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}
      >
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-white transform -skew-y-1"></div>
      </div>

      {/* Side-by-Side Layout: Photo Left, Info Right */}
      <div className="flex-1 p-6 flex gap-4">
        {/* Left Side - Profile Photo */}
        <div className="flex-shrink-0">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-24 h-24 rounded-lg object-cover shadow-md"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-lg shadow-md"></div>
          )}
        </div>

        {/* Right Side - Info */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-sm text-gray-600 mb-1">{cardData.title || 'Job Title'}</p>
          {cardData.logo ? (
            <div className="mb-4">
              <img
                src={cardData.logo}
                alt={cardData.company || 'Company Logo'}
                className="h-8 max-w-[100px] object-contain"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-500 mb-4">{cardData.company || 'Company'}</p>
          )}
          
          <div className="space-y-2 text-xs">
            {cardData.email && (
              <a href={`mailto:${cardData.email}`} className="block text-gray-700 hover:text-indigo-600">
                {cardData.email}
              </a>
            )}
            {cardData.phone && (
              <a href={`tel:${cardData.phone}`} className="block text-gray-700 hover:text-indigo-600">
                {cardData.phone}
              </a>
            )}
            {cardData.website && (
              <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="block text-gray-700 hover:text-indigo-600">
                {cardData.website.replace(/^https?:\/\//, '')}
              </a>
            )}
            {cardData.address && (
              <p className="block text-gray-700 text-xs">{cardData.address}</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-gray-100">
          <p className="text-xs text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Icon Footer */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="p-4 border-t border-gray-100 flex justify-center gap-3 flex-wrap">
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

