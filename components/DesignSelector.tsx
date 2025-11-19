'use client'

interface Design {
  id: string
  name: string
  isPro?: boolean
}

interface DesignSelectorProps {
  designs: Design[]
  selected: string
  onSelect: (designId: string) => void
}

export default function DesignSelector({ designs, selected, onSelect }: DesignSelectorProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Design</h3>
      <div className="grid grid-cols-5 gap-3">
        {designs.map((design) => (
          <div key={design.id} className="relative">
            <button
              onClick={() => onSelect(design.id)}
              className={`w-full aspect-[3/4] rounded-lg border-2 transition-all ${
                selected === design.id
                  ? 'border-purple-600 ring-2 ring-purple-200'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{
                background: design.id === 'default' 
                  ? 'linear-gradient(135deg, #9333EA 0%, #E9D5FF 100%)'
                  : design.id === 'flat'
                  ? 'linear-gradient(135deg, #3B82F6, #1E40AF)'
                  : design.id === 'modern'
                  ? 'linear-gradient(135deg, #10B981, #059669)'
                  : design.id === 'sleek'
                  ? 'linear-gradient(135deg, #F59E0B, #D97706)'
                  : design.id === 'minimal'
                  ? 'linear-gradient(135deg, #6B7280, #4B5563)'
                  : 'linear-gradient(135deg, #EC4899, #BE185D)',
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-white text-xs font-medium">{design.name}</span>
              </div>
            </button>
            {design.isPro && (
              <div className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                PRO
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

