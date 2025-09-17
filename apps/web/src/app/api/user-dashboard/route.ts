import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

// API Route: /api/user-dashboard
// Purpose: Provide personalized user data for dashboard

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user's favorite tournaments
    const { data: favorites, error: favError } = await supabase
      .from('user_favorites')
      .select(`
        tournament_id,
        tournaments (
          id,
          name,
          city,
          country,
          start_date,
          end_date,
          category,
          surface
        )
      `)
      .eq('user_id', user.id)

    // Get user's recent searches
    const { data: searches, error: searchError } = await supabase
      .from('search_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(5)

    // Get user's bookings
    const { data: bookings, error: bookingError } = await supabase
      .from('user_bookings')
      .select(`
        id,
        tournament_id,
        booking_type,
        status,
        created_at,
        tournaments (
          name,
          city,
          start_date
        )
      `)
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    // Calculate user statistics
    const stats = {
      favoriteCount: favorites?.length || 0,
      searchCount: searches?.length || 0,
      bookingCount: bookings?.length || 0,
      upcomingTournaments: favorites?.filter((f: any) => 
        f.tournaments && new Date(f.tournaments.start_date) > new Date()
      ).length || 0
    }

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.user_metadata?.name || 'Tennis Player',
        avatar: user.user_metadata?.avatar_url
      },
      stats,
      favorites: favorites?.map(f => f.tournaments) || [],
      recentSearches: searches || [],
      bookings: bookings || []
    })

  } catch (error) {
    console.error('Dashboard API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST: Add tournament to favorites
export async function POST(request: NextRequest) {
  try {
    const { tournamentId, action } = await request.json()
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Get current user
    const { data: { user }, error: userError } = await supabase.auth.getUser()
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    if (action === 'add_favorite') {
      const { error } = await supabase
        .from('user_favorites')
        .insert({
          user_id: user.id,
          tournament_id: tournamentId
        })

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ success: true, message: 'Added to favorites' })
    }

    if (action === 'remove_favorite') {
      const { error } = await supabase
        .from('user_favorites')
        .delete()
        .eq('user_id', user.id)
        .eq('tournament_id', tournamentId)

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 })
      }

      return NextResponse.json({ success: true, message: 'Removed from favorites' })
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 })

  } catch (error) {
    console.error('Dashboard POST error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
