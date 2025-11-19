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

export default function PremiumBlackTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gray-900 rounded-2xl text-white shadow-2xl flex flex-col relative overflow-hidden p-8">
      <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 rounded-full -mr-24 -mt-24"></div>
      <div className="absolute bottom-0 left-0 w-36 h-36 bg-amber-400/5 rounded-full -ml-18 -mb-18"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-8 flex-shrink-0">
          {cardData.profileImage ? (
            <img src={cardData.profileImage} alt={cardData.name} className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-amber-400/30 shadow-2xl" />
          ) : (
            <div className="w-32 h-32 bg-amber-400/20 rounded-full mx-auto mb-6 border-4 border-amber-400/30 shadow-2xl"></div>
          )}
          <h2 className="text-4xl font-bold mb-3">{cardData.name || 'Your Name'}</h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto mb-3"></div>
          <p className="text-xl text-amber-300 mb-2">{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-gray-400">{cardData.company || 'Company'}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 space-y-2 mb-4">
            {cardData.email && <a href={`mailto:${cardData.email}`} className="flex items-center gap-3 hover:opacity-90"><span className="text-amber-400">📧</span><span className="text-sm">{cardData.email}</span></a>}
            {cardData.phone && <a href={`tel:${cardData.phone}`} className="flex items-center gap-3 hover:opacity-90"><span className="text-amber-400">📱</span><span className="text-sm">{cardData.phone}</span></a>}
            {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-90"><span className="text-amber-400">🌐</span><span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span></a>}
            {cardData.address && <div className="flex items-center gap-3"><span className="text-amber-400">📍</span><span className="text-sm">{cardData.address}</span></div>}
          </div>
        </div>
        {cardData.bio && (
          <div className="mt-4 pt-4 border-t border-amber-400/20">
            <p className="text-sm text-amber-300/90 text-center leading-relaxed">{cardData.bio}</p>
          </div>
        )}
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="flex justify-center gap-4 flex-shrink-0">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-amber-300 hover:text-amber-200 text-sm font-medium">{p}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

