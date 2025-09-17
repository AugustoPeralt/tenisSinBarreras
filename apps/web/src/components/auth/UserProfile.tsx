'use client'

import { useState, useEffect } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import { User as UserIcon, LogOut, Settings, Trophy, Calendar, Heart } from 'lucide-react'
import Link from 'next/link'

interface UserProfileProps {
  user: User | null
  onSignOut: () => void
}

export default function UserProfile({ user, onSignOut }: UserProfileProps) {
  const [loading, setLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  if (!user) return null

  const handleSignOut = async () => {
    setLoading(true)
    await onSignOut()
    setLoading(false)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      {/* User Avatar Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <UserIcon className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-gray-700 hidden md:block">
          {user.user_metadata?.name || user.email?.split('@')[0]}
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          {/* User Info */}
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <UserIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="font-medium text-gray-900">
                  {user.user_metadata?.name || 'Tennis Player'}
                </p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Trophy className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
            
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Heart className="w-4 h-4" />
              <span>Favoritos</span>
            </Link>
            
            <Link
              href="/search"
              className="flex items-center space-x-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              <Calendar className="w-4 h-4" />
              <span>Mis Búsquedas</span>
            </Link>
            
            <div className="border-t border-gray-100 mt-2 pt-2">
              <button
                onClick={handleSignOut}
                disabled={loading}
                className="flex items-center space-x-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left disabled:opacity-50"
              >
                <LogOut className="w-4 h-4" />
                <span>{loading ? 'Cerrando...' : 'Cerrar Sesión'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
