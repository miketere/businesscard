'use client'

import { Template } from '@/lib/templates'
import { Lock } from 'lucide-react'
import { CardTemplates } from './CardTemplates'

interface TemplatePreviewProps {
  template: Template
  isLocked: boolean
  onClick: () => void
}

export default function TemplatePreview({ template, isLocked, onClick }: TemplatePreviewProps) {
  const planBadgeColors = {
    free: 'bg-gray-100 text-gray-700',
    basic: 'bg-teal-100 text-teal-700',
    pro: 'bg-orange-100 text-orange-700',
  }

  // Get the actual template component
  const TemplateComponent = CardTemplates[template.id as keyof typeof CardTemplates] || CardTemplates.default

  // Create sample card data for preview
  const sampleCardData = {
    name: template.sampleData.name,
    title: template.sampleData.title,
    company: template.sampleData.company,
    email: template.sampleData.email,
    phone: template.sampleData.phone,
    website: '',
    address: '',
    bio: '',
    profileImage: undefined,
    logo: undefined,
    primaryColor: template.previewColors.primary,
    secondaryColor: template.previewColors.secondary,
    socialLinks: {},
  }

  return (
    <div className="relative group">
      <button
        onClick={onClick}
        className={`w-full text-left transition-all duration-200 ${
          isLocked ? 'opacity-75' : 'cursor-pointer hover:scale-105'
        } cursor-pointer`}
      >
        {/* Render Actual Template Component - Scaled Down */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-gray-200 group-hover:border-purple-400 transition-colors aspect-[9/16] max-w-[180px] mx-auto relative">
          {/* Scale down the template for preview - using transform scale */}
          <div 
            className="absolute inset-0 pointer-events-none"
            style={{
              transform: 'scale(0.35)',
              transformOrigin: 'top left',
              width: '285.7%',
              height: '285.7%',
            }}
          >
            <TemplateComponent cardData={sampleCardData} />
          </div>
          
          {/* Lock Overlay */}
          {isLocked && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none z-10">
              <Lock className="w-8 h-8 text-white" />
            </div>
          )}
        </div>

        {/* Template Name */}
        <p className="mt-2 text-sm font-medium text-gray-900 text-center">{template.name}</p>
        
        {/* Badge */}
        <div className="mt-1 flex justify-center gap-2">
          <span className="text-[10px] font-medium text-gray-500">{template.category}</span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0 ${
              planBadgeColors[template.requiredPlan]
            }`}
          >
            {template.requiredPlan.toUpperCase()}
          </span>
        </div>
      </button>
    </div>
  )
}
