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

export default function BankingYellowTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl shadow-2xl overflow-hidden flex flex-col" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
      {/* Group Photo Header Effect */}
      <div className="h-32 relative">
        {/* Abstract group celebration pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-4 left-4 w-16 h-16 bg-white/20 rounded-full"></div>
          <div className="absolute top-6 right-8 w-12 h-12 bg-white/20 rounded-full"></div>
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-white/20 rounded-full"></div>
        </div>
      </div>

      {/* Inset Profile Circle */}
      <div className="px-6 -mt-8 flex-shrink-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
            <p className="text-base font-semibold mb-1 text-gray-800">{cardData.title || 'Job Title'}</p>
            <p className="text-sm opacity-90">{cardData.company || 'Company'}</p>
          </div>
          {cardData.profileImage ? (
            <img
              src={cardData.profileImage}
              alt={cardData.name}
              className="w-20 h-20 rounded-lg object-cover border-2 border-white/30 shadow-lg"
            />
          ) : (
            <div className="w-20 h-20 rounded-lg border-2 border-white/30 shadow-lg bg-white/20"></div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 space-y-2">
          {cardData.email && (
            <div className="flex items-center gap-2">
              <span className="text-lg">📧</span>
              <a href={`mailto:${cardData.email}`} className="text-sm hover:underline flex-1">{cardData.email}</a>
            </div>
          )}
          {cardData.phone && (
            <div className="flex items-center gap-2">
              <span className="text-lg">📱</span>
              <a href={`tel:${cardData.phone}`} className="text-sm hover:underline flex-1">{cardData.phone}</a>
            </div>
          )}
          {cardData.website && (
            <div className="flex items-center gap-2">
              <span className="text-lg">🌐</span>
              <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm hover:underline flex-1">
                {cardData.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {cardData.address && (
            <div className="flex items-center gap-2">
              <span className="text-lg">📍</span>
              <p className="text-sm flex-1">{cardData.address}</p>
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

      {/* Web Links Section Footer */}
      <div className="p-4 bg-white/10 backdrop-blur-sm">
        <div className="mb-2">
          <p className="text-xs font-semibold text-center mb-1">Web Links</p>
          <p className="text-xs text-center opacity-75">Discover our offerings</p>
        </div>
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="flex justify-center gap-2 flex-wrap">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a
                key={p}
                href={u}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-white/30 rounded text-xs font-semibold hover:bg-white/40"
              >
                {p}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
