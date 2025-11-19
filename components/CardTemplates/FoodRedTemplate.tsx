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

export default function FoodRedTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col">
      <div className="h-20 relative" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-white transform -skew-y-1"></div>
      </div>
      <div className="px-6 pb-6 -mt-4 flex-shrink-0">
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-xl" />
        ) : (
          <div className="w-28 h-28 rounded-full mx-auto mb-4 border-4 border-white shadow-xl" style={{ backgroundColor: cardData.primaryColor }}></div>
        )}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-1">{cardData.name || 'Your Name'}</h2>
          <p className="text-base font-semibold mb-1" style={{ color: cardData.primaryColor }}>{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
        </div>
      </div>
      <div className="flex-1 px-6 pb-6 flex flex-col justify-center space-y-2">
        {cardData.email && <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}><span style={{ color: cardData.primaryColor }}>📧</span><a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.email}</a></div>}
        {cardData.phone && <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}><span style={{ color: cardData.primaryColor }}>📱</span><a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:underline flex-1">{cardData.phone}</a></div>}
        {cardData.website && <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}><span style={{ color: cardData.primaryColor }}>🌐</span><a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:underline flex-1">{cardData.website.replace(/^https?:\/\//, '')}</a></div>}
        {cardData.address && <div className="flex items-center gap-2 p-2 rounded" style={{ backgroundColor: `${cardData.primaryColor}15` }}><span style={{ color: cardData.primaryColor }}>📍</span><p className="text-sm text-gray-700 flex-1">{cardData.address}</p></div>}
      </div>
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="px-6 pb-6 flex justify-center gap-3 flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-full text-xs font-semibold text-white hover:opacity-90" style={{ backgroundColor: cardData.primaryColor }}>{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}
