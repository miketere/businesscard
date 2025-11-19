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

export default function ColorfulRainbowTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl text-white flex flex-col relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor}, ${cardData.primaryColor})` }}>
      <div className="text-center mb-8 p-6 flex-shrink-0">
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white/40 shadow-2xl" />
        ) : (
          <div className="w-28 h-28 bg-white/30 rounded-full mx-auto mb-4 border-4 border-white/40 shadow-2xl"></div>
        )}
        <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{cardData.name || 'Your Name'}</h2>
        <p className="text-xl opacity-95 mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-sm opacity-85">{cardData.company || 'Company'}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6">
        <div className="space-y-3 bg-white/15 backdrop-blur-md rounded-xl p-4">
          {cardData.email && <a href={`mailto:${cardData.email}`} className="flex items-center gap-3 hover:opacity-90"><span className="text-xl">📧</span><span className="text-sm">{cardData.email}</span></a>}
          {cardData.phone && <a href={`tel:${cardData.phone}`} className="flex items-center gap-3 hover:opacity-90"><span className="text-xl">📱</span><span className="text-sm">{cardData.phone}</span></a>}
          {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-90"><span className="text-xl">🌐</span><span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span></a>}
          {cardData.address && <div className="flex items-center gap-3"><span className="text-xl">📍</span><span className="text-sm">{cardData.address}</span></div>}
        </div>
      </div>
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-white/20">
          <p className="text-sm text-white/90 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="p-4 flex justify-center gap-4 flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white text-sm font-medium">{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}

