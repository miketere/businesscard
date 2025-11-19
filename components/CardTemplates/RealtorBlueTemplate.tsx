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

export default function RealtorBlueTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white relative">
      {/* Cityscape Header */}
      <div className="h-32 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        {/* Cityscape Silhouette */}
        <div className="absolute bottom-0 left-0 right-0 h-16">
          <svg className="w-full h-full" viewBox="0 0 400 64" preserveAspectRatio="none">
            {/* Building silhouettes */}
            <rect x="0" y="45" width="35" height="19" fill="rgba(255,255,255,0.25)" />
            <rect x="45" y="35" width="30" height="29" fill="rgba(255,255,255,0.25)" />
            <rect x="85" y="40" width="28" height="24" fill="rgba(255,255,255,0.25)" />
            <rect x="120" y="30" width="40" height="34" fill="rgba(255,255,255,0.25)" />
            <rect x="170" y="42" width="32" height="22" fill="rgba(255,255,255,0.25)" />
            <rect x="210" y="32" width="36" height="32" fill="rgba(255,255,255,0.25)" />
            <rect x="255" y="36" width="34" height="28" fill="rgba(255,255,255,0.25)" />
            <rect x="295" y="25" width="45" height="39" fill="rgba(255,255,255,0.25)" />
            <rect x="345" y="45" width="20" height="19" fill="rgba(255,255,255,0.25)" />
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
          <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="space-y-2">
          {cardData.email && (
            <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}10` }}>
              <span style={{ color: cardData.primaryColor }}>📧</span>
              <a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.email}</a>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}10` }}>
              <span style={{ color: cardData.primaryColor }}>📱</span>
              <a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.phone}</a>
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
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Keys Handoff Scene Footer */}
      <div className="p-4 border-t border-gray-200 bg-gray-50 relative">
        {/* Decorative keys icon */}
        <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-2xl opacity-20">🔑</div>
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="relative flex justify-center gap-3 flex-wrap mt-2">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a
                key={p}
                href={u}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
                style={{ color: cardData.primaryColor }}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
