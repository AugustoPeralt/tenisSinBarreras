'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Search, Calendar, MapPin, Users, Plane, Hotel } from 'lucide-react'
import { createClient, testSupabaseConnection } from '../lib/supabase'

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [tournaments, setTournaments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [syncing, setSyncing] = useState(false)

  // Function to sync tournaments from external APIs
  const syncTournaments = async () => {
    setSyncing(true)
    try {
      console.log('🔄 Starting API sync...')
      const response = await fetch('/api/sync-tournaments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({})
      })
      
      const result = await response.json()
      console.log('📄 Sync result:', result)
      
      if (result.success) {
        alert(`✅ Sync exitoso: ${result.message}`)
        // Reload tournaments after successful sync
        window.location.reload()
      } else {
        alert('❌ Sync falló: ' + result.error || result.message)
      }
    } catch (error) {
      console.error('❌ Sync error:', error)
      alert('❌ Error de conexión: ' + error)
    } finally {
      setSyncing(false)
    }
  }

  // Cargar torneos desde Supabase
  useEffect(() => {
    async function loadTournaments() {
      setLoading(true)
      try {
        console.log('🔄 Initializing Supabase client...')
        const supabase = createClient()
        
        // Test connection first
        console.log('🔍 Testing database connection...')
        const testResult = await testSupabaseConnection()
        
        if (!testResult.success) {
          console.warn('⚠️ Database connection failed:', testResult.error)
          setError('No se pudo conectar a la base de datos. Por favor, intenta más tarde.')
          setLoading(false)
          return
        }
        
        console.log('✅ Database connected successfully!')
        
        // Load tournaments from database  
        console.log('📅 Loading upcoming tournaments...')
        const today = new Date().toISOString().split('T')[0]
        console.log('📆 Today\'s date for filtering:', today)
        
        const { data, error } = await supabase
          .from('tournaments')
          .select('*')
          .gte('start_date', today)
          .order('start_date', { ascending: true })
          .limit(20)

        console.log('🔍 Raw query result:', { data, error, dataLength: data?.length })

        if (error) {
          console.error('❌ Error loading tournaments:', error)
          setError('Error al cargar los torneos. Por favor, intenta más tarde.')
        } else {
          console.log(`🎾 Successfully loaded ${data?.length || 0} upcoming tournaments`)
          if (data && data.length > 0) {
            console.table(data.slice(0, 3)) // Show first 3 tournaments in console
            setTournaments(data)
          } else {
            console.warn('⚠️ No upcoming tournaments found in database')
            setError('No hay torneos próximos disponibles. Por favor, verifica la base de datos.')
          }
        }
      } catch (error) {
        console.error('❌ Unexpected error during tournament loading:', error)
        setError('Error inesperado al cargar los datos.')
      } finally {
        setLoading(false)
      }
    }

    loadTournaments()
  }, [])

  // Categories based on real ATP data
  const categories = [
    { id: 'all', label: 'All Tournaments' },
    { id: 'Grand Slam', label: 'Grand Slam' },
    { id: 'ATP Masters 1000', label: 'Masters 1000' },
    { id: 'ATP 500', label: 'ATP 500' },
    { id: 'ATP Finals', label: 'ATP Finals' },
  ]

  // Dynamic filter function
  const filteredTournaments = tournaments.filter(tournament => {
    const matchesQuery = tournament.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tournament.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        tournament.country.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || 
                           tournament.category.toLowerCase().includes(selectedCategory.toLowerCase())
    return matchesQuery && matchesCategory
  })

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Cargando Torneos</h2>
            <p className="text-gray-600">Obteniendo los últimos datos de torneos profesionales...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Error de Conexión</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
            >
              Intentar de Nuevo
            </button>
          </div>
        </div>
      </div>
    )
  }

  // No content between error check and main return

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-tennis-900 mb-4">
          Tennis Travel Assistant
        </h1>
        <p className="text-lg text-tennis-600 max-w-2xl mx-auto">
          Plan your tennis tournament trips with intelligent flight and hotel recommendations
        </p>
      </div>

      {/* Search Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-tennis-900">
            Buscar Torneos
          </h2>
          <button
            onClick={syncTournaments}
            disabled={syncing}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              syncing 
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                : 'bg-primary-500 text-white hover:bg-primary-600'
            }`}
          >
            {syncing ? '🔄 Sincronizando...' : '🔄 Sync APIs'}
          </button>
        </div>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 h-5 w-5 text-tennis-400" />
          <input
            type="text"
            placeholder="Search tournaments by name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input pl-10"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category.id
                  ? 'bg-primary-500 text-white'
                  : 'bg-tennis-100 text-tennis-700 hover:bg-tennis-200'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      {/* Upcoming Tournaments */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-tennis-900 mb-6">Upcoming Tournaments</h2>
        
        {filteredTournaments.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <span className="text-2xl">🎾</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No Tournaments Found</h3>
            <p className="text-gray-600 mb-6">
              {searchQuery || selectedCategory !== 'all' 
                ? 'Try adjusting your search criteria or filters.'
                : 'No upcoming tournaments available at the moment.'}
            </p>
            {(searchQuery || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                }}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredTournaments.map((tournament: any) => (
            <Link 
              key={tournament.id} 
              href={`/tournament/${tournament.id}`}
              className="tournament-card p-6 hover:shadow-xl transition-shadow cursor-pointer"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-tennis-900">
                  {tournament.name}
                </h3>
                <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-sm font-medium">
                  {tournament.category}
                </span>
              </div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-tennis-600">
                  <MapPin className="h-4 w-4 mr-2" />
                  {tournament.city}, {tournament.country}
                </div>
                <div className="flex items-center text-tennis-600">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                </div>
                <div className="flex items-center text-tennis-600">
                  <Users className="h-4 w-4 mr-2" />
                  {tournament.surface} Court
                </div>
                {tournament.venue && (
                  <div className="flex items-center text-tennis-600">
                    <div className="h-4 w-4 mr-2 text-center">🏟️</div>
                    {tournament.venue}
                  </div>
                )}
                {tournament.prize_money && (
                  <div className="flex items-center text-green-600 font-semibold">
                    <div className="h-4 w-4 mr-2 text-center">💰</div>
                    {formatCurrency(tournament.prize_money)}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/results?tournament=${encodeURIComponent(tournament.name)}&type=flights`}
                  className="flex-1 flex items-center justify-center gap-2 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Plane className="h-4 w-4" />
                  Find Flights
                </Link>
                <Link
                  href={`/results?tournament=${encodeURIComponent(tournament.name)}&type=hotels`}
                  className="flex-1 flex items-center justify-center gap-2 bg-tennis-500 text-white px-4 py-2 rounded-lg hover:bg-tennis-600 transition-colors"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Hotel className="h-4 w-4" />
                  Find Hotels
                </Link>
              </div>
            </Link>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-tennis-900 mb-6 text-center">
          Why Choose Tennis Travel Assistant?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-tennis-900 mb-2">Smart Search</h3>
            <p className="text-tennis-600">
              Find the best flight and hotel combinations optimized for tournament schedules
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-tennis-900 mb-2">Location Optimized</h3>
            <p className="text-tennis-600">
              Hotels close to tennis venues with courts and fitness facilities
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="h-8 w-8 text-primary-600" />
            </div>
            <h3 className="text-lg font-semibold text-tennis-900 mb-2">Tournament Calendar</h3>
            <p className="text-tennis-600">
              Integrated with official ATP, WTA, and ITF tournament schedules
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
