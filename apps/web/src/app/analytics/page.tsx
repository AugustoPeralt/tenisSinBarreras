'use client'

import { useState, useEffect } from 'react'
import BackNavigation from '../../components/navigation/BackNavigation'
import { BarChart3, Users, Globe, TrendingUp, Trophy, Calendar, MapPin, Activity } from 'lucide-react'

interface AnalyticsData {
  tournaments: {
    total: number
    categories: Record<string, number>
    surfaces: Record<string, number>
  }
  users: {
    totalUsers: number
    newUsersThisMonth: number
  }
  searches: {
    total: number
    searchesThisWeek: number
    searchTypes: Record<string, number>
  }
  geographic: {
    countriesCount: number
    topCountries: [string, number][]
  }
  platform: {
    dataQuality: {
      tournamentsWithCompleteData: number
      coverageScore: number
      dataFreshness: number
    }
    userEngagement: {
      activeUsers: number
      growthRate: string
      searchActivity: number
    }
    marketReach: {
      globalCoverage: number
      primaryMarkets: [string, number][]
      emergingMarkets: [string, number][]
    }
  }
}

export default function AnalyticsPage() {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await fetch('/api/analytics')
        const data = await response.json()
        
        if (data.success) {
          setAnalytics(data.analytics)
        } else {
          // Use fallback data for demo
          setAnalytics(data.fallback || null)
          setError('Using demo data')
        }
      } catch (err) {
        setError('Failed to load analytics')
        // Fallback demo data
        setAnalytics({
          tournaments: {
            total: 25,
            categories: { 'Masters 1000': 8, 'ATP 500': 10, 'ATP 250': 7 },
            surfaces: { 'Hard': 15, 'Clay': 6, 'Grass': 4 }
          },
          users: { totalUsers: 150, newUsersThisMonth: 25 },
          searches: { total: 500, searchesThisWeek: 45, searchTypes: { 'tournament': 300, 'travel': 200 } },
          geographic: { countriesCount: 25, topCountries: [['Spain', 5], ['France', 4], ['USA', 3]] },
          platform: {
            dataQuality: { tournamentsWithCompleteData: 25, coverageScore: 85, dataFreshness: 95 },
            userEngagement: { activeUsers: 150, growthRate: '20%', searchActivity: 45 },
            marketReach: { globalCoverage: 25, primaryMarkets: [['Spain', 5]], emergingMarkets: [['Italy', 2]] }
          }
        })
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <BackNavigation title="Platform Analytics" />
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Activity className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-2" />
              <p className="text-gray-600">Loading analytics...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackNavigation title="Platform Analytics" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <BarChart3 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Tennis Travel Assistant</h1>
              <p className="text-gray-600">Platform Analytics for ATP Tour Partnership</p>
            </div>
          </div>
          
          {error && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <p className="text-yellow-800 text-sm">📊 {error} - Displaying representative metrics</p>
            </div>
          )}
        </div>

        {analytics && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Tournament Coverage */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Tournament Coverage</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Tournaments</span>
                  <span className="font-medium">{analytics.tournaments.total}</span>
                </div>
                <div className="space-y-2">
                  {Object.entries(analytics.tournaments.categories).map(([category, count]) => (
                    <div key={category} className="flex justify-between text-sm">
                      <span className="text-gray-500">{category}</span>
                      <span className="text-gray-700">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* User Growth */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Users className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">User Engagement</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Users</span>
                  <span className="font-medium">{analytics.users.totalUsers}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">New This Month</span>
                  <span className="font-medium text-green-600">+{analytics.users.newUsersThisMonth}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Growth Rate</span>
                  <span className="font-medium text-green-600">{analytics.platform.userEngagement.growthRate}</span>
                </div>
              </div>
            </div>

            {/* Global Reach */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-6 w-6 text-purple-600" />
                <h3 className="text-lg font-semibold text-gray-900">Global Reach</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Countries Covered</span>
                  <span className="font-medium">{analytics.geographic.countriesCount}</span>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">Top Markets:</p>
                  {analytics.geographic.topCountries.slice(0, 3).map(([country, count]) => (
                    <div key={country} className="flex justify-between text-sm">
                      <span className="text-gray-600">{country}</span>
                      <span className="text-gray-700">{count} tournaments</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Data Quality */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Data Quality</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Coverage Score</span>
                  <span className="font-medium">{analytics.platform.dataQuality.coverageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Data Freshness</span>
                  <span className="font-medium">{analytics.platform.dataQuality.dataFreshness}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${analytics.platform.dataQuality.coverageScore}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Search Activity */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <TrendingUp className="h-6 w-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900">Search Activity</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">This Week</span>
                  <span className="font-medium">{analytics.searches.searchesThisWeek}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Searches</span>
                  <span className="font-medium">{analytics.searches.total}</span>
                </div>
                <div className="space-y-2">
                  {Object.entries(analytics.searches.searchTypes).map(([type, count]) => (
                    <div key={type} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">{type}</span>
                      <span className="text-gray-700">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Surface Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-orange-600" />
                <h3 className="text-lg font-semibold text-gray-900">Surface Coverage</h3>
              </div>
              <div className="space-y-3">
                {Object.entries(analytics.tournaments.surfaces || {}).map(([surface, count]) => (
                  <div key={surface} className="flex justify-between">
                    <span className="text-gray-600">{surface}</span>
                    <span className="font-medium">{count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ATP Partnership Value Proposition */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-sm p-8 mt-8 text-white">
          <h2 className="text-2xl font-bold mb-4">Value Proposition for ATP Tour</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2">🎾 Enhanced Fan Experience</h3>
              <p className="text-blue-100">Intelligent travel planning increases tournament attendance and fan engagement worldwide.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">📊 Data-Driven Insights</h3>
              <p className="text-blue-100">Real-time analytics on fan travel patterns and preferences to inform ATP strategic decisions.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">🌍 Global Market Expansion</h3>
              <p className="text-blue-100">Facilitate international fan participation and grow ATP Tour's global footprint.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
