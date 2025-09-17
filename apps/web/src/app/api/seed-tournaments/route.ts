import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase';

const realTournaments = [
  {
    id: 'rg2025',
    name: 'Roland Garros',
    category: 'Grand Slam',
    surface: 'Clay',
    draw_size: 128,
    prize_money: 53478000,
    start_date: '2025-05-26',
    end_date: '2025-06-08',
    location: 'Paris, France',
    venue: 'Stade Roland Garros',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'wimbledon2025',
    name: 'Wimbledon',
    category: 'Grand Slam',
    surface: 'Grass',
    draw_size: 128,
    prize_money: 50000000,
    start_date: '2025-06-30',
    end_date: '2025-07-13',
    location: 'London, England',
    venue: 'All England Lawn Tennis Club',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'usopen2025',
    name: 'US Open',
    category: 'Grand Slam',
    surface: 'Hard',
    draw_size: 128,
    prize_money: 65000000,
    start_date: '2025-08-25',
    end_date: '2025-09-07',
    location: 'New York, USA',
    venue: 'USTA Billie Jean King National Tennis Center',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'ausopen2025',
    name: 'Australian Open',
    category: 'Grand Slam',
    surface: 'Hard',
    draw_size: 128,
    prize_money: 62500000,
    start_date: '2025-01-13',
    end_date: '2025-01-26',
    location: 'Melbourne, Australia',
    venue: 'Melbourne Park',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'indianwells2025',
    name: 'BNP Paribas Open',
    category: 'Masters 1000',
    surface: 'Hard',
    draw_size: 96,
    prize_money: 18500000,
    start_date: '2025-03-06',
    end_date: '2025-03-17',
    location: 'Indian Wells, USA',
    venue: 'Indian Wells Tennis Garden',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'miami2025',
    name: 'Miami Open',
    category: 'Masters 1000',
    surface: 'Hard',
    draw_size: 96,
    prize_money: 17000000,
    start_date: '2025-03-19',
    end_date: '2025-03-30',
    location: 'Miami, USA',
    venue: 'Hard Rock Stadium',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'montecarlo2025',
    name: 'Monte-Carlo Masters',
    category: 'Masters 1000',
    surface: 'Clay',
    draw_size: 56,
    prize_money: 6240000,
    start_date: '2025-04-12',
    end_date: '2025-04-20',
    location: 'Monte Carlo, Monaco',
    venue: 'Monte Carlo Country Club',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'madrid2025',
    name: 'Mutua Madrid Open',
    category: 'Masters 1000',
    surface: 'Clay',
    draw_size: 56,
    prize_money: 8800000,
    start_date: '2025-04-26',
    end_date: '2025-05-04',
    location: 'Madrid, Spain',
    venue: 'Caja Magica',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'rome2025',
    name: 'Italian Open',
    category: 'Masters 1000',
    surface: 'Clay',
    draw_size: 56,
    prize_money: 8000000,
    start_date: '2025-05-10',
    end_date: '2025-05-18',
    location: 'Rome, Italy',
    venue: 'Foro Italico',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: 'canada2025',
    name: 'Rogers Cup',
    category: 'Masters 1000',
    surface: 'Hard',
    draw_size: 56,
    prize_money: 6240000,
    start_date: '2025-08-04',
    end_date: '2025-08-10',
    location: 'Toronto, Canada',
    venue: 'Aviva Centre',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient();
    
    console.log('🌱 Starting tournament seeding...');
    
    // Clear existing tournaments
    const { error: deleteError } = await supabase
      .from('tournaments')
      .delete()
      .gt('created_at', '1900-01-01'); // Delete all existing tournaments
    
    if (deleteError) {
      console.error('❌ Error clearing tournaments:', deleteError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to clear existing tournaments',
        details: deleteError.message 
      }, { status: 500 });
    }
    
    console.log('✅ Cleared existing tournaments');
    
    // Insert new tournaments
    const { data, error: insertError } = await supabase
      .from('tournaments')
      .insert(realTournaments)
      .select();
    
    if (insertError) {
      console.error('❌ Error inserting tournaments:', insertError);
      return NextResponse.json({ 
        success: false, 
        error: 'Failed to insert tournaments',
        details: insertError.message 
      }, { status: 500 });
    }
    
    console.log('✅ Successfully seeded tournaments:', data?.length);
    
    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${data?.length} tournaments`,
      tournaments: data?.map(t => ({ name: t.name, category: t.category, location: t.location }))
    });
    
  } catch (error) {
    console.error('❌ Seeding error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
