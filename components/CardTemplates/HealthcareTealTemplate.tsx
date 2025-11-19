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

export default function HealthcareTealTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white">
      {/* Medical Cross Icon Header */}
      <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-4 border-white/30">
            <span className="text-4xl text-white">+</span>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white transform -skew-y-1"></div>
      </div>

      {/* Doctor Photo with Stethoscope Effect */}
      <div className="px-6 pb-6 -mt-8 flex-shrink-0">
        <div className="relative">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-28 h-28 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto mb-3 border-4 border-white shadow-lg" style={{ backgroundColor: cardData.primaryColor }}></div>
          )}
          {/* Stethoscope icon overlay */}
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-2xl">🩺</div>
        </div>
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-base font-semibold mb-1" style={{ color: cardData.primaryColor }}>{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="space-y-2">
          {cardData.email && (
            <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
              <span style={{ color: cardData.primaryColor }}>📧</span>
              <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.email}</a>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}>
              <span style={{ color: cardData.primaryColor }}>📱</span>
              <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.phone}</a>
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
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Contact Bar Footer */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="p-4 border-t border-gray-200 flex justify-center gap-4">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a
              key={p}
              href={u}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full flex items-center justify-center text-white hover:opacity-90 transition-opacity"
              style={{ backgroundColor: cardData.primaryColor }}
              title={p}
            >
              <span className="text-xs font-bold">{p.charAt(0).toUpperCase()}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
