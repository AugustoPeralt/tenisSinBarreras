'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  Home, 
  Search, 
  BarChart3, 
  ArrowLeft,
  Heart,
  Calendar,
  MapPin
} from 'lucide-react'

interface FloatingActionButtonProps {
  showBackButton?: boolean
  currentPage?: string
}

export default function FloatingActionButton({ 
  showBackButton = true, 
  currentPage = '' 
}: FloatingActionButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const quickActions = [
    {
      icon: Home,
      label: 'Inicio',
      href: '/',
      color: 'bg-blue-500 hover:bg-blue-600'
    },
    {
      icon: Search,
      label: 'Buscar',
      href: '/search',
      color: 'bg-green-500 hover:bg-green-600'
    },
    {
      icon: BarChart3,
      label: 'Dashboard',
      href: '/dashboard',
      color: 'bg-purple-500 hover:bg-purple-600'
    },
    {
      icon: Heart,
      label: 'Favoritos',
      href: '/dashboard?tab=favorites',
      color: 'bg-red-500 hover:bg-red-600'
    }
  ]

  const handleBack = () => {
    router.back()
  }

  // No mostrar en móviles muy pequeños para evitar interferir con la UI
  if (typeof window !== 'undefined' && window.innerWidth < 640) {
    return null
  }

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* FAB Container */}
      <div className="fixed bottom-6 right-6 z-50">
        {/* Quick Action Buttons */}
        {isOpen && (
          <div className="mb-4 space-y-3">
            {quickActions.map((action, index) => (
              <div
                key={action.href}
                className="transform transition-all duration-200"
                style={{
                  transform: `translateY(${isOpen ? 0 : 20}px)`,
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: `${index * 50}ms`
                }}
              >
                <Link
                  href={action.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-3 ${action.color} text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 group`}
                >
                  <action.icon className="w-5 h-5" />
                  <span className="text-sm font-medium pr-2">{action.label}</span>
                </Link>
              </div>
            ))}
            
            {/* Back Button */}
            {showBackButton && (
              <div
                className="transform transition-all duration-200"
                style={{
                  transform: `translateY(${isOpen ? 0 : 20}px)`,
                  opacity: isOpen ? 1 : 0,
                  transitionDelay: `${quickActions.length * 50}ms`
                }}
              >
                <button
                  onClick={() => {
                    handleBack()
                    setIsOpen(false)
                  }}
                  className="flex items-center space-x-3 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium pr-2">Atrás</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Main FAB Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center group ${
            isOpen ? 'rotate-45' : ''
          }`}
          title="Navegación rápida"
        >
          <Plus className={`w-6 h-6 transition-transform duration-200 ${isOpen ? 'rotate-45' : ''}`} />
        </button>

        {/* Tooltip cuando está cerrado */}
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
            Navegación rápida
            <div className="absolute top-full right-3 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
      </div>
    </>
  )
}

// Hook para detectar la página actual y personalizar el FAB
export function usePageDetection() {
  if (typeof window === 'undefined') return ''
  
  const path = window.location.pathname
  
  if (path === '/') return 'home'
  if (path.startsWith('/tournament/')) return 'tournament'
  if (path === '/results') return 'results'
  if (path === '/compare') return 'compare'
  if (path === '/dashboard') return 'dashboard'
  if (path === '/search') return 'search'
  
  return 'other'
}
