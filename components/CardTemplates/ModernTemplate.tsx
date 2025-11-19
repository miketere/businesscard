'use client'

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

export default function ModernTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-xl overflow-hidden flex flex-col bg-white">
      {/* Header with Gradient */}
      <div
        className="h-32 p-6 text-white"
        style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}
      ></div>
      
      {/* Profile Section */}
      <div className="px-6 pb-6 -mt-16 flex-shrink-0">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg"
          />
        ) : (
          <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-200 border-4 border-white shadow-lg"></div>
        )}

        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-lg text-gray-600 mb-1">{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-gray-500">{cardData.company || 'Company'}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="space-y-3">
          {cardData.email && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">📧</span>
              <a href={`mailto:${cardData.email}`} className="text-gray-700 hover:text-indigo-600 text-sm flex-1">
                {cardData.email}
              </a>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">📱</span>
              <a href={`tel:${cardData.phone}`} className="text-gray-700 hover:text-indigo-600 text-sm flex-1">
                {cardData.phone}
              </a>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">🌐</span>
              <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-indigo-600 text-sm flex-1">
                {cardData.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {cardData.address && (
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <span className="text-xl">📍</span>
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

      {/* Social Links */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="p-4 border-t border-gray-200 flex justify-center gap-4 flex-wrap">
          {Object.entries(cardData.socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:text-indigo-700 transition-colors text-sm"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
