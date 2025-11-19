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

export default function MinimalGrayTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-lg shadow-sm border border-gray-200 flex flex-col bg-white">
      {/* Decorative Pattern Header */}
      <div className="h-24 relative bg-gray-100 overflow-hidden">
        {/* Geometric Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-4 gap-1 h-full">
              {[...Array(16)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-400"
                  style={{ opacity: i % 2 === 0 ? 0.3 : 0.1 }}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white transform -skew-y-1"></div>
      </div>

      {/* Center Circle Profile */}
      <div className="px-6 -mt-12 flex-shrink-0">
        <div className="flex justify-center">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-28 h-28 rounded-full object-cover border-4 border-white shadow-xl"
            />
          ) : (
            <div className="w-28 h-28 bg-gray-300 rounded-full border-4 border-white shadow-xl"></div>
          )}
        </div>
        <div className="text-center mt-4">
          <h2 className="text-2xl font-light text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <div className="w-16 h-0.5 bg-gray-400 mx-auto mb-2"></div>
          <p className="text-xs text-gray-600 uppercase tracking-wider">{cardData.title || 'Job Title'}</p>
          {cardData.logo ? (
            <div className="mt-2 flex justify-center">
              <img
                src={cardData.logo}
                alt={cardData.company || 'Company Logo'}
                className="h-8 max-w-[100px] object-contain"
              />
            </div>
          ) : (
            <p className="text-xs text-gray-500 mt-1">{cardData.company || 'Company'}</p>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center space-y-2 text-center text-sm text-gray-700">
        {cardData.email && (
          <a href={`mailto:${cardData.email}`} className="block hover:text-gray-900 transition-colors">
            {cardData.email}
          </a>
        )}
        {cardData.phone && (
          <a href={`tel:${cardData.phone}`} className="block hover:text-gray-900 transition-colors">
            {cardData.phone}
          </a>
        )}
        {cardData.website && (
          <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="block hover:text-gray-900 transition-colors">
            {cardData.website.replace(/^https?:\/\//, '')}
          </a>
        )}
        {cardData.address && (
          <p className="block text-gray-700">{cardData.address}</p>
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
  )
}
