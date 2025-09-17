'use client'

import { usePathname } from 'next/navigation'
import Navbar from './layout/Navbar'
import FloatingActionButton from './navigation/FloatingActionButton'

interface ClientLayoutProps {
  children: React.ReactNode
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname()
  
  // Determinar si mostrar el botón de atrás
  const showBackButton = pathname !== '/' && pathname !== '/dashboard' && pathname !== '/search'
  
  return (
    <>
      <Navbar />
      {children}
      <FloatingActionButton 
        showBackButton={showBackButton}
        currentPage={pathname}
      />
    </>
  )
}
