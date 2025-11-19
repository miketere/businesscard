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

export default function ElegantPurpleTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div
      className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl text-white flex flex-col relative overflow-hidden"
      style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full -ml-24 -mb-24"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-8 p-6 flex-shrink-0">
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white/30 shadow-lg"
            />
          ) : (
            <div className="w-28 h-28 bg-white/20 rounded-full mx-auto mb-4 border-4 border-white/30 shadow-lg"></div>
          )}

          <h2 className="text-3xl font-bold mb-2">{cardData.name || 'Your Name'}</h2>
          <p className="text-lg opacity-90 mb-1">{cardData.title || 'Job Title'}</p>
          <p className="text-sm opacity-75">{cardData.company || 'Company'}</p>
        </div>

        <div className="flex-1 flex flex-col justify-center px-6">
          <div className="space-y-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
            {cardData.email && (
              <a href={`mailto:${cardData.email}`} className="flex items-center gap-3 hover:opacity-80">
                <span className="text-xl">📧</span>
                <span className="text-sm">{cardData.email}</span>
              </a>
            )}
            {cardData.phone && (
              <a href={`tel:${cardData.phone}`} className="flex items-center gap-3 hover:opacity-80">
                <span className="text-xl">📱</span>
                <span className="text-sm">{cardData.phone}</span>
              </a>
            )}
            {cardData.website && (
              <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-80">
                <span className="text-xl">🌐</span>
                <span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {cardData.address && (
              <div className="flex items-center gap-3">
                <span className="text-xl">📍</span>
                <span className="text-sm">{cardData.address}</span>
              </div>
            )}
          </div>
        </div>
        {cardData.bio && (
          <div className="px-6 pb-4 border-t border-white/20">
            <p className="text-sm text-white/90 text-center leading-relaxed pt-4">{cardData.bio}</p>
          </div>
        )}

        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="p-4 flex justify-center gap-4 flex-shrink-0">
            {Object.entries(cardData.socialLinks).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 hover:text-white transition-colors text-sm"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
