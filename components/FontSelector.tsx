'use client'

interface Font {
  id: string
  name: string
  family: string
}

interface FontSelectorProps {
  fonts: Font[]
  selected: string
  onSelect: (fontId: string) => void
}

const defaultFonts: Font[] = [
  { id: 'nunito', name: 'Nunito Sans', family: 'Nunito Sans, sans-serif' },
  { id: 'inter', name: 'Inter', family: 'Inter, sans-serif' },
  { id: 'roboto', name: 'Roboto', family: 'Roboto, sans-serif' },
  { id: 'opensans', name: 'Open Sans', family: 'Open Sans, sans-serif' },
  { id: 'lato', name: 'Lato', family: 'Lato, sans-serif' },
]

export default function FontSelector({ fonts = defaultFonts, selected, onSelect }: FontSelectorProps) {
  const selectedFont = fonts.find(f => f.id === selected) || fonts[0]

  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">Font</h3>
      <select
        value={selected}
        onChange={(e) => onSelect(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-white"
        style={{ fontFamily: selectedFont.family }}
      >
        {fonts.map((font) => (
          <option key={font.id} value={font.id} style={{ fontFamily: font.family }}>
            {font.name} {font.id === 'nunito' ? 'Default' : ''}
          </option>
        ))}
      </select>
    </div>
  )
}

