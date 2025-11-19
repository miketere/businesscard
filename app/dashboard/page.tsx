import { prisma } from '@/lib/prisma'
import Link from 'next/link'
import { Plus, Sparkles, Eye, Share2 } from 'lucide-react'
import Header from '@/components/Header'
import CardsGrid from '@/components/CardsGrid'
import { getSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

// Force dynamic rendering to avoid build-time database access
export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const session = await getSession()
  
  if (!session || !session.user) {
    redirect('/auth/signin?callbackUrl=/dashboard')
  }

  const userId = session.user.id

  const cards = await prisma.card.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: {
          views: true,
          shares: true,
        },
      },
    },
  })

  const totalViews = cards.reduce((sum, card) => sum + card._count.views, 0)
  const totalShares = cards.reduce((sum, card) => sum + card._count.shares, 0)

  return (
    <>
      <Header breadcrumbs={[{ label: 'Cards' }]} />
      <div className="min-h-screen bg-gradient-to-br from-teal-50 via-white to-orange-50 pt-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h1 className="text-4xl font-bold text-neutral-900 mb-2">My Cards</h1>
                <p className="text-neutral-600">Manage and track your digital business cards</p>
              </div>
              <Link
                href="/create"
                className="flex items-center gap-2 px-6 py-3 rounded-xl gradient-primary text-white font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create New Card
              </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Total Cards</p>
                    <p className="text-3xl font-bold text-teal-600">{cards.length}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-orange-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Total Views</p>
                    <p className="text-3xl font-bold text-orange-600">{totalViews}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center">
                    <Eye className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-sm border border-teal-200/50 shadow-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-neutral-600 mb-1">Total Shares</p>
                    <p className="text-3xl font-bold text-teal-600">{totalShares}</p>
                  </div>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-orange-500 flex items-center justify-center">
                    <Share2 className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid */}
          {cards.length === 0 ? (
            <div className="text-center py-20 bg-white/80 backdrop-blur-sm rounded-3xl border border-teal-200/50 shadow-sm">
              <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-3">No Cards Yet</h3>
              <p className="text-neutral-600 mb-8 max-w-md mx-auto">
                Create your first digital business card and start making connections that matter.
              </p>
              <Link
                href="/create"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl gradient-primary text-white font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Your First Card
              </Link>
            </div>
          ) : (
            <CardsGrid cards={cards} />
          )}
        </div>
      </div>
    </>
  )
}
