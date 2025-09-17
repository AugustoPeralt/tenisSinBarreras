'use client'

import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User, Mail, Lock, Trophy } from 'lucide-react'

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const supabase = createClientComponentClient()

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        setMessage('¡Inicio de sesión exitoso!')
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              name,
            },
          },
        })
        if (error) throw error
        setMessage('¡Registro exitoso! Revisa tu email para confirmar.')
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Error en autenticación')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-tennis-50 to-tennis-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        {/* Header */}
        <div className="text-center">
          <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trophy className="h-8 w-8 text-primary-600" />
          </div>
          <h2 className="text-3xl font-bold text-tennis-900">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
          </h2>
          <p className="text-tennis-600 mt-2">
            {isLogin 
              ? 'Accede a tu cuenta de Tennis Travel' 
              : 'Crea tu cuenta para planificar viajes'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="space-y-6">
          {!isLogin && (
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-tennis-700">
                Nombre completo
              </label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-3 h-5 w-5 text-tennis-400" />
                <input
                  id="name"
                  type="text"
                  required={!isLogin}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="search-input pl-10"
                  placeholder="Tu nombre completo"
                />
              </div>
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-tennis-700">
              Email
            </label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-tennis-400" />
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="search-input pl-10"
                placeholder="tu@email.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-tennis-700">
              Contraseña
            </label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-tennis-400" />
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="search-input pl-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          {message && (
            <div className={`text-sm text-center p-3 rounded-lg ${
              message.includes('exitoso') 
                ? 'bg-green-100 text-green-800' 
                : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-500 text-white py-3 px-4 rounded-lg hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
          >
            {loading 
              ? 'Procesando...' 
              : isLogin 
                ? 'Iniciar Sesión' 
                : 'Registrarse'
            }
          </button>
        </form>

        {/* Toggle */}
        <div className="text-center">
          <button
            onClick={() => {
              setIsLogin(!isLogin)
              setMessage('')
            }}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            {isLogin 
              ? '¿No tienes cuenta? Regístrate' 
              : '¿Ya tienes cuenta? Inicia sesión'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
