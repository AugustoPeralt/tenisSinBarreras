import { TravelRecommendation, FlightOption, HotelOption, TravelSearchParams } from './types'

export class TravelOptimizer {
  /**
   * Calculate optimization score for a flight + hotel combination
   */
  static calculateScore(
    flight: FlightOption,
    hotel: HotelOption,
    params: TravelSearchParams
  ): number {
    let score = 100
    const weights = {
      price: 0.4,
      distance: 0.3,
      amenities: 0.2,
      convenience: 0.1
    }

    // Price score (lower price = higher score)
    const totalPrice = flight.price.amount + (hotel.price.amount * this.calculateNights(params))
    const maxBudget = params.preferences?.maxBudget || totalPrice * 1.5
    const priceScore = Math.max(0, (maxBudget - totalPrice) / maxBudget * 100)

    // Distance score (closer = higher score)
    const maxDistance = params.preferences?.maxDistanceToVenue || 20
    const distance = hotel.distanceToVenue || maxDistance
    const distanceScore = Math.max(0, (maxDistance - distance) / maxDistance * 100)

    // Amenities score
    const preferredAmenities = params.preferences?.hotelAmenities || []
    const amenitiesMatch = preferredAmenities.filter(amenity => 
      hotel.amenities.includes(amenity)
    ).length
    const amenitiesScore = preferredAmenities.length > 0 
      ? (amenitiesMatch / preferredAmenities.length) * 100 
      : 75 // neutral score if no preferences

    // Convenience score (fewer stops, better times)
    const convenienceScore = this.calculateConvenienceScore(flight)

    // Calculate weighted score
    score = (
      priceScore * weights.price +
      distanceScore * weights.distance +
      amenitiesScore * weights.amenities +
      convenienceScore * weights.convenience
    )

    return Math.round(Math.min(100, Math.max(0, score)))
  }

  /**
   * Generate reasons for recommendation
   */
  static generateReasons(
    flight: FlightOption,
    hotel: HotelOption,
    params: TravelSearchParams
  ): string[] {
    const reasons: string[] = []

    // Price reasons
    const totalPrice = flight.price.amount + (hotel.price.amount * this.calculateNights(params))
    const maxBudget = params.preferences?.maxBudget
    if (maxBudget && totalPrice <= maxBudget * 0.8) {
      reasons.push('Great value within budget')
    }

    // Distance reasons
    if (hotel.distanceToVenue && hotel.distanceToVenue <= 5) {
      reasons.push('Very close to tournament venue')
    } else if (hotel.distanceToVenue && hotel.distanceToVenue <= 10) {
      reasons.push('Convenient location near venue')
    }

    // Amenities reasons
    const preferredAmenities = params.preferences?.hotelAmenities || []
    const hasGym = hotel.amenities.includes('gym') || hotel.amenities.includes('fitness-center')
    if (preferredAmenities.includes('gym') && hasGym) {
      reasons.push('Hotel has fitness facilities')
    }

    const hasTennisCourt = hotel.amenities.includes('tennis-court')
    if (hasTennisCourt) {
      reasons.push('Hotel has tennis court for practice')
    }

    // Flight reasons
    if (flight.stops === 0) {
      reasons.push('Direct flight - no layovers')
    }

    if (flight.duration <= 180) { // 3 hours
      reasons.push('Short flight duration')
    }

    // Hotel rating
    if (hotel.rating >= 4.5) {
      reasons.push('Highly rated accommodation')
    }

    return reasons.slice(0, 4) // Limit to top 4 reasons
  }

  /**
   * Calculate convenience score based on flight characteristics
   */
  private static calculateConvenienceScore(flight: FlightOption): number {
    let score = 50

    // Direct flights get bonus
    if (flight.stops === 0) {
      score += 30
    } else if (flight.stops === 1) {
      score += 10
    }

    // Short flights get bonus
    if (flight.duration <= 120) { // 2 hours
      score += 20
    } else if (flight.duration <= 240) { // 4 hours
      score += 10
    }

    // Reasonable departure times (6 AM - 10 PM)
    const departureHour = new Date(flight.departure.time).getHours()
    if (departureHour >= 6 && departureHour <= 22) {
      score += 10
    }

    return Math.min(100, score)
  }

  /**
   * Calculate number of nights from search parameters
   */
  private static calculateNights(params: TravelSearchParams): number {
    const departure = new Date(params.departureDate)
    const returnDate = new Date(params.returnDate)
    const diffTime = Math.abs(returnDate.getTime() - departure.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}

/**
 * Utility functions for travel-related calculations
 */
export class TravelUtils {
  /**
   * Calculate distance between two points using Haversine formula
   */
  static calculateDistance(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number {
    const R = 6371 // Radius of the Earth in kilometers
    const dLat = this.deg2rad(lat2 - lat1)
    const dLon = this.deg2rad(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private static deg2rad(deg: number): number {
    return deg * (Math.PI / 180)
  }

  /**
   * Format price for display
   */
  static formatPrice(amount: number, currency: string): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  /**
   * Format duration in minutes to human readable format
   */
  static formatDuration(minutes: number): string {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    
    if (hours === 0) {
      return `${mins}m`
    } else if (mins === 0) {
      return `${hours}h`
    } else {
      return `${hours}h ${mins}m`
    }
  }

  /**
   * Check if dates are valid for booking
   */
  static isValidBookingDates(departureDate: string, returnDate: string): boolean {
    const departure = new Date(departureDate)
    const returnD = new Date(returnDate)
    const now = new Date()

    // Departure must be in the future
    if (departure <= now) {
      return false
    }

    // Return must be after departure
    if (returnD <= departure) {
      return false
    }

    return true
  }
}
