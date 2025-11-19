import { prisma } from './prisma'

// Parse user agent to extract device, browser, and OS
function parseUserAgent(userAgent?: string | null) {
  if (!userAgent) return { device: null, browser: null, os: null }

  const ua = userAgent.toLowerCase()
  
  // Detect device
  let device: string | null = null
  if (ua.includes('mobile') || ua.includes('android')) {
    device = 'mobile'
  } else if (ua.includes('tablet') || ua.includes('ipad')) {
    device = 'tablet'
  } else {
    device = 'desktop'
  }

  // Detect browser
  let browser: string | null = null
  if (ua.includes('chrome') && !ua.includes('edg')) {
    browser = 'chrome'
  } else if (ua.includes('firefox')) {
    browser = 'firefox'
  } else if (ua.includes('safari') && !ua.includes('chrome')) {
    browser = 'safari'
  } else if (ua.includes('edg')) {
    browser = 'edge'
  } else if (ua.includes('opera')) {
    browser = 'opera'
  }

  // Detect OS
  let os: string | null = null
  if (ua.includes('windows')) {
    os = 'windows'
  } else if (ua.includes('mac')) {
    os = 'macos'
  } else if (ua.includes('linux')) {
    os = 'linux'
  } else if (ua.includes('android')) {
    os = 'android'
  } else if (ua.includes('ios') || ua.includes('iphone') || ua.includes('ipad')) {
    os = 'ios'
  }

  return { device, browser, os }
}

export async function trackCardView(
  cardId: string,
  ipAddress?: string | null,
  userAgent?: string | null,
  referrer?: string | null,
  utmParams?: {
    source?: string
    medium?: string
    campaign?: string
    term?: string
    content?: string
  } | null
) {
  try {
    const { device, browser, os } = parseUserAgent(userAgent)
    
    await prisma.cardView.create({
      data: {
        cardId,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
        referrer: referrer || null,
        utmSource: utmParams?.source || null,
        utmMedium: utmParams?.medium || null,
        utmCampaign: utmParams?.campaign || null,
        utmTerm: utmParams?.term || null,
        utmContent: utmParams?.content || null,
        device,
        browser,
        os,
      },
    })
  } catch (error) {
    console.error('Analytics error:', error)
  }
}

export async function trackCardShare(
  cardId: string,
  method: string,
  sharedWith?: string,
  metadata?: Record<string, any>
) {
  try {
    await prisma.share.create({
      data: {
        cardId,
        method,
        sharedWith,
        metadata: metadata ? JSON.stringify(metadata) : null,
      },
    })
  } catch (error) {
    console.error('Share tracking error:', error)
  }
}

export async function trackCardSave(
  cardId: string,
  method: string = 'vcard',
  ipAddress?: string | null,
  userAgent?: string | null
) {
  try {
    await prisma.cardSave.create({
      data: {
        cardId,
        method,
        ipAddress: ipAddress || null,
        userAgent: userAgent || null,
      },
    })
  } catch (error) {
    console.error('Save tracking error:', error)
  }
}

export async function getCardAnalytics(
  cardId: string,
  startDate?: Date,
  endDate?: Date
) {
  const dateFilter: any = {}
  if (startDate || endDate) {
    dateFilter.viewedAt = {}
    if (startDate) dateFilter.viewedAt.gte = startDate
    if (endDate) dateFilter.viewedAt.lte = endDate
  }

  const views = await prisma.cardView.findMany({
    where: { cardId, ...dateFilter },
    orderBy: { viewedAt: 'desc' },
  })

  const shares = await prisma.share.findMany({
    where: { cardId },
    orderBy: { sharedAt: 'desc' },
  })

  const saves = await prisma.cardSave.findMany({
    where: { cardId },
    orderBy: { savedAt: 'desc' },
  })

  const contactCaptures = await prisma.contact.count({
    where: { cardId },
  })

  // Group views by date
  const viewsByDate = views.reduce((acc, view) => {
    const date = new Date(view.viewedAt).toISOString().split('T')[0]
    acc[date] = (acc[date] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Group shares by method
  const sharesByMethod = shares.reduce((acc, share) => {
    acc[share.method] = (acc[share.method] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Group by device
  const viewsByDevice = views.reduce((acc, view) => {
    const device = view.device || 'unknown'
    acc[device] = (acc[device] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Group by browser
  const viewsByBrowser = views.reduce((acc, view) => {
    const browser = view.browser || 'unknown'
    acc[browser] = (acc[browser] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Group by OS
  const viewsByOS = views.reduce((acc, view) => {
    const os = view.os || 'unknown'
    acc[os] = (acc[os] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Group by country
  const viewsByCountry = views.reduce((acc, view) => {
    const country = view.country || 'unknown'
    acc[country] = (acc[country] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Group by UTM source
  const viewsByUTMSource = views.reduce((acc, view) => {
    if (view.utmSource) {
      acc[view.utmSource] = (acc[view.utmSource] || 0) + 1
    }
    return acc
  }, {} as Record<string, number>)

  // Top referrers
  const topReferrers = views
    .filter(v => v.referrer)
    .reduce((acc, view) => {
      try {
        const domain = view.referrer ? new URL(view.referrer).hostname : 'direct'
        acc[domain] = (acc[domain] || 0) + 1
      } catch {
        // Invalid URL, skip
      }
      return acc
    }, {} as Record<string, number>)

  return {
    totalViews: views.length,
    totalShares: shares.length,
    totalSaves: saves.length,
    totalContactCaptures: contactCaptures,
    viewsByDate,
    sharesByMethod,
    viewsByDevice,
    viewsByBrowser,
    viewsByOS,
    viewsByCountry,
    viewsByUTMSource,
    topReferrers: Object.entries(topReferrers)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([domain, count]) => ({ domain, count })),
    recentViews: views.slice(0, 10),
    recentShares: shares.slice(0, 10),
    recentSaves: saves.slice(0, 10),
  }
}

