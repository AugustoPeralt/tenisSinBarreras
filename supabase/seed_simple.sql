-- Insert sample tournaments (simplified version)
INSERT INTO tournaments (name, city, country, start_date, end_date, category, surface, venue_lat, venue_lng, venue_address) VALUES
('French Open', 'Paris', 'France', '2025-05-26', '2025-06-08', 'Grand Slam', 'Clay', 48.8467, 2.2509, 'Stade Roland Garros, 2 Avenue Gordon Bennett, 75016 Paris'),
('Wimbledon', 'London', 'England', '2025-06-30', '2025-07-13', 'Grand Slam', 'Grass', 51.4341, -0.2145, 'All England Lawn Tennis Club, Church Rd, Wimbledon, London SW19 5AE'),
('US Open', 'New York', 'USA', '2025-08-25', '2025-09-07', 'Grand Slam', 'Hard', 40.7501, -73.8448, 'USTA Billie Jean King National Tennis Center, Flushing Meadows Corona Park, Queens, NY 11368'),
('Australian Open', 'Melbourne', 'Australia', '2025-01-13', '2025-01-26', 'Grand Slam', 'Hard', -37.8136, 144.9631, 'Melbourne Park, Olympic Blvd, Melbourne VIC 3000, Australia'),
('Monte-Carlo Masters', 'Monte Carlo', 'Monaco', '2025-04-12', '2025-04-20', 'ATP Masters 1000', 'Clay', 43.7494, 7.4386, 'Monte Carlo Country Club, 155 Avenue Princesse Grace, 06190 Roquebrune-Cap-Martin'),
('Madrid Open', 'Madrid', 'Spain', '2025-04-26', '2025-05-04', 'ATP Masters 1000', 'Clay', 40.3947, -3.6838, 'Caja Mágica, Camino de Perales, 23, 28041 Madrid'),
('Indian Wells Masters', 'Indian Wells', 'USA', '2025-03-06', '2025-03-16', 'ATP Masters 1000', 'Hard', 33.7175, -116.2920, 'Indian Wells Tennis Garden, 78200 Miles Ave, Indian Wells, CA 92210'),
('Miami Open', 'Miami', 'USA', '2025-03-19', '2025-03-30', 'ATP Masters 1000', 'Hard', 25.9581, -80.2389, 'Hard Rock Stadium, 347 Don Shula Dr, Miami Gardens, FL 33056'),
('Rome Masters', 'Rome', 'Italy', '2025-05-10', '2025-05-18', 'ATP Masters 1000', 'Clay', 41.9342, 12.4731, 'Foro Italico, Viale dei Gladiatori, 00135 Roma RM, Italy'),
('Canada Masters', 'Toronto', 'Canada', '2025-08-04', '2025-08-10', 'ATP Masters 1000', 'Hard', 43.7615, -79.4163, 'Sobeys Stadium, 1 Shoreham Dr, Toronto, ON M3N 3A6, Canada'),

-- WTA tournaments
('Dubai Tennis Championships', 'Dubai', 'UAE', '2025-02-17', '2025-02-22', 'WTA 1000', 'Hard', 25.2048, 55.2708, 'Dubai Duty Free Tennis Stadium, Garhoud, Dubai'),
('Qatar Open', 'Doha', 'Qatar', '2025-02-10', '2025-02-15', 'WTA 1000', 'Hard', 25.2760, 51.5074, 'Khalifa International Tennis and Squash Complex, Doha'),
('Charleston Open', 'Charleston', 'USA', '2025-04-06', '2025-04-13', 'WTA 500', 'Clay', 32.7767, -79.9311, 'Credit One Stadium, 161 Seven Farms Dr, Charleston, SC 29492'),

-- ITF tournaments
('ITF Buenos Aires', 'Buenos Aires', 'Argentina', '2025-03-03', '2025-03-09', 'ITF W60', 'Clay', -34.6037, -58.3816, 'Club Atletico San Isidro, Buenos Aires'),
('ITF Prague', 'Prague', 'Czech Republic', '2025-04-21', '2025-04-27', 'ITF W80', 'Clay', 50.0755, 14.4378, 'TK Sparta Praha, Prague'),
('ITF Cancun', 'Cancun', 'Mexico', '2025-05-05', '2025-05-11', 'ITF W25', 'Hard', 21.1619, -86.8515, 'Cancun Tennis Club, Cancun');
