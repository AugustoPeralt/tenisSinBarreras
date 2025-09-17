import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const createClient = () => createClientComponentClient()

// Test function to verify connection
export async function testSupabaseConnection() {
  const supabase = createClient()
  
  try {
    // First check: Can we connect and get any data?
    const { data, error } = await supabase
      .from('tournaments')
      .select('name, city, country, start_date, end_date')
      .limit(5)
    
    if (error) {
      console.error('Supabase error:', error)
      return { success: false, error }
    }
    
    console.log('Supabase connected successfully:', data)
    
    // Additional debug: show all tournament dates
    const { data: allTournaments } = await supabase
      .from('tournaments')
      .select('name, start_date, end_date')
      .order('start_date')
    
    console.log('📅 All tournaments in database:', allTournaments)
    
    return { success: true, data }
  } catch (error) {
    console.error('Connection failed:', error)
    return { success: false, error }
  }
}
