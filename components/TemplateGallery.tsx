'use client'

import { useState } from 'react'
import { Template, TemplateCategory, getAllCategories } from '@/lib/templates'
import { PlanTier } from '@/lib/templates'
import TemplatePreview from './TemplatePreview'
import TemplatePreviewModal from './TemplatePreviewModal'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface TemplateGalleryProps {
  templates: Template[]
  userPlan: PlanTier
}

export default function TemplateGallery({ templates, userPlan }: TemplateGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<TemplateCategory | 'All'>('All')
  const [showAll, setShowAll] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const planHierarchy: Record<PlanTier, number> = {
    free: 0,
    basic: 1,
    pro: 2,
  }

  const userPlanLevel = planHierarchy[userPlan] || 0

  const categories = ['All', ...getAllCategories()] as (TemplateCategory | 'All')[]

  const filteredTemplates =
    selectedCategory === 'All'
      ? templates
      : templates.filter(t => t.category === selectedCategory)

  const displayedTemplates = showAll ? filteredTemplates : filteredTemplates.slice(0, 5)
  const hasMore = filteredTemplates.length > 5

  const handleTemplateClick = (template: Template) => {
    setSelectedTemplate(template)
    setIsModalOpen(true)
  }

  const isTemplateLocked = (template: Template): boolean => {
    const requiredPlanLevel = planHierarchy[template.requiredPlan] || 0
    return userPlanLevel < requiredPlanLevel
  }

  return (
    <div className="space-y-6">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => {
              setSelectedCategory(category)
              setShowAll(false)
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedCategory === category
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayedTemplates.map(template => (
          <TemplatePreview
            key={template.id}
            template={template}
            isLocked={isTemplateLocked(template)}
            onClick={() => handleTemplateClick(template)}
          />
        ))}
      </div>

      {/* View More / View Less Button */}
      {hasMore && (
        <div className="text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
          >
            {showAll ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Show Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                View More ({filteredTemplates.length - 5} more templates)
              </>
            )}
          </button>
        </div>
      )}

      {/* Empty State */}
      {filteredTemplates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No templates found in this category.</p>
        </div>
      )}

      {/* Preview Modal */}
      <TemplatePreviewModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedTemplate(null)
        }}
        userPlan={userPlan}
      />
    </div>
  )
}

