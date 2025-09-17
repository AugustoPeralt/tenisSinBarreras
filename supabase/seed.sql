-- Insert sample tournaments
INSERT INTO tournaments (name, city, country, start_date, end_date, category, surface, venue_address) VALUES
('French Open', 'Paris', 'France', '2025-05-26', '2025-06-08', 'Grand Slam', 'Clay', 'Stade Roland Garros, 2 Avenue Gordon Bennett, 75016 Paris'),
('Wimbledon', 'London', 'England', '2025-06-30', '2025-07-13', 'Grand Slam', 'Grass', 'All England Lawn Tennis Club, Church Rd, Wimbledon, London SW19 5AE'),
('US Open', 'New York', 'USA', '2025-08-25', '2025-09-07', 'Grand Slam', 'Hard', 'USTA Billie Jean King National Tennis Center, Flushing Meadows Corona Park, Queens, NY 11368'),
('Australian Open', 'Melbourne', 'Australia', '2025-01-13', '2025-01-26', 'Grand Slam', 'Hard', 'Melbourne Park, Olympic Blvd, Melbourne VIC 3000, Australia'),
('Monte-Carlo Masters', 'Monte Carlo', 'Monaco', '2025-04-12', '2025-04-20', 'ATP Masters 1000', 'Clay', 'Monte Carlo Country Club, 155 Avenue Princesse Grace, 06190 Roquebrune-Cap-Martin'),
('Madrid Open', 'Madrid', 'Spain', '2025-04-26', '2025-05-04', 'ATP Masters 1000', 'Clay', 'Caja Mágica, Camino de Perales, 23, 28041 Madrid'),
('Indian Wells Masters', 'Indian Wells', 'USA', '2025-03-06', '2025-03-16', 'ATP Masters 1000', 'Hard', 'Indian Wells Tennis Garden, 78200 Miles Ave, Indian Wells, CA 92210'),
('Miami Open', 'Miami', 'USA', '2025-03-19', '2025-03-30', 'ATP Masters 1000', 'Hard', 'Hard Rock Stadium, 347 Don Shula Dr, Miami Gardens, FL 33056'),
('Rome Masters', 'Rome', 'Italy', '2025-05-10', '2025-05-18', 'ATP Masters 1000', 'Clay', 'Foro Italico, Viale dei Gladiatori, 00135 Roma RM, Italy'),
('Canada Masters', 'Toronto', 'Canada', '2025-08-04', '2025-08-10', 'ATP Masters 1000', 'Hard', 'Sobeys Stadium, 1 Shoreham Dr, Toronto, ON M3N 3A6, Canada'),

-- WTA tournaments
('Dubai Tennis Championships', 'Dubai', 'UAE', '2025-02-17', '2025-02-22', 'WTA 1000', 'Hard', 'Dubai Duty Free Tennis Stadium, Garhoud, Dubai'),
('Qatar Open', 'Doha', 'Qatar', '2025-02-10', '2025-02-15', 'WTA 1000', 'Hard', 'Khalifa International Tennis and Squash Complex, Doha'),
('Charleston Open', 'Charleston', 'USA', '2025-04-06', '2025-04-13', 'WTA 500', 'Clay', 'Credit One Stadium, 161 Seven Farms Dr, Charleston, SC 29492'),

-- ITF tournaments
('ITF Buenos Aires', 'Buenos Aires', 'Argentina', '2025-03-03', '2025-03-09', 'ITF W60', 'Clay', 'Club Atletico San Isidro, Buenos Aires'),
('ITF Prague', 'Prague', 'Czech Republic', '2025-04-21', '2025-04-27', 'ITF W80', 'Clay', 'TK Sparta Praha, Prague'),
('ITF Cancun', 'Cancun', 'Mexico', '2025-05-05', '2025-05-11', 'ITF W25', 'Hard', 'Cancun Tennis Club, Cancun');

-- Update tournaments with approximate venue locations (lat, lng)
UPDATE tournaments SET venue_location = POINT(2.2509, 48.8467) WHERE name = 'French Open';
UPDATE tournaments SET venue_location = POINT(-0.2145, 51.4341) WHERE name = 'Wimbledon';  
UPDATE tournaments SET venue_location = POINT(-73.8448, 40.7501) WHERE name = 'US Open';
UPDATE tournaments SET venue_location = POINT(144.9631, -37.8136) WHERE name = 'Australian Open';
UPDATE tournaments SET venue_location = POINT(7.4386, 43.7494) WHERE name = 'Monte-Carlo Masters';
UPDATE tournaments SET venue_location = POINT(-3.6838, 40.3947) WHERE name = 'Madrid Open';
UPDATE tournaments SET venue_location = POINT(-116.2920, 33.7175) WHERE name = 'Indian Wells Masters';
UPDATE tournaments SET venue_location = POINT(-80.2389, 25.9581) WHERE name = 'Miami Open';
UPDATE tournaments SET venue_location = POINT(12.4731, 41.9342) WHERE name = 'Rome Masters';
UPDATE tournaments SET venue_location = POINT(-79.4163, 43.7615) WHERE name = 'Canada Masters';
UPDATE tournaments SET venue_location = POINT(55.2708, 25.2048) WHERE name = 'Dubai Tennis Championships';
UPDATE tournaments SET venue_location = POINT(51.5074, 25.2760) WHERE name = 'Qatar Open';
UPDATE tournaments SET venue_location = POINT(-79.9311, 32.7767) WHERE name = 'Charleston Open';
UPDATE tournaments SET venue_location = POINT(-58.3816, -34.6037) WHERE name = 'ITF Buenos Aires';
UPDATE tournaments SET venue_location = POINT(14.4378, 50.0755) WHERE name = 'ITF Prague';
UPDATE tournaments SET venue_location = POINT(-86.8515, 21.1619) WHERE name = 'ITF Cancun';
