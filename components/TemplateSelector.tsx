'use client'

const templates = [
  { id: 'default', name: 'Default', preview: '🎨' },
  { id: 'modern', name: 'Modern', preview: '✨' },
  { id: 'minimal', name: 'Minimal', preview: '📄' },
]

export default function TemplateSelector({ selected, onSelect }: { selected: string; onSelect: (id: string) => void }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      {templates.map((template) => (
        <button
          key={template.id}
          type="button"
          onClick={() => onSelect(template.id)}
          className={`p-4 border-2 rounded-lg text-center transition-all ${
            selected === template.id
              ? 'border-indigo-600 bg-indigo-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-3xl mb-2">{template.preview}</div>
          <div className="text-sm font-medium">{template.name}</div>
        </button>
      ))}
    </div>
  )
}

