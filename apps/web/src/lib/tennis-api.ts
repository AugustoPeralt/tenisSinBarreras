// Tennis API Service Layer
import { createClient } from '@supabase/supabase-js'

// Mock tennis tournaments data as fallback
const MOCK_TENNIS_DATA = [
  {
    idLeague: "mock_1",
    strLeague: "ATP Masters 1000 Shanghai",
    strCountry: "China",
    strSport: "Tennis"
  },
  {
    idLeague: "mock_2", 
    strLeague: "WTA Finals",
    strCountry: "Saudi Arabia",
    strSport: "Tennis"
  },
  {
    idLeague: "mock_3",
    strLeague: "ATP Finals",
    strCountry: "Italy", 
    strSport: "Tennis"
  }
]

// Test multiple tennis APIs
export async function testTennisAPI() {
  console.log('🔄 Testing tennis APIs...')
  
  // Try multiple APIs in order of preference
  const apis = [
    {
      name: 'The Sports DB',
      url: 'https://www.thesportsdb.com/api/v1/json/3/search_all_leagues.php?s=Tennis'
    },
    {
      name: 'Mock Data',
      url: null // Will use mock data
    }
  ]
  
  for (const api of apis) {
    try {
      if (api.url) {
        console.log(`🌐 Trying ${api.name}...`)
        
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout
        
        const response = await fetch(api.url, {
          signal: controller.signal,
          headers: {
            'User-Agent': 'TennisApp/1.0'
          }
        })
        
        clearTimeout(timeoutId)
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log(`✅ ${api.name} success:`, data)
        
        return {
          success: true,
          data: data?.leagues || [],
          source: api.name,
          message: `Found ${data?.leagues?.length || 0} tennis leagues from ${api.name}`
        }
      } else {
        // Use mock data
        console.log(`🎭 Using ${api.name}...`)
        return {
          success: true,
          data: MOCK_TENNIS_DATA,
          source: api.name,
          message: `Using ${MOCK_TENNIS_DATA.length} mock tennis tournaments`
        }
      }
    } catch (error) {
      console.warn(`❌ ${api.name} failed:`, error)
      continue // Try next API
    }
  }
  
  return {
    success: false,
    error: 'All tennis APIs failed'
  }
}

// Simple sync function
export async function syncTournamentsSimple() {
  try {
    console.log('🔄 Starting tournament sync...')
    
    // Get data from API
    const apiResult = await testTennisAPI()
    
    if (!apiResult.success) {
      return apiResult
    }
    
    // Create Supabase client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    
    // Transform and save tournaments
    const leagues = apiResult.data.slice(0, 3) // First 3 for testing
    let created = 0
    let updated = 0
    
    console.log(`📝 Processing ${leagues.length} tournaments...`)
    
    for (const league of leagues) {
      try {
        const tournament = {
          external_api_id: league.idLeague,
          name: league.strLeague || 'Tennis Tournament',
          city: 'TBD',
          country: league.strCountry || 'International',
          start_date: '2025-09-15', // Future date so it shows up
          end_date: '2025-09-22',
          category: 'Professional',
          surface: 'Hard',
          data_source: (apiResult.source || 'unknown').toLowerCase().replace(' ', '_'),
          last_synced: new Date().toISOString(),
          api_raw_data: league
        }
        
        console.log('💾 Saving tournament:', tournament.name)
        
        const { data, error } = await supabase
          .from('tournaments')
          .upsert(tournament, { 
            onConflict: 'external_api_id,data_source'
          })
          .select()
        
        if (error) {
          console.error('❌ Database error:', error)
        } else {
          if (data && data.length > 0) {
            created++
          } else {
            updated++
          }
          console.log(`✅ Saved: ${tournament.name}`)
        }
      } catch (err) {
        console.warn('⚠️ Error processing tournament:', err)
      }
    }
    
    return {
      success: true,
      message: `✅ Sync completed from ${apiResult.source}! Processed: ${leagues.length}, Created/Updated: ${created + updated}`,
      source: apiResult.source,
      processed: leagues.length,
      created: created,
      updated: updated
    }
    
  } catch (error) {
    console.error('❌ Sync failed:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}
