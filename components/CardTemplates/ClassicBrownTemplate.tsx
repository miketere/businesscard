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

export default function ClassicBrownTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-amber-50 rounded-lg shadow-md border-2 border-amber-200 flex flex-col p-8">
      <div className="text-center mb-8 flex-shrink-0">
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-amber-300" />
        ) : (
          <div className="w-24 h-24 bg-amber-300 rounded-full mx-auto mb-4 border-4 border-amber-400"></div>
        )}
        <h2 className="text-2xl font-bold text-amber-900 mb-2">{cardData.name || 'Your Name'}</h2>
        <div className="w-16 h-0.5 bg-amber-600 mx-auto mb-2"></div>
        <p className="text-base text-amber-800 font-medium mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-sm text-amber-700">{cardData.company || 'Company'}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-2">
        {cardData.email && <div className="flex items-center gap-2 p-2 bg-white rounded"><span className="text-amber-700">📧</span><a href={`mailto:${cardData.email}`} className="text-sm text-amber-900 hover:underline flex-1">{cardData.email}</a></div>}
        {cardData.phone && <div className="flex items-center gap-2 p-2 bg-white rounded"><span className="text-amber-700">📱</span><a href={`tel:${cardData.phone}`} className="text-sm text-amber-900 hover:underline flex-1">{cardData.phone}</a></div>}
        {cardData.website && <div className="flex items-center gap-2 p-2 bg-white rounded"><span className="text-amber-700">🌐</span><a href={cardData.website} target="_blank" rel="noopener noreferrer" className="text-sm text-amber-900 hover:underline flex-1">{cardData.website.replace(/^https?:\/\//, '')}</a></div>}
        {cardData.address && <div className="flex items-center gap-2 p-2 bg-white rounded"><span className="text-amber-700">📍</span><p className="text-sm text-amber-900 flex-1">{cardData.address}</p></div>}
      </div>
      {cardData.bio && (
        <div className="mt-4 pt-4 border-t border-amber-300">
          <p className="text-sm text-amber-800 text-center leading-relaxed">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="flex justify-center gap-4 mt-6 pt-4 border-t border-amber-300 flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-amber-700 hover:text-amber-900 text-sm">{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}
