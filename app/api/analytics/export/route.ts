import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCardAnalytics } from '@/lib/analytics'

const TEMP_USER_ID = 'temp-user-id'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const cardId = searchParams.get('cardId')
    const format = searchParams.get('format') || 'csv'
    const startDate = searchParams.get('startDate') ? new Date(searchParams.get('startDate')!) : undefined
    const endDate = searchParams.get('endDate') ? new Date(searchParams.get('endDate')!) : undefined

    let cards
    if (cardId) {
      const card = await prisma.card.findUnique({ where: { id: cardId } })
      cards = card ? [card] : []
    } else {
      cards = await prisma.card.findMany({
        where: { userId: TEMP_USER_ID },
      })
    }

    const analyticsData = await Promise.all(
      cards.map(async (card) => ({
        card,
        analytics: await getCardAnalytics(card.id, startDate, endDate),
      }))
    )

    if (format === 'csv') {
      const csvRows = [
        ['Card Name', 'Views', 'Shares', 'Saves', 'Contact Captures', 'Date Range'],
        ...analyticsData.map(({ card, analytics }) => [
          card.name,
          analytics.totalViews.toString(),
          analytics.totalShares.toString(),
          analytics.totalSaves.toString(),
          analytics.totalContactCaptures.toString(),
          `${startDate?.toISOString().split('T')[0] || 'All'} - ${endDate?.toISOString().split('T')[0] || 'All'}`,
        ]),
      ]

      const csv = csvRows.map(row => row.map(cell => `"${cell}"`).join(',')).join('\n')
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="analytics-${new Date().toISOString().split('T')[0]}.csv"`,
        },
      })
    } else {
      // JSON format
      return NextResponse.json({
        exportDate: new Date().toISOString(),
        dateRange: {
          start: startDate?.toISOString() || null,
          end: endDate?.toISOString() || null,
        },
        data: analyticsData.map(({ card, analytics }) => ({
          card: {
            id: card.id,
            name: card.name,
            template: card.template,
          },
          metrics: {
            views: analytics.totalViews,
            shares: analytics.totalShares,
            saves: analytics.totalSaves,
            contactCaptures: analytics.totalContactCaptures,
          },
          breakdown: {
            viewsByDate: analytics.viewsByDate,
            sharesByMethod: analytics.sharesByMethod,
            viewsByDevice: analytics.viewsByDevice,
            viewsByBrowser: analytics.viewsByBrowser,
            viewsByOS: analytics.viewsByOS,
            viewsByCountry: analytics.viewsByCountry,
            topReferrers: analytics.topReferrers,
          },
        })),
      })
    }
  } catch (error: any) {
    console.error('Error exporting analytics:', error)
    return NextResponse.json({ error: error.message || 'Failed to export analytics' }, { status: 500 })
  }
}

