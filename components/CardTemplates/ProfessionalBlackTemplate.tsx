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

export default function ProfessionalBlackTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-gray-900 text-white rounded-2xl shadow-2xl flex flex-col p-8">
      <div className="text-center mb-8 flex-shrink-0">
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-2 border-white/20" />
        ) : (
          <div className="w-24 h-24 bg-gray-700 rounded-full mx-auto mb-4 border-2 border-white/20"></div>
        )}
        <h2 className="text-3xl font-bold mb-2">{cardData.name || 'Your Name'}</h2>
        <p className="text-lg text-gray-300 mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-sm text-gray-400">{cardData.company || 'Company'}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-3">
        {cardData.email && <a href={`mailto:${cardData.email}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><span>📧</span> <span className="text-sm">{cardData.email}</span></a>}
        {cardData.phone && <a href={`tel:${cardData.phone}`} className="flex items-center gap-2 text-gray-300 hover:text-white"><span>📱</span> <span className="text-sm">{cardData.phone}</span></a>}
        {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-gray-300 hover:text-white"><span>🌐</span> <span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span></a>}
        {cardData.address && <div className="flex items-center gap-2 text-gray-300"><span>📍</span> <span className="text-sm">{cardData.address}</span></div>}
      </div>
      {cardData.bio && (
        <div className="mt-4 pt-4 border-t border-gray-700">
          <p className="text-sm text-gray-300 text-center leading-relaxed">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-gray-700 flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white text-sm">{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}
