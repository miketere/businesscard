import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getCardAnalytics } from '@/lib/analytics'

const TEMP_USER_ID = 'temp-user-id'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const teamId = searchParams.get('teamId')
    const timeframe = searchParams.get('timeframe') || 'all' // '7d', '30d', '90d', 'all'

    // Calculate date range
    let startDate: Date | undefined
    const endDate = new Date()
    
    if (timeframe === '7d') {
      startDate = new Date()
      startDate.setDate(startDate.getDate() - 7)
    } else if (timeframe === '30d') {
      startDate = new Date()
      startDate.setDate(startDate.getDate() - 30)
    } else if (timeframe === '90d') {
      startDate = new Date()
      startDate.setDate(startDate.getDate() - 90)
    }

    // For now, we'll use all cards for the temp user
    // In a real implementation, this would filter by team members
    const cards = await prisma.card.findMany({
      where: { userId: TEMP_USER_ID },
      include: { user: true },
    })

    const leaderboardData = await Promise.all(
      cards.map(async (card) => {
        const analytics = await getCardAnalytics(card.id, startDate, endDate)
        const score = analytics.totalViews * 1 + 
                     analytics.totalShares * 2 + 
                     analytics.totalSaves * 3 + 
                     analytics.totalContactCaptures * 5
        
        return {
          userId: card.userId,
          userName: card.user.name || 'Unknown',
          cardId: card.id,
          cardName: card.name,
          metrics: {
            views: analytics.totalViews,
            shares: analytics.totalShares,
            saves: analytics.totalSaves,
            contactCaptures: analytics.totalContactCaptures,
          },
          score,
        }
      })
    )

    // Group by user and aggregate scores
    const userScores = leaderboardData.reduce((acc, item) => {
      if (!acc[item.userId]) {
        acc[item.userId] = {
          userId: item.userId,
          userName: item.userName,
          totalViews: 0,
          totalShares: 0,
          totalSaves: 0,
          totalContactCaptures: 0,
          totalScore: 0,
          cardCount: 0,
        }
      }
      acc[item.userId].totalViews += item.metrics.views
      acc[item.userId].totalShares += item.metrics.shares
      acc[item.userId].totalSaves += item.metrics.saves
      acc[item.userId].totalContactCaptures += item.metrics.contactCaptures
      acc[item.userId].totalScore += item.score
      acc[item.userId].cardCount += 1
      return acc
    }, {} as Record<string, any>)

    const leaderboard = Object.values(userScores)
      .sort((a: any, b: any) => b.totalScore - a.totalScore)
      .map((user: any, index: number) => ({
        rank: index + 1,
        ...user,
      }))

    return NextResponse.json({
      timeframe,
      startDate: startDate?.toISOString() || null,
      endDate: endDate.toISOString(),
      leaderboard,
    })
  } catch (error: any) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json({ error: error.message || 'Failed to fetch leaderboard' }, { status: 500 })
  }
}

