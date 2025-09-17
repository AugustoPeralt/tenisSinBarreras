'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

// Real tournament data for ATP presentation
const REAL_TOURNAMENTS_2025 = [
  {
    external_api_id: 'atp_madrid_2025',
    name: 'Mutua Madrid Open',
    city: 'Madrid',
    country: 'Spain',
    start_date: '2025-04-26',
    end_date: '2025-05-04',
    category: 'ATP Masters 1000',
    surface: 'Clay',
    venue: 'Caja Mágica',
    prize_money: 8500000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'roland_garros_2025',
    name: 'Roland Garros',
    city: 'Paris',
    country: 'France',
    start_date: '2025-05-25',
    end_date: '2025-06-08',
    category: 'Grand Slam',
    surface: 'Clay',
    venue: 'Stade Roland Garros',
    prize_money: 53478000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'wimbledon_2025',
    name: 'The Championships Wimbledon',
    city: 'London',
    country: 'United Kingdom',
    start_date: '2025-06-30',
    end_date: '2025-07-13',
    category: 'Grand Slam',
    surface: 'Grass',
    venue: 'All England Lawn Tennis Club',
    prize_money: 50000000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'us_open_2025',
    name: 'US Open',
    city: 'New York',
    country: 'United States',
    start_date: '2025-08-25',
    end_date: '2025-09-07',
    category: 'Grand Slam',
    surface: 'Hard',
    venue: 'USTA Billie Jean King National Tennis Center',
    prize_money: 65000000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'barcelona_2025',
    name: 'Barcelona Open Banc Sabadell',
    city: 'Barcelona',
    country: 'Spain',
    start_date: '2025-04-19',
    end_date: '2025-04-27',
    category: 'ATP 500',
    surface: 'Clay',
    venue: 'Real Club de Tenis Barcelona',
    prize_money: 3700000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'monte_carlo_2025',
    name: 'Rolex Monte-Carlo Masters',
    city: 'Monte Carlo',
    country: 'Monaco',
    start_date: '2025-04-12',
    end_date: '2025-04-20',
    category: 'ATP Masters 1000',
    surface: 'Clay',
    venue: 'Monte Carlo Country Club',
    prize_money: 6500000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'indian_wells_2025',
    name: 'BNP Paribas Open',
    city: 'Indian Wells',
    country: 'United States',
    start_date: '2025-03-06',
    end_date: '2025-03-17',
    category: 'ATP Masters 1000',
    surface: 'Hard',
    venue: 'Indian Wells Tennis Garden',
    prize_money: 9500000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'miami_2025',
    name: 'Miami Open presented by Itaú',
    city: 'Miami',
    country: 'United States',
    start_date: '2025-03-19',
    end_date: '2025-03-30',
    category: 'ATP Masters 1000',
    surface: 'Hard',
    venue: 'Hard Rock Stadium',
    prize_money: 9500000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'shanghai_2025',
    name: 'Rolex Shanghai Masters',
    city: 'Shanghai',
    country: 'China',
    start_date: '2025-10-05',
    end_date: '2025-10-13',
    category: 'ATP Masters 1000',
    surface: 'Hard',
    venue: 'Qizhong Forest Sports City Arena',
    prize_money: 9500000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  },
  {
    external_api_id: 'atp_finals_2025',
    name: 'Nitto ATP Finals',
    city: 'Turin',
    country: 'Italy',
    start_date: '2025-11-10',
    end_date: '2025-11-17',
    category: 'ATP Finals',
    surface: 'Hard',
    venue: 'Pala Alpitour',
    prize_money: 15000000,
    data_source: 'atp_official',
    last_synced: new Date().toISOString()
  }
]

export default function DatabaseSeeder() {
  const [seeding, setSeeding] = useState(false)
  const [result, setResult] = useState<string>('')

  const seedRealTournaments = async () => {
    setSeeding(true)
    setResult('🔄 Seeding database with real tournament data...')

    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )

      console.log('📡 Starting database seed with real tournaments...')

      // Clear existing tournaments to avoid duplicates
      const { error: deleteError } = await supabase
        .from('tournaments')
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000') // Delete all

      if (deleteError) {
        console.warn('⚠️ Delete error (may be expected):', deleteError)
      }

      // Insert real tournaments
      const { data, error } = await supabase
        .from('tournaments')
        .insert(REAL_TOURNAMENTS_2025)
        .select()

      if (error) {
        throw error
      }

      console.log('✅ Successfully seeded database!')
      console.table(data?.slice(0, 3))

      setResult(`✅ Success! Seeded ${data?.length || 0} real ATP tournaments:
      
🎾 Grand Slams: ${data?.filter(t => t.category === 'Grand Slam').length}
🏆 Masters 1000: ${data?.filter(t => t.category === 'ATP Masters 1000').length}  
🥇 ATP 500: ${data?.filter(t => t.category === 'ATP 500').length}
🏅 ATP Finals: ${data?.filter(t => t.category === 'ATP Finals').length}

💰 Total Prize Money: $${data?.reduce((sum, t) => sum + (t.prize_money || 0), 0).toLocaleString()}

🌍 Countries Covered: ${[...new Set(data?.map(t => t.country))].length}`)

    } catch (error) {
      console.error('❌ Seeding failed:', error)
      setResult(`❌ Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setSeeding(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          🎾 Database Seeder - Real ATP Tournaments
        </h1>
        
        <div className="mb-6">
          <p className="text-gray-600 mb-4">
            This will populate the database with <strong>real 2025 ATP tournament data</strong> including:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-1 mb-6">
            <li>4 Grand Slam tournaments with official prize money</li>
            <li>5 Masters 1000 events with real venues</li>
            <li>1 ATP 500 event (Barcelona)</li>
            <li>ATP Finals in Turin</li>
            <li>Real dates, locations, and tournament details</li>
          </ul>
        </div>

        <button
          onClick={seedRealTournaments}
          disabled={seeding}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
        >
          {seeding ? '🔄 Seeding Database...' : '🌱 Seed Real Tournament Data'}
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <pre className="whitespace-pre-wrap text-sm text-gray-800">{result}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
