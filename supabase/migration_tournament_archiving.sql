-- Enhanced tournament schema for archiving and filtering
-- Add this to your existing migration

-- Add status and archiving columns
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'ongoing', 'completed', 'cancelled'));
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS archived_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS tournament_level TEXT; -- 'Grand Slam', 'Masters 1000', 'ATP 500', etc.
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS prize_money INTEGER; -- Prize money in USD
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS draw_size INTEGER; -- Number of players in main draw
ALTER TABLE tournaments ADD COLUMN IF NOT EXISTS tour_category TEXT; -- 'ATP', 'WTA', 'ITF', 'Challenger'

-- Create indexes for filtering
CREATE INDEX IF NOT EXISTS idx_tournaments_status ON tournaments(status);
CREATE INDEX IF NOT EXISTS idx_tournaments_date_range ON tournaments(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_tournaments_tour_category ON tournaments(tour_category);
CREATE INDEX IF NOT EXISTS idx_tournaments_level ON tournaments(tournament_level);

-- View for upcoming tournaments (UI optimization)
CREATE OR REPLACE VIEW upcoming_tournaments AS
SELECT * FROM tournaments 
WHERE start_date >= CURRENT_DATE 
  AND start_date <= CURRENT_DATE + INTERVAL '30 days'
  AND status IN ('upcoming', 'ongoing')
ORDER BY start_date ASC;

-- View for this week's tournaments
CREATE OR REPLACE VIEW this_week_tournaments AS
SELECT * FROM tournaments 
WHERE start_date >= CURRENT_DATE 
  AND start_date <= CURRENT_DATE + INTERVAL '7 days'
  AND status IN ('upcoming', 'ongoing')
ORDER BY start_date ASC;

-- Function to archive completed tournaments
CREATE OR REPLACE FUNCTION archive_completed_tournaments()
RETURNS TABLE(archived_count INTEGER) AS $$
DECLARE
  count_archived INTEGER;
BEGIN
  UPDATE tournaments 
  SET status = 'completed', 
      archived_at = NOW()
  WHERE end_date < CURRENT_DATE - INTERVAL '3 days'
    AND status != 'completed';
  
  GET DIAGNOSTICS count_archived = ROW_COUNT;
  
  RETURN QUERY SELECT count_archived;
END;
$$ LANGUAGE plpgsql;

-- Function to get tournament statistics
CREATE OR REPLACE FUNCTION get_tournament_stats()
RETURNS TABLE(
  upcoming_count INTEGER,
  ongoing_count INTEGER,
  completed_count INTEGER,
  total_count INTEGER,
  next_tournament_date DATE
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    (SELECT COUNT(*)::INTEGER FROM tournaments WHERE status = 'upcoming'),
    (SELECT COUNT(*)::INTEGER FROM tournaments WHERE status = 'ongoing'),
    (SELECT COUNT(*)::INTEGER FROM tournaments WHERE status = 'completed'),
    (SELECT COUNT(*)::INTEGER FROM tournaments),
    (SELECT MIN(start_date) FROM tournaments WHERE status = 'upcoming' AND start_date >= CURRENT_DATE);
END;
$$ LANGUAGE plpgsql;

-- Update existing tournaments with proper categories
UPDATE tournaments SET tour_category = 'ATP' WHERE category LIKE '%ATP%' OR category LIKE '%Masters%';
UPDATE tournaments SET tour_category = 'WTA' WHERE category LIKE '%WTA%';
UPDATE tournaments SET tour_category = 'Grand Slam' WHERE category LIKE '%Grand Slam%';
UPDATE tournaments SET tour_category = 'ITF' WHERE category LIKE '%ITF%';

-- Set tournament levels
UPDATE tournaments SET tournament_level = 'Grand Slam' WHERE category = 'Grand Slam';
UPDATE tournaments SET tournament_level = 'Masters 1000' WHERE category LIKE '%Masters 1000%' OR category LIKE '%ATP Masters 1000%';
UPDATE tournaments SET tournament_level = 'WTA 1000' WHERE category = 'WTA 1000';
UPDATE tournaments SET tournament_level = 'ATP 500' WHERE category = 'WTA 500';
UPDATE tournaments SET tournament_level = 'ITF' WHERE category LIKE '%ITF%';

-- Set reasonable draw sizes and prize money for existing tournaments
UPDATE tournaments SET 
  draw_size = CASE 
    WHEN tournament_level = 'Grand Slam' THEN 128
    WHEN tournament_level LIKE '%1000%' THEN 96
    WHEN tournament_level LIKE '%500%' THEN 48
    ELSE 32
  END,
  prize_money = CASE 
    WHEN tournament_level = 'Grand Slam' THEN 50000000
    WHEN tournament_level LIKE '%1000%' THEN 8000000
    WHEN tournament_level LIKE '%500%' THEN 2000000
    ELSE 500000
  END
WHERE draw_size IS NULL;

COMMENT ON VIEW upcoming_tournaments IS 'Optimized view for UI - only tournaments in next 30 days';
COMMENT ON FUNCTION archive_completed_tournaments() IS 'Archives tournaments that ended more than 3 days ago';
COMMENT ON COLUMN tournaments.tour_category IS 'Main tour: ATP, WTA, ITF, Challenger';
COMMENT ON COLUMN tournaments.tournament_level IS 'Tournament tier: Grand Slam, Masters 1000, ATP 500, etc.';
