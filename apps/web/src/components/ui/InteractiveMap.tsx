'use client'

import { useState, useEffect, useRef } from 'react'
import { MapPin, Maximize2, Minimize2 } from 'lucide-react'

interface MapProps {
  center: {
    lat: number
    lng: number
  }
  zoom?: number
  markers?: Array<{
    id: string
    lat: number
    lng: number
    title: string
    description?: string
    color?: string
  }>
  className?: string
}

export default function InteractiveMap({ center, zoom = 13, markers = [], className = '' }: MapProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // En una implementación real, aquí integrarías con Google Maps, Mapbox, etc.
  // Por ahora, crearemos una simulación visual

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handleMarkerClick = (markerId: string) => {
    setSelectedMarker(selectedMarker === markerId ? null : markerId)
  }

  // Calcular posiciones relativas basadas en las coordenadas
  const getMarkerPosition = (lat: number, lng: number) => {
    // Simular transformación de coordenadas geográficas a posición en el mapa
    const centerLat = center.lat
    const centerLng = center.lng
    
    // Factores de escala aproximados (varían según la ubicación)
    const latScale = 111000 // metros por grado de latitud
    const lngScale = 111000 * Math.cos(centerLat * Math.PI / 180) // metros por grado de longitud
    
    // Convertir diferencias a píxeles (asumiendo cierto zoom)
    const pixelsPerMeter = zoom * 0.1
    
    const x = ((lng - centerLng) * lngScale * pixelsPerMeter) + 200 // centrar en 200px
    const y = 200 - ((lat - centerLat) * latScale * pixelsPerMeter) // invertir Y, centrar en 200px
    
    return { x: Math.max(10, Math.min(390, x)), y: Math.max(10, Math.min(390, y)) }
  }

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50 bg-white' : ''} ${className}`}>
      <div className={`relative bg-gray-100 rounded-lg overflow-hidden ${
        isFullscreen ? 'h-screen' : 'h-96'
      }`}>
        {/* Map Background */}
        <div 
          ref={mapRef}
          className="w-full h-full relative"
          style={{
            backgroundImage: `
              linear-gradient(45deg, #f0f8ff 25%, transparent 25%),
              linear-gradient(-45deg, #f0f8ff 25%, transparent 25%),
              linear-gradient(45deg, transparent 75%, #f0f8ff 75%),
              linear-gradient(-45deg, transparent 75%, #f0f8ff 75%)
            `,
            backgroundSize: '20px 20px',
            backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
          }}
        >
          {/* Simulated Roads */}
          <div className="absolute inset-0">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 transform -translate-y-0.5"></div>
            <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-gray-300 transform -translate-x-0.5"></div>
            <div className="absolute top-1/4 left-1/4 right-1/4 h-px bg-gray-200"></div>
            <div className="absolute top-3/4 left-1/4 right-1/4 h-px bg-gray-200"></div>
            <div className="absolute top-1/4 bottom-1/4 left-1/4 w-px bg-gray-200"></div>
            <div className="absolute top-1/4 bottom-1/4 right-1/4 w-px bg-gray-200"></div>
          </div>

          {/* Center Marker */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-lg text-xs font-medium whitespace-nowrap">
              Centro del Mapa
            </div>
          </div>

          {/* Custom Markers */}
          {markers.map((marker) => {
            const position = getMarkerPosition(marker.lat, marker.lng)
            const isSelected = selectedMarker === marker.id
            
            return (
              <div
                key={marker.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{ left: position.x, top: position.y }}
                onClick={() => handleMarkerClick(marker.id)}
              >
                <div className={`w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center transition-all ${
                  marker.color || 'bg-blue-500'
                } ${isSelected ? 'scale-125' : 'hover:scale-110'}`}>
                  <MapPin className="w-4 h-4 text-white" />
                </div>
                
                {isSelected && (
                  <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-lg shadow-xl min-w-max z-10 border">
                    <h4 className="font-semibold text-gray-900 mb-1">{marker.title}</h4>
                    {marker.description && (
                      <p className="text-sm text-gray-600">{marker.description}</p>
                    )}
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-l border-t rotate-45"></div>
                  </div>
                )}
              </div>
            )
          })}

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <button
              onClick={toggleFullscreen}
              className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50 transition-colors"
              title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4 text-gray-700" />
              ) : (
                <Maximize2 className="w-4 h-4 text-gray-700" />
              )}
            </button>
            
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <button className="w-8 h-8 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-200 flex items-center justify-center font-bold">
                +
              </button>
              <button className="w-8 h-8 text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center font-bold">
                −
              </button>
            </div>
          </div>

          {/* Map Legend */}
          {markers.length > 0 && (
            <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3 max-w-xs">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm">Ubicaciones</h4>
              <div className="space-y-1">
                {markers.map((marker) => (
                  <div 
                    key={marker.id}
                    className="flex items-center space-x-2 text-xs cursor-pointer hover:bg-gray-50 p-1 rounded"
                    onClick={() => handleMarkerClick(marker.id)}
                  >
                    <div className={`w-3 h-3 rounded-full ${marker.color || 'bg-blue-500'}`}></div>
                    <span className="text-gray-700">{marker.title}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coordinates Display */}
          <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs font-mono">
            {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
          </div>
        </div>
      </div>

      {/* Fullscreen Overlay */}
      {isFullscreen && (
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-2">Mapa Interactivo</h3>
          <p className="text-sm text-gray-600">
            Haz clic en los marcadores para ver más información
          </p>
        </div>
      )}
    </div>
  )
}

// Componente auxiliar para mostrar un mapa con ubicaciones de torneos
export function TournamentMap({ tournament }: { tournament: any }) {
  const center = tournament.venueLocation || { lat: 48.8566, lng: 2.3522 } // París por defecto
  
  const markers = [
    {
      id: 'venue',
      lat: center.lat,
      lng: center.lng,
      title: tournament.name,
      description: `${tournament.location} • ${tournament.startDate} - ${tournament.endDate}`,
      color: 'bg-green-500'
    },
    // Hoteles cercanos simulados
    {
      id: 'hotel-1',
      lat: center.lat + 0.01,
      lng: center.lng + 0.01,
      title: 'Hotel Roland Garros',
      description: '0.8 km del venue • €280/noche',
      color: 'bg-blue-500'
    },
    {
      id: 'hotel-2',
      lat: center.lat - 0.01,
      lng: center.lng + 0.015,
      title: 'Pullman Paris Centre',
      description: '12.5 km del venue • €220/noche',
      color: 'bg-blue-500'
    },
    // Aeropuerto
    {
      id: 'airport',
      lat: center.lat + 0.02,
      lng: center.lng - 0.03,
      title: 'Aeropuerto Charles de Gaulle',
      description: '35 km del venue • Principal aeropuerto',
      color: 'bg-purple-500'
    }
  ]

  return (
    <InteractiveMap 
      center={center}
      markers={markers}
      zoom={13}
      className="w-full"
    />
  )
}
