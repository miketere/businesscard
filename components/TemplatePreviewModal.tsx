'use client'

import { X, Lock, ArrowRight } from 'lucide-react'
import { Template, PlanTier } from '@/lib/templates'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CardPreview from './CardPreview'

interface TemplatePreviewModalProps {
  template: Template | null
  isOpen: boolean
  onClose: () => void
  userPlan: PlanTier
}

export default function TemplatePreviewModal({
  template,
  isOpen,
  onClose,
  userPlan,
}: TemplatePreviewModalProps) {
  const router = useRouter()

  if (!isOpen || !template) return null

  const planHierarchy: Record<PlanTier, number> = {
    free: 0,
    basic: 1,
    pro: 2,
  }

  const userPlanLevel = planHierarchy[userPlan] || 0
  const requiredPlanLevel = planHierarchy[template.requiredPlan] || 0
  const isLocked = userPlanLevel < requiredPlanLevel

  const planBadgeColors = {
    free: 'bg-gray-100 text-gray-700',
    basic: 'bg-teal-100 text-teal-700',
    pro: 'bg-orange-100 text-orange-700',
  }

  const handleUseTemplate = () => {
    if (!isLocked) {
      router.push(`/create?template=${template.id}`)
      onClose()
    }
  }

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
    template: template.id,
    socialLinks: {},
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl font-bold text-gray-900">{template.name}</h2>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full ${
                  planBadgeColors[template.requiredPlan]
                }`}
              >
                {template.requiredPlan.toUpperCase()}
              </span>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {template.category}
              </span>
            </div>
            <p className="text-sm text-gray-600">{template.description}</p>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <CardPreview cardData={sampleCardData} showQR={false} />
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-white">
          {isLocked ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <Lock className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-orange-900">
                    This template requires {template.requiredPlan.toUpperCase()} plan
                  </p>
                  <p className="text-xs text-orange-700 mt-1">
                    Subscribe to unlock this premium template
                  </p>
                </div>
              </div>
              <Link
                href="/settings/subscription"
                onClick={onClose}
                className="block w-full px-6 py-3 bg-orange-600 text-white rounded-lg font-semibold text-center hover:bg-orange-700 transition-colors flex items-center justify-center gap-2"
              >
                Subscribe to {template.requiredPlan === 'basic' ? 'Basic' : 'Pro'}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <button
              onClick={handleUseTemplate}
              className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-semibold hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
            >
              Use This Template
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

