import { prisma } from '@/lib/prisma'
import { notFound, redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import { getCardAnalytics } from '@/lib/analytics'
import Header from '@/components/Header'
import CardDetailView from '@/components/CardDetailView'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Force dynamic rendering
export const dynamic = 'force-dynamic'

export default async function DashboardCardDetailPage({ 
  params,
}: { 
  params: { id: string }
}) {
  const session = await getSession()
  
  if (!session || !session.user || !session.user.id) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  const userId = session.user.id

  const card = await prisma.card.findUnique({
    where: { id: params.id },
    include: {
      user: true,
      _count: {
        select: {
          views: true,
          shares: true,
          saves: true,
          contacts: true,
        },
      },
    },
  })

  if (!card) {
    notFound()
  }

  // Verify card belongs to user
  if (card.userId !== userId) {
    redirect('/dashboard')
  }

  // Get analytics data
  const analytics = await getCardAnalytics(card.id)

  const cardUrl = `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/card/${card.id}`

  const cardData = {
    name: card.name,
    title: card.title ?? undefined,
    company: card.company ?? undefined,
    email: card.email,
    phone: card.phone ?? undefined,
    website: card.website ?? undefined,
    address: card.address ?? undefined,
    bio: card.bio ?? undefined,
    profileImage: card.profileImage ?? undefined,
    logo: card.logo ?? undefined,
    primaryColor: card.primaryColor,
    secondaryColor: card.secondaryColor,
    template: card.template,
    socialLinks: card.socialLinks ? JSON.parse(card.socialLinks) : {},
  }

  return (
    <>
      <Header breadcrumbs={[
        { label: 'Cards', href: '/dashboard' },
        { label: card.name },
      ]} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {/* Back Button */}
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Cards</span>
          </Link>

          {/* Card Detail View */}
          <CardDetailView
            card={card}
            cardData={cardData}
            cardUrl={cardUrl}
            analytics={{
              ...analytics,
              totalViews: card._count.views,
              totalShares: card._count.shares,
              totalSaves: card._count.saves,
              totalContacts: card._count.contacts,
            }}
          />
        </div>
      </div>
    </>
  )
}

