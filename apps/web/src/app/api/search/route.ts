import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '../../../lib/supabase'

// Professional flight data based on real routes
const generateRealisticFlights = (origin: string, destination: string, departureDate: string, tournamentDetails: any) => {
  const flights = []
  
  // Major European airports and realistic flight routes
  const airportMappings: any = {
    'Madrid': { code: 'MAD', airlines: ['Iberia', 'Air France', 'Vueling'] },
    'Barcelona': { code: 'BCN', airlines: ['Vueling', 'Iberia', 'Air France'] },
    'Paris': { code: 'CDG', airlines: ['Air France', 'Iberia', 'Lufthansa'] },
    'London': { code: 'LHR', airlines: ['British Airways', 'Iberia', 'Air France'] },
    'New York': { code: 'JFK', airlines: ['Delta', 'Air France', 'American'] },
    'Miami': { code: 'MIA', airlines: ['American', 'Iberia', 'Air France'] },
    'Shanghai': { code: 'PVG', airlines: ['Air China', 'China Eastern', 'Lufthansa'] },
    'Turin': { code: 'TRN', airlines: ['Alitalia', 'Lufthansa', 'Air France'] },
    'Monte Carlo': { code: 'NCE', airlines: ['Air France', 'Iberia', 'British Airways'] },
    'Indian Wells': { code: 'PSP', airlines: ['American', 'United', 'Delta'] }
  }
  
  const originAirport = airportMappings[origin] || { code: 'MAD', airlines: ['Iberia'] }
  const destAirport = airportMappings[destination] || airportMappings[tournamentDetails?.city] || { code: 'CDG', airlines: ['Air France'] }
  
  // Generate realistic flight combinations
  for (let i = 0; i < 3; i++) {
    const airline = destAirport.airlines[i % destAirport.airlines.length]
    const basePrice = getBasePrice(origin, destination, tournamentDetails?.category)
    const variance = (Math.random() * 200) - 100 // ±100 EUR variance
    
    flights.push({
      id: `flight-${i + 1}`,
      airline,
      departure: {
        airport: originAirport.code,
        time: new Date(departureDate + 'T' + ['08:00', '14:00', '18:30'][i] + ':00Z').toISOString(),
        city: origin
      },
      arrival: {
        airport: destAirport.code,
        time: new Date(departureDate + 'T' + ['10:30', '16:30', '21:00'][i] + ':00Z').toISOString(),
        city: destination
      },
      duration: getDuration(origin, destination),
      stops: i === 2 ? 1 : 0, // Last flight has a stop
      price: {
        amount: Math.round(basePrice + variance),
        currency: 'EUR'
      },
      bookingUrl: `https://www.skyscanner.com/transport/flights/${originAirport.code}/${destAirport.code}/${departureDate.replace(/-/g, '')}/`
    })
  }
  
  return flights
}

// Generate realistic hotels based on tournament location
const generateRealisticHotels = (tournamentDetails: any): any[] => {
  const hotels: any[] = []
  const city = tournamentDetails?.city || 'Paris'
  const venue = tournamentDetails?.venue || 'Tournament Venue'
  const category = tournamentDetails?.category || 'ATP 500'
  
  // Base hotel data per city
  const cityHotels: any = {
    'Paris': [
      { name: 'Le Meurice', rating: 5.0, basePrice: 850, luxury: true },
      { name: 'Hotel Plaza Athénée', rating: 4.9, basePrice: 750, luxury: true },
      { name: 'Pullman Paris Montparnasse', rating: 4.5, basePrice: 280, business: true },
      { name: 'Novotel Paris Centre Gare Montparnasse', rating: 4.2, basePrice: 200, standard: true },
      { name: 'Ibis Paris 17 Clichy-Batignolles', rating: 3.8, basePrice: 120, budget: true }
    ],
    'Madrid': [
      { name: 'The Ritz-Carlton Madrid', rating: 5.0, basePrice: 650, luxury: true },
      { name: 'Hotel Villa Magna', rating: 4.8, basePrice: 450, luxury: true },
      { name: 'NH Collection Madrid Suecia', rating: 4.4, basePrice: 180, business: true },
      { name: 'Hotel Mediodia', rating: 4.0, basePrice: 140, standard: true }
    ],
    'London': [
      { name: 'The Savoy', rating: 5.0, basePrice: 950, luxury: true },
      { name: 'Claridge\'s', rating: 4.9, basePrice: 850, luxury: true },
      { name: 'The Langham London', rating: 4.6, basePrice: 380, business: true },
      { name: 'Premier Inn London Southwark', rating: 4.2, basePrice: 150, standard: true }
    ]
  }
  
  const hotelOptions = cityHotels[city] || cityHotels['Paris']
  
  hotelOptions.forEach((hotel: any, index: number) => {
    const distanceToVenue = [0.8, 1.5, 3.2, 5.1, 8.5][index] || (Math.random() * 10)
    const amenities = hotel.luxury 
      ? ['gym', 'spa', 'wifi', 'pool', 'tennis-court', 'concierge', 'restaurant', 'fitness-center']
      : hotel.business
      ? ['gym', 'wifi', 'restaurant', 'fitness-center', 'business-center']
      : ['wifi', 'restaurant']
    
    // Tournament premium - prices increase for big tournaments
    const premiumMultiplier = category.includes('Grand Slam') ? 2.5 : 
                             category.includes('Masters 1000') ? 1.8 : 1.3
    
    hotels.push({
      id: `hotel-${index + 1}`,
      name: hotel.name,
      rating: hotel.rating,
      location: {
        lat: 48.8566 + (Math.random() * 0.1) - 0.05,
        lng: 2.3522 + (Math.random() * 0.1) - 0.05,
        address: `${Math.floor(Math.random() * 999) + 1} Tennis Street, ${city}`
      },
      amenities,
      distanceToVenue: Math.round(distanceToVenue * 10) / 10,
      price: {
        amount: Math.round(hotel.basePrice * premiumMultiplier),
        currency: 'EUR',
        perNight: true
      },
      bookingUrl: `https://www.booking.com/hotel/${city.toLowerCase()}-${hotel.name.toLowerCase().replace(/\s+/g, '-')}.html`,
      images: [`https://via.placeholder.com/400x250?text=${encodeURIComponent(hotel.name)}`]
    })
  })
  
  return hotels
}

// Helper functions
const getBasePrice = (origin: string, destination: string, category?: string) => {
  const distances: any = {
    'Madrid-Paris': 280,
    'Barcelona-Paris': 320,
    'Madrid-London': 350,
    'Paris-New York': 650,
    'Madrid-Miami': 850,
    'Paris-Shanghai': 950,
    'Madrid-Monte Carlo': 450
  }
  
  const route = `${origin}-${destination}`
  return distances[route] || distances[`${destination}-${origin}`] || 400
}

const getDuration = (origin: string, destination: string) => {
  const durations: any = {
    'Madrid-Paris': 120,
    'Barcelona-Paris': 105,
    'Madrid-London': 135,
    'Paris-New York': 480,
    'Madrid-Miami': 540,
    'Paris-Shanghai': 660
  }
  
  const route = `${origin}-${destination}`
  return durations[route] || durations[`${destination}-${origin}`] || 120
}

// Travel optimization utilities
const TravelOptimizer = {
  calculateScore(flight: any, hotel: any, searchParams: any): number {
    let score = 0
    
    // Price factor (higher weight)
    const nights = Math.ceil((new Date(searchParams.returnDate).getTime() - new Date(searchParams.departureDate).getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = flight.price.amount + (hotel.price.amount * nights)
    score += Math.max(0, 100 - (totalPrice / 50)) // Normalized
    
    // Distance to venue factor
    score += Math.max(0, 50 - (hotel.distanceToVenue * 10))
    
    // Hotel rating factor
    score += hotel.rating * 10
    
    // Flight stops factor
    score += flight.stops === 0 ? 20 : 10
    
    // Tournament category premium
    if (searchParams.tournamentDetails?.category?.includes('Grand Slam')) {
      score += 15
    } else if (searchParams.tournamentDetails?.category?.includes('Masters 1000')) {
      score += 10
    }
    
    return Math.round(score)
  },
  
  generateReasons(flight: any, hotel: any, searchParams: any): string[] {
    const reasons = []
    
    if (flight.stops === 0) {
      reasons.push('Vuelo directo')
    }
    
    if (hotel.distanceToVenue < 2) {
      reasons.push('Hotel muy cerca del venue')
    }
    
    if (hotel.rating >= 4.5) {
      reasons.push('Hotel de alta calidad')
    }
    
    if (hotel.amenities.includes('tennis-court')) {
      reasons.push('Hotel con cancha de tenis')
    }
    
    if (hotel.amenities.includes('spa')) {
      reasons.push('Spa para recuperación')
    }
    
    const nights = Math.ceil((new Date(searchParams.returnDate).getTime() - new Date(searchParams.departureDate).getTime()) / (1000 * 60 * 60 * 24))
    const totalPrice = flight.price.amount + (hotel.price.amount * nights)
    
    if (totalPrice < 1500) {
      reasons.push('Excelente relación calidad-precio')
    }
    
    if (searchParams.tournamentDetails?.category?.includes('Grand Slam')) {
      reasons.push('Optimizado para Grand Slam')
    }
    
    return reasons
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = await request.json()
    
    // Validate search parameters
    if (!searchParams.origin || !searchParams.departureDate) {
      return NextResponse.json(
        { error: 'Missing required parameters' },
        { status: 400 }
      )
    }

    // Get tournament details from database if tournamentId provided
    let tournamentDetails = searchParams.tournamentDetails
    if (searchParams.tournamentId && !tournamentDetails) {
      const supabase = createClient()
      const { data } = await supabase
        .from('tournaments')
        .select('*')
        .eq('id', searchParams.tournamentId)
        .single()
      
      tournamentDetails = data
    }

    const destination = tournamentDetails?.city || searchParams.tournament.split(' ')[0] || 'Paris'

    // Generate realistic flight and hotel data
    const flights = generateRealisticFlights(
      searchParams.origin, 
      destination, 
      searchParams.departureDate,
      tournamentDetails
    )
    
    const hotels = generateRealisticHotels(tournamentDetails)

    // Generate optimized recommendations
    const recommendations = []
    
    for (const flight of flights) {
      for (const hotel of hotels) {
        const score = TravelOptimizer.calculateScore(flight, hotel, searchParams)
        const reasons = TravelOptimizer.generateReasons(flight, hotel, searchParams)
        
        const nights = Math.ceil((new Date(searchParams.returnDate).getTime() - new Date(searchParams.departureDate).getTime()) / (1000 * 60 * 60 * 24))
        
        recommendations.push({
          id: `rec-${flight.id}-${hotel.id}`,
          flight,
          hotel,
          totalPrice: {
            amount: flight.price.amount + (hotel.price.amount * Math.max(nights, 1)),
            currency: 'EUR'
          },
          score,
          reasons,
          tournamentInfo: tournamentDetails ? {
            name: tournamentDetails.name,
            venue: tournamentDetails.venue,
            category: tournamentDetails.category,
            surface: tournamentDetails.surface
          } : null
        })
      }
    }

    // Sort by score descending
    recommendations.sort((a, b) => b.score - a.score)

    return NextResponse.json({
      success: true,
      data: {
        flights,
        hotels,
        recommendations: recommendations.slice(0, 6), // Top 6 recommendations
        searchParams: {
          ...searchParams,
          destination,
          tournamentDetails
        }
      }
    })

  } catch (error) {
    console.error('Travel search error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
