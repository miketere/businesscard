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

export default function TechFuturisticTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gray-900 rounded-2xl shadow-2xl flex flex-col relative overflow-hidden p-8">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-pink-900/50"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-pink-500 to-indigo-500"></div>
      <div className="relative z-10 flex flex-col h-full">
        <div className="text-center mb-8 flex-shrink-0">
          {cardData.profileImage ? (
            <img src={cardData.profileImage} alt={cardData.name} className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-2 border-indigo-400 shadow-lg shadow-indigo-500/50" />
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto mb-4 border-2 border-indigo-400 shadow-lg shadow-indigo-500/50 bg-indigo-500/30"></div>
          )}
          <h2 className="text-3xl font-bold text-white mb-2">{cardData.name || 'Your Name'}</h2>
          <p className="text-lg text-indigo-300 font-semibold mb-1">{cardData.title || 'Job Title'}</p>
          <p className="text-sm text-gray-400">{cardData.company || 'Company'}</p>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="space-y-2 bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-indigo-500/30">
            {cardData.email && <a href={`mailto:${cardData.email}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-indigo-400">📧</span><span className="text-sm">{cardData.email}</span></a>}
            {cardData.phone && <a href={`tel:${cardData.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-indigo-400">📱</span><span className="text-sm">{cardData.phone}</span></a>}
            {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white"><span className="text-indigo-400">🌐</span><span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span></a>}
            {cardData.address && <div className="flex items-center gap-2 text-gray-300"><span className="text-indigo-400">📍</span><span className="text-sm">{cardData.address}</span></div>}
          </div>
        </div>
        {cardData.bio && (
          <div className="mt-4 pt-4 border-t border-indigo-500/30">
            <p className="text-sm text-gray-300 text-center leading-relaxed">{cardData.bio}</p>
          </div>
        )}
        {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
          <div className="flex justify-center gap-4 mt-6 flex-shrink-0">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">{p}</a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

