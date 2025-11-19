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

export default function MinimalBeigeTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] bg-stone-50 rounded-lg shadow-sm border border-stone-200 flex flex-col p-8">
      <div className="text-center mb-8 flex-shrink-0">
        {cardData.profileImage ? (
          <img src={cardData.profileImage} alt={cardData.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />
        ) : (
          <div className="w-20 h-20 bg-stone-300 rounded-full mx-auto mb-4"></div>
        )}
        <h2 className="text-2xl font-light text-stone-800 mb-2">{cardData.name || 'Your Name'}</h2>
        <div className="w-12 h-px bg-stone-400 mx-auto mb-3"></div>
        <p className="text-xs text-stone-600 uppercase tracking-widest mb-1">{cardData.title || 'Job Title'}</p>
        <p className="text-xs text-stone-500">{cardData.company || 'Company'}</p>
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-2 text-center text-sm text-stone-700">
        {cardData.email && <a href={`mailto:${cardData.email}`} className="block hover:text-stone-900">{cardData.email}</a>}
        {cardData.phone && <a href={`tel:${cardData.phone}`} className="block hover:text-stone-900">{cardData.phone}</a>}
        {cardData.website && <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="block hover:text-stone-900">{cardData.website.replace(/^https?:\/\//, '')}</a>}
        {cardData.address && <p className="block text-stone-700">{cardData.address}</p>}
      </div>
      {cardData.bio && (
        <div className="mt-6 pt-6 border-t border-stone-200">
          <p className="text-sm text-stone-600 text-center leading-relaxed">{cardData.bio}</p>
        </div>
      )}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="flex justify-center gap-4 mt-8 pt-6 border-t border-stone-200 flex-shrink-0">
          {Object.entries(cardData.socialLinks).map(([p, u]) => (
            <a key={p} href={u} target="_blank" rel="noopener noreferrer" className="text-stone-600 hover:text-stone-800 text-xs uppercase tracking-wider">{p}</a>
          ))}
        </div>
      )}
    </div>
  )
}
