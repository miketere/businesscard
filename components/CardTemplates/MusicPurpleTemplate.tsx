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

export default function MusicPurpleTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl text-white flex flex-col relative overflow-hidden p-8" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white/30 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 border-2 border-white/30 rounded-full"></div>
      </div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-8 flex-shrink-0">
          {cardData.profileImage ? (
            <img src={cardData.profileImage} alt={cardData.name} className="w-28 h-28 rounded-full mx-auto mb-6 object-cover border-4 border-white/40 shadow-2xl" />
          ) : (
            <div className="w-28 h-28 bg-white/20 rounded-full mx-auto mb-6 border-4 border-white/40 shadow-2xl"></div>
          )}
          <h2 className="text-3xl font-bold mb-3 drop-shadow-lg">{cardData.name || 'Your Name'}</h2>
          <p className="text-xl opacity-95 mb-2">{cardData.title || 'Job Title'}</p>
          <p className="text-sm opacity-85 mb-8">{cardData.company || 'Company'}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 space-y-2">
            {cardData.email && <a href={`mailto:${cardData.email}`} className="flex items-center gap-3 hover:opacity-90"><span className="text-xl">📧</span><span className="text-sm">{cardData.email}</span></a>}
            {cardData.phone && <a href={`tel:${cardData.phone}`} className="flex items-center gap-3 hover:opacity-90"><span className="text-xl">📱</span><span className="text-sm">{cardData.phone}</span></a>}
            {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-90"><span className="text-xl">🌐</span><span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span></a>}
            {cardData.address && <div className="flex items-center gap-3"><span className="text-xl">📍</span><span className="text-sm">{cardData.address}</span></div>}
          </div>
        </div>
        {cardData.bio && (
          <div className="mt-4 pt-4 border-t border-white/20">
            <p className="text-sm text-white/90 text-center leading-relaxed">{cardData.bio}</p>
          </div>
        )}
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white text-sm font-medium">{p}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

