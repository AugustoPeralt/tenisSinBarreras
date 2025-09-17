'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import BackNavigation from '../../components/navigation/BackNavigation'
import PDFExport from '../../components/ui/PDFExport'
import CalendarIntegration from '../../components/ui/CalendarIntegration'
import { FileText, Calendar, Share2, Star, MapPin, Clock } from 'lucide-react'

// Sample data - in real app, this would come from API/database
const sampleItinerary = {
  tournament: {
    id: '1',
    name: 'French Open',
    city: 'Paris',
    country: 'France',
    start_date: '2025-05-26',
    end_date: '2025-06-08',
    category: 'Grand Slam',
    surface: 'Clay',
    venue: 'Stade Roland Garros'
  },
  totalCost: 4990
}

function ItineraryContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('overview')
  const [itinerary] = useState(sampleItinerary)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <BackNavigation title="Tournament Itinerary" />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {itinerary.tournament.name}
              </h1>
              <p className="text-lg text-gray-600 mb-4">
                Complete Travel Itinerary
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{itinerary.tournament.city}, {itinerary.tournament.country}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{formatDate(itinerary.tournament.start_date)} - {formatDate(itinerary.tournament.end_date)}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 text-right">
              <div className="text-3xl font-bold text-green-600">
                {formatCurrency(itinerary.totalCost)}
              </div>
              <p className="text-sm text-gray-500">Total Cost</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'overview', name: 'Overview', icon: Star },
                { id: 'pdf', name: 'Export PDF', icon: FileText },
                { id: 'calendar', name: 'Add to Calendar', icon: Calendar },
                { id: 'share', name: 'Share', icon: Share2 }
              ].map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-xl font-semibold text-blue-900 mb-4">
                    {itinerary.tournament.name}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-gray-700">
                      <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{itinerary.tournament.city}, {itinerary.tournament.country}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-blue-600" />
                      <span>{itinerary.tournament.category}</span>
                    </div>
                    <div className="col-span-2 mt-2">
                      <p className="font-medium text-gray-900">
                        📅 {formatDate(itinerary.tournament.start_date)} - {formatDate(itinerary.tournament.end_date)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-gray-700">
                        🎾 Surface: {itinerary.tournament.surface}
                      </p>
                      <p className="text-gray-700">
                        🏟️ Venue: {itinerary.tournament.venue}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* PDF Export Tab */}
            {activeTab === 'pdf' && (
              <div className="space-y-6">
                <div className="text-center">
                  <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Export PDF</h3>
                  <p className="text-gray-600 mb-6">Export your complete itinerary as a professional PDF document</p>
                </div>
                <PDFExport 
                  itinerary={itinerary}
                />
              </div>
            )}

            {/* Calendar Tab */}
            {activeTab === 'calendar' && (
              <div className="space-y-6">
                <div className="text-center">
                  <Calendar className="h-12 w-12 text-green-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Add to Calendar</h3>
                  <p className="text-gray-600 mb-6">Add tournament dates and travel plans to your calendar</p>
                </div>
                <CalendarIntegration 
                  tournament={itinerary.tournament}
                />
              </div>
            )}

            {/* Share Tab */}
            {activeTab === 'share' && (
              <div className="text-center py-12">
                <Share2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Share Your Itinerary</h3>
                <p className="text-gray-600 mb-6">Share this travel plan with friends or travel companions</p>
                
                <div className="space-y-4 max-w-md mx-auto">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Copy Link to Share
                  </button>
                  <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors">
                    Share via WhatsApp
                  </button>
                  <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors">
                    Send via Email
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ItineraryPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600">Loading itinerary...</p>
        </div>
      </div>
    }>
      <ItineraryContent />
    </Suspense>
  )
}
