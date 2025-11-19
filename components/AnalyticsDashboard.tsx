'use client'

import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Legend } from 'recharts'
import { Eye, Share2, Download, Users, Filter, Download as DownloadIcon, Trophy } from 'lucide-react'

interface AnalyticsData {
  card: {
    id: string
    name: string
    template: string
  }
  analytics: {
    totalViews: number
    totalShares: number
    totalSaves: number
    totalContactCaptures: number
    viewsByDate: Record<string, number>
    sharesByMethod: Record<string, number>
    viewsByDevice: Record<string, number>
    viewsByBrowser: Record<string, number>
    viewsByOS: Record<string, number>
    viewsByCountry: Record<string, number>
    viewsByUTMSource: Record<string, number>
    topReferrers: Array<{ domain: string; count: number }>
  }
}

interface LeaderboardData {
  rank: number
  userId: string
  userName: string
  totalViews: number
  totalShares: number
  totalSaves: number
  totalContactCaptures: number
  totalScore: number
  cardCount: number
}

export default function AnalyticsDashboard({ data }: { data: AnalyticsData[] }) {
  const [selectedCard, setSelectedCard] = useState<string>('all')
  const [selectedTemplate, setSelectedTemplate] = useState<string>('all')
  const [timeframe, setTimeframe] = useState<string>('30d')
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar')
  const [showLeaderboard, setShowLeaderboard] = useState(false)
  const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([])

  // Filter data based on selections
  const filteredData = data.filter(item => {
    if (selectedCard !== 'all' && item.card.id !== selectedCard) return false
    if (selectedTemplate !== 'all' && item.card.template !== selectedTemplate) return false
    return true
  })

  const totalViews = filteredData.reduce((sum, item) => sum + item.analytics.totalViews, 0)
  const totalShares = filteredData.reduce((sum, item) => sum + item.analytics.totalShares, 0)
  const totalSaves = filteredData.reduce((sum, item) => sum + item.analytics.totalSaves, 0)
  const totalContactCaptures = filteredData.reduce((sum, item) => sum + item.analytics.totalContactCaptures, 0)

  const viewsByDateData = Object.entries(
    filteredData.reduce((acc, item) => {
      Object.entries(item.analytics.viewsByDate).forEach(([date, count]) => {
        acc[date] = (acc[date] || 0) + count
      })
      return acc
    }, {} as Record<string, number>)
  )
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-30)

  const sharesByMethodData = Object.entries(
    filteredData.reduce((acc, item) => {
      Object.entries(item.analytics.sharesByMethod).forEach(([method, count]) => {
        acc[method] = (acc[method] || 0) + count
      })
      return acc
    }, {} as Record<string, number>)
  ).map(([method, count]) => ({ method, count }))

  const viewsByDeviceData = Object.entries(
    filteredData.reduce((acc, item) => {
      Object.entries(item.analytics.viewsByDevice || {}).forEach(([device, count]) => {
        acc[device] = (acc[device] || 0) + count
      })
      return acc
    }, {} as Record<string, number>)
  ).map(([device, count]) => ({ device, count }))

  const viewsByBrowserData = Object.entries(
    filteredData.reduce((acc, item) => {
      Object.entries(item.analytics.viewsByBrowser || {}).forEach(([browser, count]) => {
        acc[browser] = (acc[browser] || 0) + count
      })
      return acc
    }, {} as Record<string, number>)
  ).map(([browser, count]) => ({ browser, count }))

  const viewsByOSData = Object.entries(
    filteredData.reduce((acc, item) => {
      Object.entries(item.analytics.viewsByOS || {}).forEach(([os, count]) => {
        acc[os] = (acc[os] || 0) + count
      })
      return acc
    }, {} as Record<string, number>)
  ).map(([os, count]) => ({ os, count }))

  const topReferrersData = filteredData
    .flatMap(item => item.analytics.topReferrers || [])
    .reduce((acc, ref) => {
      acc[ref.domain] = (acc[ref.domain] || 0) + ref.count
      return acc
    }, {} as Record<string, number>)

  const topReferrers = Object.entries(topReferrersData)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([domain, count]) => ({ domain, count }))

  const COLORS = ['#9333EA', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#3B82F6', '#EC4899']

  const handleExport = async (format: 'csv' | 'json') => {
    const params = new URLSearchParams()
    if (selectedCard !== 'all') params.append('cardId', selectedCard)
    params.append('format', format)
    
    const url = `/api/analytics/export?${params.toString()}`
    window.open(url, '_blank')
  }

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch(`/api/analytics/leaderboard?timeframe=${timeframe}`)
      const data = await response.json()
      setLeaderboard(data.leaderboard || [])
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    }
  }

  useEffect(() => {
    if (showLeaderboard) {
      fetchLeaderboard()
    }
  }, [showLeaderboard, timeframe])

  const uniqueTemplates = Array.from(new Set(data.map(item => item.card.template)))

  return (
    <div className="space-y-8">
      {/* Filters and Controls */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <div className="flex items-center gap-4 mb-4">
          <Filter className="w-5 h-5 text-gray-600" />
          <h2 className="text-xl font-bold">Filters</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Card</label>
            <select
              value={selectedCard}
              onChange={(e) => setSelectedCard(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Cards</option>
              {data.map((item) => (
                <option key={item.card.id} value={item.card.id}>
                  {item.card.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Template</label>
            <select
              value={selectedTemplate}
              onChange={(e) => setSelectedTemplate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="all">All Templates</option>
              {uniqueTemplates.map((template) => (
                <option key={template} value={template}>
                  {template.charAt(0).toUpperCase() + template.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Timeframe</label>
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="all">All time</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Chart Type</label>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType('bar')}
                className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                  chartType === 'bar'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Bar
              </button>
              <button
                onClick={() => setChartType('line')}
                className={`flex-1 px-3 py-2 rounded-lg font-medium transition-colors ${
                  chartType === 'line'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Line
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => handleExport('csv')}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            Export CSV
          </button>
          <button
            onClick={() => handleExport('json')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <DownloadIcon className="w-4 h-4" />
            Export JSON
          </button>
          <button
            onClick={() => setShowLeaderboard(!showLeaderboard)}
            className="flex items-center gap-2 px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
          >
            <Trophy className="w-4 h-4" />
            Leaderboard
          </button>
        </div>
      </div>

      {/* Leaderboard */}
      {showLeaderboard && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-600" />
            Leaderboard
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-semibold">Rank</th>
                  <th className="text-left py-3 px-4 font-semibold">User</th>
                  <th className="text-right py-3 px-4 font-semibold">Views</th>
                  <th className="text-right py-3 px-4 font-semibold">Shares</th>
                  <th className="text-right py-3 px-4 font-semibold">Saves</th>
                  <th className="text-right py-3 px-4 font-semibold">Contacts</th>
                  <th className="text-right py-3 px-4 font-semibold">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry) => (
                  <tr key={entry.userId} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-bold">#{entry.rank}</td>
                    <td className="py-3 px-4">{entry.userName}</td>
                    <td className="py-3 px-4 text-right">{entry.totalViews}</td>
                    <td className="py-3 px-4 text-right">{entry.totalShares}</td>
                    <td className="py-3 px-4 text-right">{entry.totalSaves}</td>
                    <td className="py-3 px-4 text-right">{entry.totalContactCaptures}</td>
                    <td className="py-3 px-4 text-right font-bold text-purple-600">{entry.totalScore}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Eye className="w-8 h-8 text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">Total Views</p>
              <p className="text-3xl font-bold">{totalViews}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Share2 className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Total Shares</p>
              <p className="text-3xl font-bold">{totalShares}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Download className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Total Saves</p>
              <p className="text-3xl font-bold">{totalSaves}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Contact Captures</p>
              <p className="text-3xl font-bold">{totalContactCaptures}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Views Chart */}
      {viewsByDateData.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Views Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            {chartType === 'bar' ? (
              <BarChart data={viewsByDateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#9333EA" />
              </BarChart>
            ) : (
              <LineChart data={viewsByDateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#9333EA" strokeWidth={2} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>
      )}

      {/* Device/Browser/OS Breakdown */}
      <div className="grid md:grid-cols-3 gap-6">
        {viewsByDeviceData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Views by Device</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={viewsByDeviceData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ device, percent }) => `${device}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {viewsByDeviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {viewsByBrowserData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Views by Browser</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={viewsByBrowserData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ browser, percent }) => `${browser}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {viewsByBrowserData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {viewsByOSData.length > 0 && (
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-bold mb-4">Views by OS</h2>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={viewsByOSData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ os, percent }) => `${os}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {viewsByOSData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Shares by Method */}
      {sharesByMethodData.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Shares by Method</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={sharesByMethodData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ method, percent }) => `${method}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {sharesByMethodData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Top Referrers */}
      {topReferrers.length > 0 && (
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-bold mb-4">Top Referrers</h2>
          <div className="space-y-2">
            {topReferrers.map((ref, index) => (
              <div key={ref.domain} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-gray-500">#{index + 1}</span>
                  <span className="font-medium">{ref.domain}</span>
                </div>
                <span className="font-bold text-purple-600">{ref.count} views</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Card Performance */}
      <div className="bg-white p-6 rounded-xl shadow-lg">
        <h2 className="text-xl font-bold mb-4">Card Performance</h2>
        <div className="space-y-3">
          {filteredData.map((item) => (
            <div key={item.card.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <div>
                <span className="font-medium">{item.card.name}</span>
                <span className="text-sm text-gray-500 ml-2">({item.card.template})</span>
              </div>
              <div className="flex gap-6">
                <span className="text-sm text-gray-600">
                  <Eye className="w-4 h-4 inline mr-1" />
                  {item.analytics.totalViews}
                </span>
                <span className="text-sm text-gray-600">
                  <Share2 className="w-4 h-4 inline mr-1" />
                  {item.analytics.totalShares}
                </span>
                <span className="text-sm text-gray-600">
                  <Download className="w-4 h-4 inline mr-1" />
                  {item.analytics.totalSaves}
                </span>
                <span className="text-sm text-gray-600">
                  <Users className="w-4 h-4 inline mr-1" />
                  {item.analytics.totalContactCaptures}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
