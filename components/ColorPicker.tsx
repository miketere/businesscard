'use client'

interface ColorPickerProps {
  selectedColor: string
  onColorChange: (color: string) => void
}

const presetColors = [
  { name: 'Purple', value: '#9333EA' },
  { name: 'Blue', value: '#3B82F6' },
  { name: 'Light Blue', value: '#60A5FA' },
  { name: 'Teal', value: '#14B8A6' },
  { name: 'Green', value: '#10B981' },
  { name: 'Yellow', value: '#EAB308' },
  { name: 'Orange', value: '#F97316' },
  { name: 'Red', value: '#EF4444' },
  { name: 'Pink', value: '#EC4899' },
  { name: 'Black', value: '#000000' },
]

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Color</h3>
        <span className="bg-yellow-400 text-yellow-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
          PRO
        </span>
      </div>
      
      {/* Gradient Picker */}
      <div className="mb-4">
        <button
          onClick={() => onColorChange(selectedColor)}
          className="w-full h-12 rounded-lg border-2 border-gray-200 hover:border-gray-300 transition-colors relative overflow-hidden"
          style={{
            background: `linear-gradient(135deg, ${selectedColor}, ${selectedColor}88)`,
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white border-2 border-gray-300 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-600"></div>
            </div>
          </div>
        </button>
      </div>

      {/* Preset Colors */}
      <div className="flex flex-wrap gap-2">
        {presetColors.map((color) => (
          <button
            key={color.value}
            onClick={() => onColorChange(color.value)}
            className={`w-10 h-10 rounded-lg border-2 transition-all ${
              selectedColor === color.value
                ? 'border-purple-600 ring-2 ring-purple-200'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            style={{ backgroundColor: color.value }}
            title={color.name}
          >
            {selectedColor === color.value && (
              <div className="w-full h-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

