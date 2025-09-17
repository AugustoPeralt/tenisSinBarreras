'use client'

import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'
import { Download, FileText, Calendar, MapPin, Clock, Plane, Hotel } from 'lucide-react'

interface TournamentItinerary {
  tournament: {
    id: string
    name: string
    city: string
    country: string
    start_date: string
    end_date: string
    category: string
    surface: string
    venue?: string
  }
  flights?: {
    outbound: {
      departure: string
      arrival: string
      duration: string
      price: number
      airline: string
    }
    return: {
      departure: string
      arrival: string
      duration: string
      price: number
      airline: string
    }
  }
  accommodation?: {
    name: string
    type: string
    checkIn: string
    checkOut: string
    nights: number
    price: number
    rating: number
  }
  totalCost?: number
  notes?: string
}

interface PDFExportProps {
  itinerary: TournamentItinerary
  userInfo?: {
    name: string
    email: string
  }
}

export default function PDFExport({ itinerary, userInfo }: PDFExportProps) {
  const componentRef = useRef<HTMLDivElement>(null)

  // Print using react-to-print
  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${itinerary.tournament.name}_Itinerary`,
  })

  // Export as PDF using jsPDF
  const handlePDFExport = async () => {
    if (!componentRef.current) return

    try {
      const canvas = await html2canvas(componentRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      })

      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF('p', 'mm', 'a4')
      
      const imgWidth = 210
      const pageHeight = 295
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save(`${itinerary.tournament.name.replace(/\s+/g, '_')}_Itinerary.pdf`)
    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Error generating PDF. Please try again.')
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount)
  }

  return (
    <div className="space-y-4">
      {/* Export Buttons */}
      <div className="flex space-x-3 mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <FileText className="w-4 h-4" />
          <span>Imprimir</span>
        </button>
        
        <button
          onClick={handlePDFExport}
          className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Download className="w-4 h-4" />
          <span>Descargar PDF</span>
        </button>
      </div>

      {/* PDF Content */}
      <div ref={componentRef} className="bg-white p-8 shadow-lg">
        {/* Header */}
        <div className="border-b-2 border-blue-600 pb-6 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Tennis Travel Itinerary
              </h1>
              <p className="text-lg text-gray-600">
                Professional Tournament Travel Plan
              </p>
            </div>
            <div className="text-right text-sm text-gray-500">
              <p>Generated: {new Date().toLocaleDateString()}</p>
              {userInfo && (
                <>
                  <p>For: {userInfo.name}</p>
                  <p>{userInfo.email}</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Tournament Information */}
        <section className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-blue-600" />
            Tournament Details
          </h2>
          
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
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
                {itinerary.tournament.venue && (
                  <p className="text-gray-700">
                    🏟️ Venue: {itinerary.tournament.venue}
                  </p>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Flight Information */}
        {itinerary.flights && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Plane className="w-6 h-6 mr-2 text-blue-600" />
              Flight Details
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Outbound Flight */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">✈️ Outbound Flight</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Airline:</strong> {itinerary.flights.outbound.airline}</p>
                  <p><strong>Departure:</strong> {itinerary.flights.outbound.departure}</p>
                  <p><strong>Arrival:</strong> {itinerary.flights.outbound.arrival}</p>
                  <p><strong>Duration:</strong> {itinerary.flights.outbound.duration}</p>
                  <p className="text-green-600 font-medium">
                    <strong>Price:</strong> {formatCurrency(itinerary.flights.outbound.price)}
                  </p>
                </div>
              </div>

              {/* Return Flight */}
              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-3">🏠 Return Flight</h3>
                <div className="space-y-2 text-sm">
                  <p><strong>Airline:</strong> {itinerary.flights.return.airline}</p>
                  <p><strong>Departure:</strong> {itinerary.flights.return.departure}</p>
                  <p><strong>Arrival:</strong> {itinerary.flights.return.arrival}</p>
                  <p><strong>Duration:</strong> {itinerary.flights.return.duration}</p>
                  <p className="text-green-600 font-medium">
                    <strong>Price:</strong> {formatCurrency(itinerary.flights.return.price)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Accommodation */}
        {itinerary.accommodation && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
              <Hotel className="w-6 h-6 mr-2 text-blue-600" />
              Accommodation
            </h2>
            
            <div className="border rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {itinerary.accommodation.name}
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p><strong>Type:</strong> {itinerary.accommodation.type}</p>
                  <p><strong>Check-in:</strong> {formatDate(itinerary.accommodation.checkIn)}</p>
                  <p><strong>Check-out:</strong> {formatDate(itinerary.accommodation.checkOut)}</p>
                </div>
                <div>
                  <p><strong>Nights:</strong> {itinerary.accommodation.nights}</p>
                  <p><strong>Rating:</strong> {'⭐'.repeat(itinerary.accommodation.rating)}</p>
                  <p className="text-green-600 font-medium">
                    <strong>Total:</strong> {formatCurrency(itinerary.accommodation.price)}
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Cost Summary */}
        {itinerary.totalCost && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">💰 Cost Summary</h2>
            
            <div className="bg-green-50 rounded-lg p-6">
              <div className="space-y-2">
                {itinerary.flights && (
                  <>
                    <div className="flex justify-between">
                      <span>Outbound Flight</span>
                      <span>{formatCurrency(itinerary.flights.outbound.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Return Flight</span>
                      <span>{formatCurrency(itinerary.flights.return.price)}</span>
                    </div>
                  </>
                )}
                {itinerary.accommodation && (
                  <div className="flex justify-between">
                    <span>Accommodation ({itinerary.accommodation.nights} nights)</span>
                    <span>{formatCurrency(itinerary.accommodation.price)}</span>
                  </div>
                )}
                <hr className="my-2" />
                <div className="flex justify-between text-lg font-bold text-green-700">
                  <span>Total Cost</span>
                  <span>{formatCurrency(itinerary.totalCost)}</span>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Notes */}
        {itinerary.notes && (
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">📝 Additional Notes</h2>
            <div className="bg-yellow-50 rounded-lg p-4">
              <p className="text-gray-700">{itinerary.notes}</p>
            </div>
          </section>
        )}

        {/* Footer */}
        <footer className="border-t pt-6 mt-8 text-center text-sm text-gray-500">
          <p>Generated by Tennis Travel Assistant - Professional Tournament Travel Planning</p>
          <p>For support, visit our website or contact our team</p>
        </footer>
      </div>
    </div>
  )
}
