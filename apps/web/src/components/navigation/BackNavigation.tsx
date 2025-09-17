'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Home, ChevronRight } from 'lucide-react'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BackNavigationProps {
  breadcrumbs?: BreadcrumbItem[]
  showBackButton?: boolean
  customBackAction?: () => void
  title?: string
  subtitle?: string
}

export default function BackNavigation({ 
  breadcrumbs = [],
  showBackButton = true,
  customBackAction,
  title,
  subtitle
}: BackNavigationProps) {
  const router = useRouter()

  const handleBack = () => {
    if (customBackAction) {
      customBackAction()
    } else {
      router.back()
    }
  }

  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4 min-w-0 flex-1">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                title="Volver atrás"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}

            {/* Breadcrumbs */}
            {breadcrumbs.length > 0 && (
              <nav className="flex items-center space-x-1 text-sm overflow-hidden">
                <Link 
                  href="/" 
                  className="text-gray-500 hover:text-gray-700 transition-colors flex-shrink-0"
                >
                  <Home className="w-4 h-4" />
                </Link>
                
                {breadcrumbs.map((item, index) => (
                  <div key={index} className="flex items-center space-x-1 min-w-0">
                    <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    {item.href ? (
                      <Link 
                        href={item.href}
                        className="text-gray-500 hover:text-gray-700 transition-colors truncate"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="text-gray-900 font-medium truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                ))}
              </nav>
            )}

            {/* Title */}
            {title && (
              <div className="min-w-0 flex-1">
                <h1 className="text-lg font-semibold text-gray-900 truncate">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-sm text-gray-600 truncate">
                    {subtitle}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="flex items-center space-x-2 flex-shrink-0">
            <Link
              href="/search"
              className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Nueva Búsqueda
            </Link>
            <Link
              href="/dashboard"
              className="hidden sm:inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Mi Dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

// Hook personalizado para generar breadcrumbs automáticamente
export function useBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []

  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/')
    
    // Personalizar labels según la ruta
    let label = segment
    switch (segment) {
      case 'search':
        label = 'Búsqueda'
        break
      case 'results':
        label = 'Resultados'
        break
      case 'compare':
        label = 'Comparar'
        break
      case 'dashboard':
        label = 'Dashboard'
        break
      case 'tournament':
        label = 'Torneo'
        break
      case 'about':
        label = 'Acerca de'
        break
      case 'privacy':
        label = 'Privacidad'
        break
      case 'terms':
        label = 'Términos'
        break
      default:
        // Para IDs dinámicos, capitalizar primera letra
        label = segment.charAt(0).toUpperCase() + segment.slice(1)
    }

    // El último elemento no debe ser clickeable
    if (index === segments.length - 1) {
      breadcrumbs.push({ label })
    } else {
      breadcrumbs.push({ label, href })
    }
  })

  return breadcrumbs
}
