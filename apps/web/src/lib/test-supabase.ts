import { createClient } from './supabase';

export async function testSupabaseConnection() {
  const supabase = createClient()
  
  try {
    console.log('🔍 Testing Supabase connection...');
    
    // Test 1: Check if we can connect
    const { data: healthCheck, error: healthError } = await supabase
      .from('tournaments')
      .select('count', { count: 'exact', head: true });
    
    if (healthError) {
      console.error('❌ Connection failed:', healthError);
      return { success: false, error: healthError.message };
    }
    
    console.log('✅ Connection successful!');
    console.log(`📊 Found ${healthCheck} tournaments in database`);
    
    // Test 2: Fetch some actual data
    const { data: tournaments, error: dataError } = await supabase
      .from('tournaments')
      .select('*')
      .limit(3);
    
    if (dataError) {
      console.error('❌ Data fetch failed:', dataError);
      return { success: false, error: dataError.message };
    }
    
    console.log('✅ Data fetch successful!');
    console.log('🎾 Sample tournaments:', tournaments);
    
    return { 
      success: true, 
      count: healthCheck,
      sampleData: tournaments 
    };
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}
