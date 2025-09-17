// API Route for syncing tournament data
import { NextRequest, NextResponse } from 'next/server'
import { syncTournamentsSimple } from '../../../lib/tennis-api'

export async function POST(request: NextRequest) {
  try {
    console.log('🔄 Starting tournament sync...')
    
    const result = await syncTournamentsSimple()
    
    return NextResponse.json(result)
    
  } catch (error) {
    console.error('❌ Sync endpoint failed:', error)
    
    return NextResponse.json({
      success: false,
      message: 'Tournament sync failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

// GET endpoint to test
export async function GET() {
  return NextResponse.json({
    status: 'Tennis API Sync Service',
    endpoints: {
      sync: 'POST /api/sync-tournaments',
      test: 'GET /api/sync-tournaments'
    },
    timestamp: new Date().toISOString()
  })
}
