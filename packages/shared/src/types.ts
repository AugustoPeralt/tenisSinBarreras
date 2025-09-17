// Tournament types
export interface Tournament {
  id: string
  name: string
  location: string
  city: string
  country: string
  startDate: string
  endDate: string
  category: TournamentCategory
  surface: CourtSurface
  venueLocation?: {
    lat: number
    lng: number
  }
  createdAt: string
}

export type TournamentCategory = 'ATP' | 'WTA' | 'ITF' | 'Junior' | 'Amateur' | 'Challenger'
export type CourtSurface = 'Clay' | 'Grass' | 'Hard' | 'Carpet'

// Player types
export interface Player {
  id: string
  email: string
  name: string
  ranking?: number
  category: PlayerCategory
  preferences: PlayerPreferences
  createdAt: string
}

export type PlayerCategory = 'ATP' | 'WTA' | 'ITF' | 'Junior' | 'Amateur'

export interface PlayerPreferences {
  preferredAirlines?: string[]
  hotelAmenities?: HotelAmenity[]
  budgetRange?: {
    min: number
    max: number
  }
  notifications?: {
    priceAlerts: boolean
    tournamentReminders: boolean
  }
}

// Travel types
export interface FlightOption {
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
  duration: number // minutes
  stops: number
  price: {
    amount: number
    currency: string
  }
  bookingUrl: string
}

export interface HotelOption {
  id: string
  name: string
  rating: number
  location: {
    lat: number
    lng: number
    address: string
  }
  amenities: HotelAmenity[]
  distanceToVenue?: number // kilometers
  price: {
    amount: number
    currency: string
    perNight: boolean
  }
  bookingUrl: string
  images: string[]
}

export type HotelAmenity = 
  | 'gym'
  | 'pool'
  | 'spa' 
  | 'restaurant'
  | 'wifi'
  | 'parking'
  | 'tennis-court'
  | 'fitness-center'
  | 'business-center'

// Search types
export interface TravelSearchParams {
  tournamentId: string
  origin: {
    city: string
    airport?: string
  }
  passengers: number
  departureDate: string
  returnDate: string
  preferences?: {
    maxBudget?: number
    preferredAirlines?: string[]
    hotelAmenities?: HotelAmenity[]
    maxDistanceToVenue?: number // kilometers
  }
}

export interface TravelSearchResult {
  flights: FlightOption[]
  hotels: HotelOption[]
  recommendations: TravelRecommendation[]
}

export interface TravelRecommendation {
  id: string
  flight: FlightOption
  hotel: HotelOption
  totalPrice: {
    amount: number
    currency: string
  }
  score: number // 0-100, higher is better
  reasons: string[]
}

// Booking types
export interface Booking {
  id: string
  playerId: string
  tournamentId: string
  flightId?: string
  hotelId?: string
  status: BookingStatus
  totalPrice: {
    amount: number
    currency: string
  }
  createdAt: string
  updatedAt: string
}

export type BookingStatus = 'pending' | 'confirmed' | 'cancelled'

// Favorites types
export interface FavoriteTournament {
  id: string
  playerId: string
  tournamentId: string
  createdAt: string
}

export interface FavoriteFlight {
  id: string
  playerId: string
  flightId: string
  searchParams: TravelSearchParams
  createdAt: string
}

export interface FavoriteHotel {
  id: string
  playerId: string
  hotelId: string
  searchParams: TravelSearchParams
  createdAt: string
}

// Comparison types
export interface FlightComparison {
  flights: FlightOption[]
  cheapest: FlightOption
  shortest: FlightOption
  mostDirect: FlightOption
}

export interface HotelComparison {
  hotels: HotelOption[]
  cheapest: HotelOption
  bestRated: HotelOption
  closest: HotelOption
}

// User dashboard types
export interface UserDashboard {
  player: Player
  favorites: {
    tournaments: Tournament[]
    flights: FlightOption[]
    hotels: HotelOption[]
  }
  recentSearches: TravelSearchParams[]
  upcomingTournaments: Tournament[]
  bookings: Booking[]
}

// API Response types
export interface ApiResponse<T> {
  data: T | null
  error: string | null
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

// Utility types
export interface Location {
  lat: number
  lng: number
}

export interface DateRange {
  from: string
  to: string
}
