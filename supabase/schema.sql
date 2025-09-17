-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- Players table
CREATE TABLE players (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  ranking INTEGER,
  category TEXT CHECK (category IN ('ATP', 'WTA', 'ITF', 'Junior', 'Amateur')) NOT NULL,
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tournaments table
CREATE TABLE tournaments (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  city TEXT NOT NULL,
  country TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  category TEXT NOT NULL,
  surface TEXT CHECK (surface IN ('Clay', 'Grass', 'Hard', 'Carpet')) NOT NULL,
  venue_location POINT,
  venue_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bookings table
CREATE TABLE bookings (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  flight_data JSONB,
  hotel_data JSONB,
  total_price_amount DECIMAL(10,2),
  total_price_currency TEXT DEFAULT 'USD',
  status TEXT CHECK (status IN ('pending', 'confirmed', 'cancelled')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Search history table
CREATE TABLE search_history (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  tournament_id UUID REFERENCES tournaments(id),
  search_params JSONB NOT NULL,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Price alerts table
CREATE TABLE price_alerts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  tournament_id UUID REFERENCES tournaments(id) ON DELETE CASCADE,
  max_price_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_tournaments_dates ON tournaments(start_date, end_date);
CREATE INDEX idx_tournaments_category ON tournaments(category);
CREATE INDEX idx_tournaments_location ON tournaments USING GIST(venue_location);
CREATE INDEX idx_bookings_player ON bookings(player_id);
CREATE INDEX idx_bookings_tournament ON bookings(tournament_id);
CREATE INDEX idx_search_history_player ON search_history(player_id);
CREATE INDEX idx_price_alerts_active ON price_alerts(is_active) WHERE is_active = TRUE;

-- Row Level Security (RLS) policies
ALTER TABLE players ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE search_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE price_alerts ENABLE ROW LEVEL SECURITY;

-- Players can only see and modify their own data
CREATE POLICY "Players can view own profile" ON players
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Players can update own profile" ON players
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Players can insert own profile" ON players
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Bookings policies
CREATE POLICY "Players can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Players can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = player_id);

CREATE POLICY "Players can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = player_id);

-- Search history policies
CREATE POLICY "Players can view own search history" ON search_history
  FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Players can create own search history" ON search_history
  FOR INSERT WITH CHECK (auth.uid() = player_id);

-- Price alerts policies
CREATE POLICY "Players can manage own price alerts" ON price_alerts
  FOR ALL USING (auth.uid() = player_id);

-- Tournaments are public (no RLS needed)
-- Allow public read access to tournaments
CREATE POLICY "Anyone can view tournaments" ON tournaments
  FOR SELECT USING (TRUE);

-- Functions for updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add triggers for updated_at
CREATE TRIGGER update_players_updated_at BEFORE UPDATE ON players
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tournaments_updated_at BEFORE UPDATE ON tournaments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_price_alerts_updated_at BEFORE UPDATE ON price_alerts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
