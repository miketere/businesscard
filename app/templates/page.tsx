import { getUserPlanTier } from '@/lib/templateAccess'
import { templates } from '@/lib/templates'
import TemplateGallery from '@/components/TemplateGallery'
import Header from '@/components/Header'

export default async function TemplatesPage() {
  // Show ALL templates, not just accessible ones
  // Locked templates will be marked as locked in the gallery
  const userPlan = await getUserPlanTier()

  return (
    <>
      <Header breadcrumbs={[{ label: 'Templates' }]} />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Choose Your Template</h1>
          <p className="text-lg text-gray-600">
            Browse our collection of professional business card templates. Select a design that matches your style.
          </p>
        </div>

        <TemplateGallery templates={templates} userPlan={userPlan} />
      </div>
    </>
  )
}

