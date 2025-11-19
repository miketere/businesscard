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

export default function LuxuryGoldTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gradient-to-br from-amber-900 via-yellow-800 to-amber-700 rounded-2xl text-white shadow-2xl flex flex-col relative overflow-hidden p-8">
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/20 rounded-full -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-yellow-400/10 rounded-full -ml-16 -mb-16"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-8 flex-shrink-0">
          {cardData.profileImage ? (
            <img src={cardData.profileImage} alt={cardData.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-amber-300/50 shadow-2xl" />
          ) : (
            <div className="w-32 h-32 bg-amber-300/30 rounded-full mx-auto mb-6 border-4 border-amber-300/50 shadow-2xl"></div>
          )}
          <h2 className="text-4xl font-bold mb-3 drop-shadow-lg">{cardData.name || 'Your Name'}</h2>
          <div className="w-24 h-1 bg-amber-300 mx-auto mb-3"></div>
          <p className="text-xl text-amber-200 mb-2">{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-amber-300/80">{cardData.company || 'Company'}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 space-y-2 max-w-sm mx-auto">
            {cardData.email && <a href={`mailto:${cardData.email}`} className="flex items-center justify-center gap-2 hover:opacity-90"><span>📧</span><span className="text-sm">{cardData.email}</span></a>}
            {cardData.phone && <a href={`tel:${cardData.phone}`} className="flex items-center justify-center gap-2 hover:opacity-90"><span>📱</span><span className="text-sm">{cardData.phone}</span></a>}
            {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 hover:opacity-90"><span>🌐</span><span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span></a>}
            {cardData.address && <div className="flex items-center justify-center gap-2"><span>📍</span><span className="text-sm">{cardData.address}</span></div>}
          </div>
        </div>
        {cardData.bio && (
          <div className="mt-4 pt-4 border-t border-amber-300/20">
            <p className="text-sm text-amber-200/90 text-center leading-relaxed">{cardData.bio}</p>
          </div>
        )}
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-amber-200 hover:text-amber-100 text-sm font-medium">{p}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

