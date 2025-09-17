'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Heart, 
  Clock, 
  MapPin, 
  Plane, 
  Hotel, 
  Calendar,
  Search,
  TrendingUp,
  Star,
  Trophy,
  Settings
} from 'lucide-react'
import BackNavigation, { useBreadcrumbs } from '../../components/navigation/BackNavigation'

interface Tournament {
  id: string
  name: string
  location: string
  startDate: string
  endDate: string
  category: string
}

interface RecentSearch {
  id: string
  from: string
  to: string
  departure: string
  return: string
  timestamp: string
}

interface FavoriteItem {
  id: string
  type: 'tournament' | 'flight' | 'hotel'
  name: string
  location?: string
  price?: number
  date?: string
}

export default function DashboardPage() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState<'overview' | 'favorites' | 'searches' | 'bookings'>('overview')
  const [favorites, setFavorites] = useState<FavoriteItem[]>([])
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([])
  const [upcomingTournaments, setUpcomingTournaments] = useState<Tournament[]>([])

  const breadcrumbs = useBreadcrumbs(pathname)

  useEffect(() => {
    loadDashboardData()
  }, [])

  const loadDashboardData = async () => {
    // Mock data - en producción vendría de la API
    setFavorites([
      {
        id: 'fav-1',
        type: 'tournament',
        name: 'Roland Garros 2025',
        location: 'París, Francia',
        date: '25 Mayo - 8 Junio'
      },
      {
        id: 'fav-2',
        type: 'flight',
        name: 'Air France AF1234',
        location: 'Madrid → París',
        price: 245
      },
      {
        id: 'fav-3',
        type: 'hotel',
        name: 'Hotel Roland Garros',
        location: 'París, Francia',
        price: 280
      }
    ])

    setRecentSearches([
      {
        id: 'search-1',
        from: 'Madrid',
        to: 'París',
        departure: '2025-05-25',
        return: '2025-06-01',
        timestamp: '2025-08-28T10:30:00Z'
      },
      {
        id: 'search-2',
        from: 'Barcelona',
        to: 'Londres',
        departure: '2025-06-15',
        return: '2025-06-22',
        timestamp: '2025-08-27T14:20:00Z'
      }
    ])

    setUpcomingTournaments([
      {
        id: 'tourn-1',
        name: 'Roland Garros 2025',
        location: 'París, Francia',
        startDate: '2025-05-25',
        endDate: '2025-06-08',
        category: 'Grand Slam'
      },
      {
        id: 'tourn-2',
        name: 'Wimbledon 2025',
        location: 'Londres, Reino Unido',
        startDate: '2025-06-30',
        endDate: '2025-07-13',
        category: 'Grand Slam'
      }
    ])
  }

  const removeFavorite = (id: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== id))
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('es-ES', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <>
      {/* Back Navigation */}
      <BackNavigation 
        breadcrumbs={breadcrumbs}
        title="Mi Dashboard"
        subtitle="Gestiona tus viajes de tenis y favoritos"
        showBackButton={false}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Resumen', icon: TrendingUp },
                { id: 'favorites', label: 'Favoritos', icon: Heart },
                { id: 'searches', label: 'Búsquedas Recientes', icon: Search },
                { id: 'bookings', label: 'Mis Reservas', icon: Calendar }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Favoritos</p>
                    <p className="text-2xl font-bold text-gray-900">{favorites.length}</p>
                  </div>
                  <Heart className="w-8 h-8 text-red-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Búsquedas</p>
                    <p className="text-2xl font-bold text-gray-900">{recentSearches.length}</p>
                  </div>
                  <Search className="w-8 h-8 text-blue-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Próximos Torneos</p>
                    <p className="text-2xl font-bold text-gray-900">{upcomingTournaments.length}</p>
                  </div>
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
              </div>
              
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Reservas</p>
                    <p className="text-2xl font-bold text-gray-900">0</p>
                  </div>
                  <Calendar className="w-8 h-8 text-green-500" />
                </div>
              </div>
            </div>

            {/* Upcoming Tournaments */}
            <div className="bg-white rounded-lg border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Próximos Torneos</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTournaments.map((tournament) => (
                    <div key={tournament.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Trophy className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{tournament.name}</h4>
                          <p className="text-sm text-gray-600">{tournament.location}</p>
                          <p className="text-sm text-gray-500">
                            {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs font-medium rounded-full">
                          {tournament.category}
                        </span>
                        <Link 
                          href={`/tournament/${tournament.id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Ver Detalles
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Favorites Tab */}
        {activeTab === 'favorites' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mis Favoritos</h3>
            </div>
            <div className="p-6">
              {favorites.length === 0 ? (
                <div className="text-center py-8">
                  <Heart className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes favoritos guardados</p>
                  <Link 
                    href="/"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Explorar Torneos
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {favorites.map((favorite) => (
                    <div key={favorite.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                          {favorite.type === 'tournament' && <Trophy className="w-6 h-6 text-red-600" />}
                          {favorite.type === 'flight' && <Plane className="w-6 h-6 text-red-600" />}
                          {favorite.type === 'hotel' && <Hotel className="w-6 h-6 text-red-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{favorite.name}</h4>
                          <p className="text-sm text-gray-600">{favorite.location}</p>
                          {favorite.price && (
                            <p className="text-sm text-gray-500">€{favorite.price}</p>
                          )}
                          {favorite.date && (
                            <p className="text-sm text-gray-500">{favorite.date}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => removeFavorite(favorite.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Heart className="w-4 h-4 fill-current" />
                        </button>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Ver
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Recent Searches Tab */}
        {activeTab === 'searches' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Búsquedas Recientes</h3>
            </div>
            <div className="p-6">
              {recentSearches.length === 0 ? (
                <div className="text-center py-8">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">No tienes búsquedas recientes</p>
                  <Link 
                    href="/search"
                    className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                  >
                    Nueva Búsqueda
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentSearches.map((search) => (
                    <div key={search.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Search className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {search.from} → {search.to}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {formatDate(search.departure)} - {formatDate(search.return)}
                          </p>
                          <p className="text-sm text-gray-500">
                            Buscado: {formatTime(search.timestamp)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Link
                          href={`/results?from=${search.from}&to=${search.to}&departure=${search.departure}&return=${search.return}&passengers=1`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Repetir Búsqueda
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Mis Reservas</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">No tienes reservas confirmadas</p>
                <Link 
                  href="/"
                  className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
                >
                  Explorar Opciones
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  )
}
