'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeftIcon, 
  HeartIcon, 
  ShareIcon,
  ClockIcon,
  MapPinIcon,
  UserGroupIcon,
  CurrencyEuroIcon,
  StarIcon,
  WifiIcon,
  TruckIcon,
  BuildingOffice2Icon
} from '@heroicons/react/24/outline'
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid'
import BackNavigation, { useBreadcrumbs } from '../../components/navigation/BackNavigation'

interface FlightOption {
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

interface HotelOption {
  id: string
  name: string
  rating: number
  location: {
    address: string
  }
  amenities: string[]
  distanceToVenue?: number
  price: {
    amount: number
    currency: string
    perNight: boolean
  }
  bookingUrl: string
  images: string[]
}

function ComparePageContent() {
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const type = searchParams.get('type') || 'flights'
  const ids = searchParams.get('ids')?.split(',') || []
  
  const [favorites, setFavorites] = useState<string[]>([])
  const breadcrumbs = useBreadcrumbs(pathname)
  // Mock data - en producción vendría de la API
  const flightData: FlightOption[] = [
    {
      id: 'AF1234',
      airline: 'Air France',
      departure: { airport: 'MAD', time: '08:30', city: 'Madrid' },
      arrival: { airport: 'CDG', time: '10:45', city: 'París' },
      duration: 135,
      stops: 0,
      price: { amount: 245, currency: 'EUR' },
      bookingUrl: '#'
    },
    {
      id: 'LH5678',
      airline: 'Lufthansa',
      departure: { airport: 'MAD', time: '14:20', city: 'Madrid' },
      arrival: { airport: 'CDG', time: '18:50', city: 'París' },
      duration: 270,
      stops: 1,
      price: { amount: 189, currency: 'EUR' },
      bookingUrl: '#'
    },
    {
      id: 'IB9012',
      airline: 'Iberia',
      departure: { airport: 'MAD', time: '16:15', city: 'Madrid' },
      arrival: { airport: 'ORY', time: '18:30', city: 'París' },
      duration: 135,
      stops: 0,
      price: { amount: 198, currency: 'EUR' },
      bookingUrl: '#'
    }
  ]

  const hotelData: HotelOption[] = [
    {
      id: 'hotel-1',
      name: 'Hotel Roland Garros',
      rating: 4.5,
      location: { address: '17 Rue Molitor, 75016 París' },
      amenities: ['wifi', 'parking', 'gym', 'restaurant'],
      distanceToVenue: 0.8,
      price: { amount: 280, currency: 'EUR', perNight: true },
      bookingUrl: '#',
      images: ['https://via.placeholder.com/300x200']
    },
    {
      id: 'hotel-2',
      name: 'Pullman Paris Centre',
      rating: 4.3,
      location: { address: '1 Rue de Stockholm, 75008 París' },
      amenities: ['wifi', 'spa', 'restaurant', 'business-center'],
      distanceToVenue: 12.5,
      price: { amount: 220, currency: 'EUR', perNight: true },
      bookingUrl: '#',
      images: ['https://via.placeholder.com/300x200']
    },
    {
      id: 'hotel-3',
      name: 'Novotel Paris Bercy',
      rating: 4.1,
      location: { address: '85 Rue de Bercy, 75012 París' },
      amenities: ['wifi', 'pool', 'gym', 'parking'],
      distanceToVenue: 8.2,
      price: { amount: 165, currency: 'EUR', perNight: true },
      bookingUrl: '#',
      images: ['https://via.placeholder.com/300x200']
    }
  ]

  const selectedFlights = flightData.filter(flight => ids.includes(flight.id))
  const selectedHotels = hotelData.filter(hotel => ids.includes(hotel.id))

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    )
  }

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours}h ${mins}m`
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <WifiIcon className="w-4 h-4" />
      case 'parking': return <TruckIcon className="w-4 h-4" />
      case 'gym': return <BuildingOffice2Icon className="w-4 h-4" />
      default: return <BuildingOffice2Icon className="w-4 h-4" />
    }
  }

  if (type === 'flights') {
    return (
      <>
        {/* Back Navigation */}
        <BackNavigation 
          breadcrumbs={breadcrumbs}
          title="Comparar Vuelos"
          subtitle={`${selectedFlights.length} vuelos seleccionados para comparar`}
        />
        
        <div className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedFlights.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No se han seleccionado vuelos para comparar</p>
              <Link 
                href="/results" 
                className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                Buscar Vuelos
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-sm border">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Vuelo</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Horarios</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Duración</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Escalas</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Precio</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {selectedFlights.map((flight) => (
                    <tr key={flight.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-medium text-blue-600">
                              {flight.airline.substring(0, 2)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{flight.airline}</p>
                            <p className="text-sm text-gray-500">{flight.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className="text-center">
                            <p className="font-medium">{flight.departure.time}</p>
                            <p className="text-sm text-gray-500">{flight.departure.airport}</p>
                          </div>
                          <ArrowLeftIcon className="w-4 h-4 text-gray-400 rotate-180" />
                          <div className="text-center">
                            <p className="font-medium">{flight.arrival.time}</p>
                            <p className="text-sm text-gray-500">{flight.arrival.airport}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <ClockIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-sm">{formatDuration(flight.duration)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          flight.stops === 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {flight.stops === 0 ? 'Directo' : `${flight.stops} escala${flight.stops > 1 ? 's' : ''}`}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-1">
                          <CurrencyEuroIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-lg font-semibold text-gray-900">
                            {flight.price.amount}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => toggleFavorite(flight.id)}
                            className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                          >
                            {favorites.includes(flight.id) ? (
                              <HeartSolidIcon className="w-5 h-5 text-red-500" />
                            ) : (
                              <HeartIcon className="w-5 h-5" />
                            )}
                          </button>
                          <a
                            href={flight.bookingUrl}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                          >
                            Reservar
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="font-semibold text-green-800 mb-2">💰 Más Económico</h3>
                  {selectedFlights.reduce((prev, current) => 
                    prev.price.amount < current.price.amount ? prev : current
                  ) && (
                    <div>
                      <p className="font-medium">{selectedFlights.reduce((prev, current) => 
                        prev.price.amount < current.price.amount ? prev : current
                      ).airline}</p>
                      <p className="text-2xl font-bold text-green-600">
                        €{selectedFlights.reduce((prev, current) => 
                          prev.price.amount < current.price.amount ? prev : current
                        ).price.amount}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="font-semibold text-blue-800 mb-2">⚡ Más Rápido</h3>
                  {selectedFlights.reduce((prev, current) => 
                    prev.duration < current.duration ? prev : current
                  ) && (
                    <div>
                      <p className="font-medium">{selectedFlights.reduce((prev, current) => 
                        prev.duration < current.duration ? prev : current
                      ).airline}</p>
                      <p className="text-2xl font-bold text-blue-600">
                        {formatDuration(selectedFlights.reduce((prev, current) => 
                          prev.duration < current.duration ? prev : current
                        ).duration)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="font-semibold text-purple-800 mb-2">🎯 Sin Escalas</h3>
                  {selectedFlights.filter(f => f.stops === 0).length > 0 ? (
                    <div>
                      <p className="font-medium">{selectedFlights.filter(f => f.stops === 0)[0].airline}</p>
                      <p className="text-2xl font-bold text-purple-600">Directo</p>
                    </div>
                  ) : (
                    <p className="text-purple-600">No hay vuelos directos</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
      </>
    )
  }

  // Hotel comparison view
  return (
    <>
      {/* Back Navigation */}
      <BackNavigation 
        breadcrumbs={breadcrumbs}
        title="Comparar Hoteles"
        subtitle={`${selectedHotels.length} hoteles seleccionados para comparar`}
      />
      
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {selectedHotels.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No se han seleccionado hoteles para comparar</p>
            <Link 
              href="/results" 
              className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Buscar Hoteles
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow-sm border">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Hotel</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Valoración</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Ubicación</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Distancia</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Servicios</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Precio</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-900">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {selectedHotels.map((hotel) => (
                  <tr key={hotel.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img 
                          src={hotel.images[0]} 
                          alt={hotel.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900">{hotel.name}</p>
                          <p className="text-sm text-gray-500">{hotel.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{hotel.rating}</span>
                        <span className="text-sm text-gray-500">/5</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm">{hotel.location.address}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">
                        {hotel.distanceToVenue} km del torneo
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex space-x-1">
                        {hotel.amenities.slice(0, 3).map((amenity, index) => (
                          <span key={index} className="text-gray-400" title={amenity}>
                            {getAmenityIcon(amenity)}
                          </span>
                        ))}
                        {hotel.amenities.length > 3 && (
                          <span className="text-xs text-gray-500">+{hotel.amenities.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="flex items-center space-x-1">
                          <CurrencyEuroIcon className="w-4 h-4 text-gray-400" />
                          <span className="text-lg font-semibold text-gray-900">
                            {hotel.price.amount}
                          </span>
                        </div>
                        <span className="text-xs text-gray-500">por noche</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button 
                          onClick={() => toggleFavorite(hotel.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          {favorites.includes(hotel.id) ? (
                            <HeartSolidIcon className="w-5 h-5 text-red-500" />
                          ) : (
                            <HeartIcon className="w-5 h-5" />
                          )}
                        </button>
                        <a
                          href={hotel.bookingUrl}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
                        >
                          Reservar
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-800 mb-2">💰 Más Económico</h3>
                {selectedHotels.reduce((prev, current) => 
                  prev.price.amount < current.price.amount ? prev : current
                ) && (
                  <div>
                    <p className="font-medium">{selectedHotels.reduce((prev, current) => 
                      prev.price.amount < current.price.amount ? prev : current
                    ).name}</p>
                    <p className="text-2xl font-bold text-green-600">
                      €{selectedHotels.reduce((prev, current) => 
                        prev.price.amount < current.price.amount ? prev : current
                      ).price.amount}
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-blue-800 mb-2">⭐ Mejor Valorado</h3>
                {selectedHotels.reduce((prev, current) => 
                  prev.rating > current.rating ? prev : current
                ) && (
                  <div>
                    <p className="font-medium">{selectedHotels.reduce((prev, current) => 
                      prev.rating > current.rating ? prev : current
                    ).name}</p>
                    <p className="text-2xl font-bold text-blue-600">
                      ⭐ {selectedHotels.reduce((prev, current) => 
                        prev.rating > current.rating ? prev : current
                      ).rating}/5
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="font-semibold text-purple-800 mb-2">📍 Más Cercano</h3>
                {selectedHotels.reduce((prev, current) => 
                  (prev.distanceToVenue || 999) < (current.distanceToVenue || 999) ? prev : current
                ) && (
                  <div>
                    <p className="font-medium">{selectedHotels.reduce((prev, current) => 
                      (prev.distanceToVenue || 999) < (current.distanceToVenue || 999) ? prev : current
                    ).name}</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {selectedHotels.reduce((prev, current) => 
                        (prev.distanceToVenue || 999) < (current.distanceToVenue || 999) ? prev : current
                      ).distanceToVenue} km
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
    </>
  )
}

export default function ComparePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando comparación...</p>
        </div>
      </div>
    }>
      <ComparePageContent />
    </Suspense>
  )
}
