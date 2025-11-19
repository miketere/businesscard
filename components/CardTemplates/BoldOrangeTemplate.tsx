'use client'

import SocialIcon from '@/components/SocialIcon'

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

export default function BoldOrangeTemplate({ cardData }: { cardData: CardData }) {
  return (
    <div className="w-full max-w-sm mx-auto aspect-[9/16] rounded-2xl text-white flex flex-col relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${cardData.primaryColor}, ${cardData.secondaryColor})` }}>
      {/* Geometric Pattern Header */}
      <div className="h-32 relative">
        <div className="absolute inset-0 opacity-30">
          {/* Triangle Pattern */}
          <div className="absolute top-0 left-0 w-0 h-0 border-l-[100px] border-l-transparent border-t-[100px] border-t-white/20"></div>
          <div className="absolute top-0 right-0 w-0 h-0 border-r-[80px] border-r-transparent border-t-[80px] border-t-white/20"></div>
          <div className="absolute bottom-0 left-1/2 w-0 h-0 border-l-[60px] border-l-transparent border-b-[60px] border-b-white/20 transform -translate-x-1/2"></div>
        </div>
      </div>

      {/* Overlapping Profile - Positioned to overlap header */}
      <div className="px-6 -mt-12 flex-shrink-0 relative z-10">
        {cardData.profileImage ? (
          <img
            src={cardData.profileImage}
            alt={cardData.name}
            className="w-28 h-28 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-2xl"
          />
        ) : (
          <div className="w-28 h-28 bg-white/20 rounded-full mx-auto mb-4 border-4 border-white shadow-2xl"></div>
        )}
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2 drop-shadow-lg">{cardData.name || 'Your Name'}</h2>
          <p className="text-xl opacity-95 mb-1">{cardData.title || 'Job Title'}</p>
          {cardData.logo ? (
            <div className="mb-2 flex justify-center">
              <img
                src={cardData.logo}
                alt={cardData.company || 'Company Logo'}
                className="h-10 max-w-[120px] object-contain bg-white/20 rounded px-2 py-1"
              />
            </div>
          ) : (
            <p className="text-sm opacity-85">{cardData.company || 'Company'}</p>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex-1 p-6 flex flex-col justify-center">
        <div className="bg-white/15 backdrop-blur-md rounded-xl p-4 space-y-3">
          {cardData.email && (
            <a href={`mailto:${cardData.email}`} className="flex items-center gap-3 hover:opacity-90">
              <span className="text-xl">📧</span>
              <span className="text-sm">{cardData.email}</span>
            </a>
          )}
          {cardData.phone && (
            <a href={`tel:${cardData.phone}`} className="flex items-center gap-3 hover:opacity-90">
              <span className="text-xl">📱</span>
              <span className="text-sm">{cardData.phone}</span>
            </a>
          )}
          {cardData.website && (
            <a href={cardData.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-90">
              <span className="text-xl">🌐</span>
              <span className="text-sm">{cardData.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
          {cardData.address && (
            <div className="flex items-center gap-3 hover:opacity-90">
              <span className="text-xl">📍</span>
              <span className="text-sm">{cardData.address}</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Bio Section */}
      {cardData.bio && (
        <div className="px-6 pb-4 border-t border-white/20">
          <p className="text-sm text-white/90 text-center leading-relaxed pt-4">{cardData.bio}</p>
        </div>
      )}

      {/* Icon Footer */}
      {cardData.socialLinks && Object.keys(cardData.socialLinks).length > 0 && (
        <div className="p-4 bg-white/10 backdrop-blur-sm border-t border-white/20">
          <div className="flex justify-center gap-3 flex-wrap">
            {Object.entries(cardData.socialLinks).map(([p, u]) => (
              <a
                key={p}
                href={u}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/30 hover:bg-white/40 hover:scale-110 transition-all shadow-sm backdrop-blur-sm"
                title={p.charAt(0).toUpperCase() + p.slice(1)}
              >
                <SocialIcon platform={p} size={20} />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
