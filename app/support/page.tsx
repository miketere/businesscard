import Header from '@/components/Header'

export default function SupportPage() {
  return (
    <>
      <Header breadcrumbs={[{ label: 'Contact Support' }]} />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Contact Support</h1>
          <p className="text-gray-600">Coming soon...</p>
        </div>
      </div>
    </>
  )
}

