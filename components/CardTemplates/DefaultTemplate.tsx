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

export default function DefaultTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
      {/* Header Section */}
      <div className="flex-1 p-6 text-white flex flex-col justify-center items-center text-center">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-white/30 shadow-xl"
          />
        ) : (
          <div className="w-32 h-32 bg-white/20 rounded-full mx-auto mb-4 border-4 border-white/30 shadow-xl"></div>
        )}

        <h2 className="text-2xl font-bold mb-2">{cardData.name || 'Your Name'}</h2>
        <p className="text-lg opacity-90 mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-sm opacity-75">{cardData.company || 'Company'}</p>
      </div>

      {/* Contact Section */}
      <div className="bg-white/10 backdrop-blur-sm p-4 space-y-2">
        {cardData.email && (
          <a href={`mailto:${cardData.email}`} className="flex items-center gap-2 text-white hover:opacity-80 text-sm">
            <span className="text-lg">📧</span> {cardData.email}
          </a>
        )}
        {cardData.phone && (
          <a href={`tel:${cardData.phone}`} className="flex items-center gap-2 text-white hover:opacity-80 text-sm">
            <span className="text-lg">📱</span> {cardData.phone}
          </a>
        )}
        {cardData.website && (
          <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white hover:opacity-80 text-sm">
            <span className="text-lg">🌐</span> {cardData.website.replace(/^https?:\/\//, '')}
          </a>
        )}
        {cardData.address && (
          <div className="flex items-center gap-2 text-white text-sm">
            <span className="text-lg">📍</span> {cardData.address}
          </div>
        )}
      </div>

      {/* Bio Section */}
      {cardData.bio && (
        <div className="bg-white/5 p-4 border-t border-white/10">
          <p className="text-white/90 text-sm text-center leading-relaxed">{cardData.bio}</p>
        </div>
      )}

      {/* Social Links */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="bg-white/5 p-4 flex justify-center gap-4 flex-wrap">
          {Object.entries(cardData.socialLinks).map(([platform, url]) => (
            <a
              key={platform}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/80 hover:text-white text-xs font-medium"
            >
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}
