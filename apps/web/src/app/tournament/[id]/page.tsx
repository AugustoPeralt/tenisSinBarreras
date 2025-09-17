'use client'

import { useState, useEffect } from 'react'
import { useParams, usePathname } from 'next/navigation'
import { 
  MapPin, 
  Calendar, 
  Trophy, 
  Users, 
  DollarSign, 
  Clock,
  Star,
  Heart,
  Share2,
  Plane,
  Hotel,
  Navigation,
  Map
} from 'lucide-react'
import { createClient } from '@/lib/supabase'
import { TournamentMap } from '../../../components/ui/InteractiveMap'
import BackNavigation, { useBreadcrumbs } from '../../../components/navigation/BackNavigation'

interface Tournament {
  id: string
  name: string
  city: string
  country: string
  start_date: string
  end_date: string
  category: string
  surface: string
  tournament_level?: string
  prize_money?: number
  draw_size?: number
  tour_category?: string
  venue?: string
  website?: string
}

export default function TournamentDetailPage() {
  const params = useParams()
  const pathname = usePathname()
  const [tournament, setTournament] = useState<Tournament | null>(null)
  const [loading, setLoading] = useState(true)
  const [isFavorite, setIsFavorite] = useState(false)

  const breadcrumbs = useBreadcrumbs(pathname)

  useEffect(() => {
    loadTournament()
  }, [params.id])

  const loadTournament = async () => {
    try {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', params.id)
        .single()

      if (error) throw error
      setTournament(data)
    } catch (error) {
      console.error('Error loading tournament:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatPrizeMoney = (amount?: number) => {
    if (!amount) return 'No disponible'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getTournamentLevelColor = (level?: string) => {
    switch (level) {
      case 'Grand Slam': return 'bg-red-100 text-red-800'
      case 'Masters 1000': 
      case 'WTA 1000': return 'bg-purple-100 text-purple-800'
      case 'ATP 500':
      case 'WTA 500': return 'bg-blue-100 text-blue-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
            <div className="space-y-4">
              <div className="h-32 bg-gray-200 rounded-xl"></div>
              <div className="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!tournament) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Torneo no encontrado</h1>
        <p className="text-gray-600">El torneo que buscas no existe o ha sido eliminado.</p>
      </div>
    )
  }

  return (
    <>
      {/* Back Navigation */}
      <BackNavigation 
        breadcrumbs={breadcrumbs}
        title={tournament.name}
        subtitle={`${tournament.city}, ${tournament.country} • ${formatDate(tournament.start_date)}`}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {tournament.name}
              </h1>
              <div className="flex items-center gap-4 text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{tournament.city}, {tournament.country}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(tournament.start_date)}</span>
                </div>
              </div>
            <div className="flex flex-wrap gap-2">
              {tournament.tournament_level && (
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTournamentLevelColor(tournament.tournament_level)}`}>
                  {tournament.tournament_level}
                </span>
              )}
              {tournament.tour_category && (
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  {tournament.tour_category}
                </span>
              )}
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {tournament.surface}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-3 rounded-full border transition-colors ${
                isFavorite 
                  ? 'bg-red-50 border-red-200 text-red-600' 
                  : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
            </button>
            <button className="p-3 rounded-full border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors">
              <Share2 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tournament Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Información del Torneo
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Fechas</p>
                    <p className="font-medium text-gray-900">
                      {formatDate(tournament.start_date)} - {formatDate(tournament.end_date)}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Categoría</p>
                    <p className="font-medium text-gray-900">{tournament.category}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Ubicación</p>
                    <p className="font-medium text-gray-900">
                      {tournament.venue || `${tournament.city}, ${tournament.country}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {tournament.prize_money && (
                  <div className="flex items-center gap-3">
                    <DollarSign className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-600">Premio</p>
                      <p className="font-medium text-gray-900">
                        {formatPrizeMoney(tournament.prize_money)}
                      </p>
                    </div>
                  </div>
                )}

                {tournament.draw_size && (
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-primary-600" />
                    <div>
                      <p className="text-sm text-gray-600">Cuadro Principal</p>
                      <p className="font-medium text-gray-900">
                        {tournament.draw_size} jugadores
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-primary-600" />
                  <div>
                    <p className="text-sm text-gray-600">Superficie</p>
                    <p className="font-medium text-gray-900">{tournament.surface}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Map */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900 flex items-center space-x-2">
                <Map className="w-5 h-5" />
                <span>Ubicación y Alojamientos</span>
              </h2>
            </div>
            <TournamentMap tournament={tournament} />
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                📍 <strong>Ubicación:</strong> {tournament.city}, {tournament.country}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                Explora hoteles cercanos, aeropuertos y servicios en el mapa interactivo
              </p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Planifica tu Viaje
            </h3>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 p-3 bg-primary-50 border border-primary-200 rounded-lg text-primary-700 hover:bg-primary-100 transition-colors">
                <Plane className="h-5 w-5" />
                <span className="font-medium">Buscar Vuelos</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 hover:bg-blue-100 transition-colors">
                <Hotel className="h-5 w-5" />
                <span className="font-medium">Buscar Hoteles</span>
              </button>
              
              <button className="w-full flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 hover:bg-green-100 transition-colors">
                <Star className="h-5 w-5" />
                <span className="font-medium">Paquete Completo</span>
              </button>
            </div>
          </div>

          {/* Tournament Stats */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Estadísticas
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Duración</span>
                <span className="font-medium">
                  {Math.ceil((new Date(tournament.end_date).getTime() - new Date(tournament.start_date).getTime()) / (1000 * 60 * 60 * 24))} días
                </span>
              </div>
              
              {tournament.draw_size && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Participantes</span>
                  <span className="font-medium">{tournament.draw_size}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600">Superficie</span>
                <span className="font-medium">{tournament.surface}</span>
              </div>
              
              {tournament.tour_category && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Tour</span>
                  <span className="font-medium">{tournament.tour_category}</span>
                </div>
              )}
            </div>
          </div>

          {/* Related Tournaments */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Torneos Relacionados
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm text-gray-900">Roland Garros</p>
                <p className="text-xs text-gray-600">París, Francia • Jun 2025</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm text-gray-900">Wimbledon</p>
                <p className="text-xs text-gray-600">Londres, Reino Unido • Jul 2025</p>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-sm text-gray-900">US Open</p>
                <p className="text-xs text-gray-600">Nueva York, USA • Sep 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
