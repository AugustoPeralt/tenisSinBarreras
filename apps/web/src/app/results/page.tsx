'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Plane, 
  Hotel, 
  Star, 
  Clock, 
  MapPin, 
  Filter,
  ArrowUpDown,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Waves,
  Utensils,
  Heart,
  Share2,
  GitCompare
} from 'lucide-react'
import BackNavigation, { useBreadcrumbs } from '../../components/navigation/BackNavigation'

interface Flight {
  id: string
  airline: string
  departure: {
    airport: string
    time: string
    city: string
  }
  arrival: {
    airport: string
    time: string
    city: string
  }
  duration: number
  stops: number
  price: {
    amount: number
    currency: string
  }
  bookingUrl: string
}

interface Hotel {
  id: string
  name: string
  rating: number
  location: {
    address: string
    distanceToVenue: number
  }
  amenities: string[]
  price: {
    amount: number
    currency: string
    perNight: boolean
  }
  bookingUrl: string
  images: string[]
}

function ResultsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [flights, setFlights] = useState<Flight[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [activeTab, setActiveTab] = useState<'flights' | 'hotels' | 'packages'>('flights')
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'rating'>('price')
  const [selectedFlights, setSelectedFlights] = useState<string[]>([])
  const [selectedHotels, setSelectedHotels] = useState<string[]>([])
  const [favorites, setFavorites] = useState<string[]>([])

  const breadcrumbs = useBreadcrumbs(pathname)

  // Extract search parameters
  const from = searchParams.get('from') || 'Madrid'
  const to = searchParams.get('to') || 'París'
  const departure = searchParams.get('departure') || '2025-05-25'
  const returnDate = searchParams.get('return') || '2025-06-01'
  const passengers = searchParams.get('passengers') || '1'

  useEffect(() => {
    loadResults()
  }, [])

  const loadResults = async () => {
    try {
      // Simular datos de vuelos
      const mockFlights: Flight[] = [
        {
          id: 'flight-1',
          airline: 'Air France',
          departure: {
            airport: 'EZE',
            time: '2025-05-24T08:00:00Z',
            city: 'Buenos Aires'
          },
          arrival: {
            airport: 'CDG',
            time: '2025-05-24T23:30:00Z',
            city: 'Paris'
          },
          duration: 810, // 13.5 horas
          stops: 0,
          price: {
            amount: 850,
            currency: 'USD'
          },
          bookingUrl: '#'
        },
        {
          id: 'flight-2',
          airline: 'Lufthansa',
          departure: {
            airport: 'EZE',
            time: '2025-05-24T14:00:00Z',
            city: 'Buenos Aires'
          },
          arrival: {
            airport: 'CDG',
            time: '2025-05-25T09:20:00Z',
            city: 'Paris'
          },
          duration: 920, // 15.3 horas
          stops: 1,
          price: {
            amount: 720,
            currency: 'USD'
          },
          bookingUrl: '#'
        },
        {
          id: 'flight-3',
          airline: 'Iberia',
          departure: {
            airport: 'EZE',
            time: '2025-05-24T16:30:00Z',
            city: 'Buenos Aires'
          },
          arrival: {
            airport: 'CDG',
            time: '2025-05-25T12:15:00Z',
            city: 'Paris'
          },
          duration: 885, // 14.75 horas
          stops: 1,
          price: {
            amount: 680,
            currency: 'USD'
          },
          bookingUrl: '#'
        }
      ]

      // Simular datos de hoteles
      const mockHotels: Hotel[] = [
        {
          id: 'hotel-1',
          name: 'Hotel Roland Garros',
          rating: 4.5,
          location: {
            address: '123 Avenue Philippe Chatrier, Boulogne-Billancourt',
            distanceToVenue: 0.8
          },
          amenities: ['wifi', 'gym', 'tennis-court', 'restaurant'],
          price: {
            amount: 180,
            currency: 'EUR',
            perNight: true
          },
          bookingUrl: '#',
          images: ['https://via.placeholder.com/300x200']
        },
        {
          id: 'hotel-2',
          name: 'Le Grand Hotel Paris',
          rating: 4.8,
          location: {
            address: '456 Rue de Rivoli, Paris',
            distanceToVenue: 12.5
          },
          amenities: ['wifi', 'spa', 'pool', 'restaurant', 'gym'],
          price: {
            amount: 320,
            currency: 'EUR',
            perNight: true
          },
          bookingUrl: '#',
          images: ['https://via.placeholder.com/300x200']
        },
        {
          id: 'hotel-3',
          name: 'Tennis Club Hotel',
          rating: 4.2,
          location: {
            address: '789 Boulevard du Tennis, Boulogne-Billancourt',
            distanceToVenue: 1.2
          },
          amenities: ['wifi', 'tennis-court', 'restaurant', 'parking'],
          price: {
            amount: 150,
            currency: 'EUR',
            perNight: true
          },
          bookingUrl: '#',
          images: ['https://via.placeholder.com/300x200']
        }
      ]

      setFlights(mockFlights)
      setHotels(mockHotels)
    } catch (error) {
      console.error('Error loading results:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const formatTime = (isoString: string) => {
    return new Date(isoString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const toggleFlightSelection = (flightId: string) => {
    setSelectedFlights(prev => 
      prev.includes(flightId) 
        ? prev.filter(id => id !== flightId)
        : prev.length < 3 ? [...prev, flightId] : prev
    )
  }

  const toggleHotelSelection = (hotelId: string) => {
    setSelectedHotels(prev => 
      prev.includes(hotelId) 
        ? prev.filter(id => id !== hotelId)
        : prev.length < 3 ? [...prev, hotelId] : prev
    )
  }

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const compareFlights = () => {
    const ids = selectedFlights.join(',')
    router.push(`/compare?type=flights&ids=${ids}`)
  }

  const compareHotels = () => {
    const ids = selectedHotels.join(',')
    router.push(`/compare?type=hotels&ids=${ids}`)
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="h-4 w-4" />
      case 'gym': return <Dumbbell className="h-4 w-4" />
      case 'pool': return <Waves className="h-4 w-4" />
      case 'restaurant': return <Utensils className="h-4 w-4" />
      case 'parking': return <Car className="h-4 w-4" />
      case 'spa': return <Star className="h-4 w-4" />
      case 'tennis-court': return <span className="text-xs font-bold">🎾</span>
      default: return <Coffee className="h-4 w-4" />
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Buscando las mejores opciones...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Back Navigation */}
      <BackNavigation 
        breadcrumbs={breadcrumbs}
        title="Resultados de Búsqueda"
        subtitle={`${from} → ${to} • ${departure} - ${returnDate} • ${passengers} pasajero${passengers === '1' ? '' : 's'}`}
      />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Resultados para Roland Garros 2025
          </h1>
          <p className="text-gray-600">
            París, Francia • 26 Mayo - 8 Junio 2025
          </p>
        </div>

      {/* Compare Bar */}
      {((activeTab === 'flights' && selectedFlights.length > 0) || 
        (activeTab === 'hotels' && selectedHotels.length > 0)) && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-6 py-4 flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <GitCompare className="h-5 w-5 text-blue-600" />
              <span className="font-medium">
                {activeTab === 'flights' 
                  ? `${selectedFlights.length} vuelos seleccionados`
                  : `${selectedHotels.length} hoteles seleccionados`
                }
              </span>
            </div>
            <button
              onClick={() => {
                if (activeTab === 'flights') {
                  setSelectedFlights([])
                } else {
                  setSelectedHotels([])
                }
              }}
              className="text-gray-500 hover:text-gray-700 text-sm"
            >
              Limpiar
            </button>
            <button
              onClick={activeTab === 'flights' ? compareFlights : compareHotels}
              disabled={(activeTab === 'flights' ? selectedFlights.length : selectedHotels.length) < 2}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Comparar ({activeTab === 'flights' ? selectedFlights.length : selectedHotels.length})
            </button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('flights')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'flights'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Plane className="h-4 w-4 inline mr-2" />
              Vuelos ({flights.length})
            </button>
            <button
              onClick={() => setActiveTab('hotels')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'hotels'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Hotel className="h-4 w-4 inline mr-2" />
              Hoteles ({hotels.length})
            </button>
            <button
              onClick={() => setActiveTab('packages')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'packages'
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <Star className="h-4 w-4 inline mr-2" />
              Paquetes (3)
            </button>
          </nav>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Filtros:</span>
          <select className="text-sm border border-gray-300 rounded px-2 py-1">
            <option>Todos los precios</option>
            <option>Menos de $500</option>
            <option>$500 - $800</option>
            <option>Más de $800</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="h-4 w-4 text-gray-500" />
          <span className="text-sm text-gray-600">Ordenar por:</span>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="text-sm border border-gray-300 rounded px-2 py-1"
          >
            <option value="price">Precio</option>
            <option value="duration">Duración</option>
            <option value="rating">Calificación</option>
          </select>
        </div>
      </div>

      {/* Flights Tab */}
      {activeTab === 'flights' && (
        <div className="space-y-4">
          {flights.map((flight) => (
            <div key={flight.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <Plane className="h-4 w-4 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{flight.airline}</h3>
                      <p className="text-sm text-gray-600">
                        {flight.stops === 0 ? 'Directo' : `${flight.stops} escala${flight.stops > 1 ? 's' : ''}`}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {formatTime(flight.departure.time)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {flight.departure.airport} - {flight.departure.city}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{formatDuration(flight.duration)}</span>
                      </div>
                      <div className="w-full h-px bg-gray-300 relative">
                        <Plane className="h-3 w-3 text-gray-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white" />
                      </div>
                    </div>
                    
                    <div className="text-right md:text-left">
                      <p className="text-2xl font-bold text-gray-900">
                        {formatTime(flight.arrival.time)}
                      </p>
                      <p className="text-sm text-gray-600">
                        {flight.arrival.airport} - {flight.arrival.city}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="text-center lg:text-right">
                  <p className="text-2xl font-bold text-primary-600 mb-2">
                    ${flight.price.amount}
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-center lg:justify-end gap-2">
                      <button
                        onClick={() => toggleFavorite(flight.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          favorites.includes(flight.id)
                            ? 'text-red-500 bg-red-50'
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                      >
                        <Heart className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Share2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-2">
                      <button 
                        onClick={() => toggleFlightSelection(flight.id)}
                        className={`w-full lg:w-auto px-4 py-2 rounded-lg transition-colors text-sm ${
                          selectedFlights.includes(flight.id)
                            ? 'bg-blue-100 text-blue-700 border border-blue-300'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                        } ${selectedFlights.length >= 3 && !selectedFlights.includes(flight.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={selectedFlights.length >= 3 && !selectedFlights.includes(flight.id)}
                      >
                        {selectedFlights.includes(flight.id) ? '✓ Seleccionado' : 'Seleccionar para comparar'}
                      </button>
                      <button className="w-full lg:w-auto bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                        Reservar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Hotels Tab */}
      {activeTab === 'hotels' && (
        <div className="space-y-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col lg:flex-row">
                <div className="lg:w-64 h-48 lg:h-auto">
                  <img 
                    src={hotel.images[0]} 
                    alt={hotel.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex-1 p-6">
                  <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-gray-900">{hotel.name}</h3>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`} 
                            />
                          ))}
                          <span className="text-sm text-gray-600 ml-1">{hotel.rating}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-1 text-gray-600 mb-3">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{hotel.location.address}</span>
                        <span className="text-sm">• {hotel.location.distanceToVenue} km del venue</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {hotel.amenities.slice(0, 6).map((amenity) => (
                          <div 
                            key={amenity} 
                            className="flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs text-gray-700"
                          >
                            {getAmenityIcon(amenity)}
                            <span className="capitalize">{amenity.replace('-', ' ')}</span>
                          </div>
                        ))}
                        {hotel.amenities.length > 6 && (
                          <span className="text-xs text-gray-500">+{hotel.amenities.length - 6} más</span>
                        )}
                      </div>
                    </div>
                    
                    <div className="text-center lg:text-right">
                      <p className="text-2xl font-bold text-primary-600 mb-1">
                        €{hotel.price.amount}
                      </p>
                      <p className="text-sm text-gray-600 mb-3">por noche</p>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center lg:justify-end gap-2">
                          <button
                            onClick={() => toggleFavorite(hotel.id)}
                            className={`p-2 rounded-lg transition-colors ${
                              favorites.includes(hotel.id)
                                ? 'text-red-500 bg-red-50'
                                : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                            }`}
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button 
                            onClick={() => toggleHotelSelection(hotel.id)}
                            className={`w-full lg:w-auto px-4 py-2 rounded-lg transition-colors text-sm ${
                              selectedHotels.includes(hotel.id)
                                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
                            } ${selectedHotels.length >= 3 && !selectedHotels.includes(hotel.id) ? 'opacity-50 cursor-not-allowed' : ''}`}
                            disabled={selectedHotels.length >= 3 && !selectedHotels.includes(hotel.id)}
                          >
                            {selectedHotels.includes(hotel.id) ? '✓ Seleccionado' : 'Seleccionar para comparar'}
                          </button>
                          <button className="w-full lg:w-auto bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors">
                            Ver detalles
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Packages Tab */}
      {activeTab === 'packages' && (
        <div className="text-center py-12">
          <Star className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Paquetes Completos</h3>
          <p className="text-gray-600 mb-6">Próximamente disponibles</p>
          <p className="text-sm text-gray-500">Combinaciones optimizadas de vuelo + hotel + entradas</p>
        </div>
      )}
      </div>
    </>
  )
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<div>Cargando resultados...</div>}>
      <ResultsContent />
    </Suspense>
  )
}
