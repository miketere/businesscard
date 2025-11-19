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

export default function MinimalTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-lg shadow-sm border-2 border-gray-200 min-h-[400px] p-8 flex flex-col bg-white">
      {/* Profile Section */}
      <div className="text-center mb-8 flex-shrink-0">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
          />
        ) : (
          <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-200"></div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
        <p className="text-gray-600 mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-sm text-gray-500">{cardData.company || 'Company'}</p>
      </div>

      {/* Contact Section */}
      <div className="flex-1 flex flex-col justify-center space-y-2 text-sm">
        {cardData.email && (
          <div className="flex items-center gap-2">
            <span className="w-20 text-gray-500">Email:</span>
            <a href={`mailto:${cardData.email}`} className="text-gray-900 hover:underline flex-1">
              {cardData.email}
            </a>
          </div>
        )}
        {cardData.phone && (
          <div className="flex items-center gap-2">
            <span className="w-20 text-gray-500">Phone:</span>
            <a href={`tel:${cardData.phone}`} className="text-gray-900 hover:underline flex-1">
              {cardData.phone}
            </a>
          </div>
        )}
        {cardData.website && (
          <div className="flex items-center gap-2">
            <span className="w-20 text-gray-500">Website:</span>
            <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-gray-900 hover:underline flex-1">
              {cardData.website.replace(/^https?:\/\//, '')}
            </a>
          </div>
        )}
        {cardData.address && (
          <div className="flex items-center gap-2">
            <span className="w-20 text-gray-500">Address:</span>
            <p className="text-gray-900 flex-1">{cardData.address}</p>
          </div>
        )}
      </div>

      {/* Bio Section */}
      {cardData.bio && (
        <div className="mt-8 pt-8 border-t flex-shrink-0">
          <p className="text-sm text-gray-600 text-center">{cardData.bio}</p>
        </div>
      )}

      {/* Social Links */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="mt-8 pt-8 border-t flex justify-center gap-4 flex-wrap">
          {Object.entries(cardData.socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900 transition-colors text-xs"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
