-- Migration: Add external API support to tournaments table
-- Run this in your Supabase SQL Editor

-- Add columns for external API integration
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS external_api_id TEXT;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS data_source TEXT DEFAULT 'manual';
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS last_synced TIMESTAMP WITH TIME ZONE;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS api_raw_data JSONB;

-- Create index for external API lookups
CREATE INDEX IF NOT EXISTS idx_tournaments_external_api_id ON tournaments(external_api_id);
CREATE INDEX IF NOT EXISTS idx_tournaments_data_source ON tournaments(data_source);
CREATE INDEX IF NOT EXISTS idx_tournaments_last_synced ON tournaments(last_synced);

-- Add unique constraint to prevent duplicate external IDs
ALTER TABLE tournaments ADD CONSTRAINT unique_external_api_id UNIQUE (external_api_id, data_source);

-- Create sync log table
CREATE TABLE IF NOT EXISTS api_sync_logs (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  data_source TEXT NOT NULL,
  sync_type TEXT NOT NULL, -- 'full', 'incremental', 'tournament_specific'
  status TEXT NOT NULL, -- 'success', 'failed', 'partial'
  records_processed INTEGER DEFAULT 0,
  records_updated INTEGER DEFAULT 0,
  records_created INTEGER DEFAULT 0,
  error_message TEXT,
  sync_started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  sync_completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for sync logs
CREATE INDEX IF NOT EXISTS idx_sync_logs_data_source ON api_sync_logs(data_source);
CREATE INDEX IF NOT EXISTS idx_sync_logs_status ON api_sync_logs(status);
CREATE INDEX IF NOT EXISTS idx_sync_logs_created_at ON api_sync_logs(created_at);

-- Function to log sync operations
CREATE OR REPLACE FUNCTION log_api_sync(
  p_data_source TEXT,
  p_sync_type TEXT,
  p_status TEXT,
  p_records_processed INTEGER DEFAULT 0,
  p_records_updated INTEGER DEFAULT 0,
  p_records_created INTEGER DEFAULT 0,
  p_error_message TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
  log_id UUID;
BEGIN
  INSERT INTO api_sync_logs (
    data_source,
    sync_type,
    status,
    records_processed,
    records_updated,
    records_created,
    error_message,
    sync_completed_at
  ) VALUES (
    p_data_source,
    p_sync_type,
    p_status,
    p_records_processed,
    p_records_updated,
    p_records_created,
    p_error_message,
    NOW()
  ) RETURNING id INTO log_id;
  
  RETURN log_id;
END;
$$ LANGUAGE plpgsql;

-- Update existing manual tournaments to have proper data source
UPDATE tournaments 
SET data_source = 'manual' 
WHERE data_source IS NULL;

-- Comment for reference
COMMENT ON COLUMN tournaments.external_api_id IS 'ID from external API (ATP, WTA, ITF, etc.)';
COMMENT ON COLUMN tournaments.data_source IS 'Source of tournament data: manual, atp_api, wta_api, itf_api, sportsdb, rapidapi';
COMMENT ON COLUMN tournaments.last_synced IS 'Last time this tournament was updated from external API';
COMMENT ON COLUMN tournaments.api_raw_data IS 'Raw JSON data from external API for reference';
