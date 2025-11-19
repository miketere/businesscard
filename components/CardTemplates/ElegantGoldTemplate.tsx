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

export default function ElegantGoldTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gradient-to-br from-amber-50 to-yellow-50 rounded-2xl shadow-xl border-2 border-amber-200 flex flex-col p-8">
      <div className="text-center mb-8 flex-shrink-0">
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-amber-300 shadow-lg" />
        ) : (
          <div className="w-28 h-28 bg-amber-200 rounded-full mx-auto mb-4 border-4 border-amber-300 shadow-lg"></div>
        )}
        <h2 className="text-3xl font-bold text-gray-900 mb-2">{cardData.name || 'Your Name'}</h2>
        <div className="w-20 h-1 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto mb-2"></div>
        <p className="text-lg text-amber-700 font-semibold mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-sm text-gray-600">{cardData.company || 'Company'}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {cardData.email && <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg"><span className="text-amber-600 text-xl">📧</span><a href={`mailto:${cardData.email}`} className="text-sm text-gray-700 hover:text-amber-700 flex-1">{cardData.email}</a></div>}
        {cardData.phone && <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg"><span className="text-amber-600 text-xl">📱</span><a href={`tel:${cardData.phone}`} className="text-sm text-gray-700 hover:text-amber-700 flex-1">{cardData.phone}</a></div>}
        {cardData.website && <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg"><span className="text-amber-600 text-xl">🌐</span><a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-gray-700 hover:text-amber-700 flex-1">{cardData.website.replace(/^https?:\/\//, '')}</a></div>}
        {cardData.address && <div className="flex items-center gap-3 p-3 bg-white/60 rounded-lg"><span className="text-amber-600 text-xl">📍</span><p className="text-sm text-gray-700 flex-1">{cardData.address}</p></div>}
      </div>
      {cardData.bio && (
        <div className="mt-4 pt-4 border-t border-amber-200">
          <p className="text-sm text-gray-600 text-center leading-relaxed">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-amber-200 flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-800 text-sm font-medium">{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}
