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

export default function FinanceGreenTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-white rounded-lg shadow-lg border-2 flex flex-col p-8" style={{ borderColor: cardData.primaryColor }}>
      <div className="flex items-start justify-between mb-6 flex-shrink-0">
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{cardData.name || 'Your Name'}</h2>
          <p className="text-base font-semibold mb-1" style={{ color: cardData.primaryColor }}>{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
        </div>
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-20 h-20 rounded-lg object-cover border-2 flex-shrink-0" style={{ borderColor: cardData.primaryColor }} />
        ) : (
          <div className="w-20 h-20 rounded-lg border-2 flex-shrink-0" style={{ borderColor: cardData.primaryColor, backgroundColor: `${cardData.primaryColor}20` }}></div>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-2 border-t pt-4">
        {cardData.email && <div className="flex items-center gap-2"><span style={{ color: cardData.primaryColor }}>📧</span><a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.email}</a></div>}
        {cardData.phone && <div className="flex items-center gap-2"><span style={{ color: cardData.primaryColor }}>📱</span><a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.phone}</a></div>}
        {cardData.website && <div className="flex items-center gap-2"><span style={{ color: cardData.primaryColor }}>🌐</span><a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline flex-1">{cardData.website.replace(/^https?:\/\//, '')}</a></div>}
        {cardData.address && <div className="flex items-center gap-2"><span style={{ color: cardData.primaryColor }}>📍</span><p className="text-sm text-gray-700 flex-1">{cardData.address}</p></div>}
      </div>
      {cardData.bio && (
        <div className="mt-4 pt-4 border-t">
          <p className="text-sm text-gray-600 text-center leading-relaxed">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="flex gap-3 mt-6 pt-4 border-t flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:underline" style={{ color: cardData.primaryColor }}>{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}
