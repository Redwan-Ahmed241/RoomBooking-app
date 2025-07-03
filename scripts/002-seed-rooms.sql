-- Insert sample rooms for Moorfields Villa
INSERT INTO rooms (name, description, price_per_night, max_guests, amenities, images) VALUES
(
  'Deluxe Double Room',
  'Spacious double room with modern amenities, perfect for couples visiting Manchester. Features a comfortable double bed, private bathroom, and city views.',
  85.00,
  2,
  ARRAY['Free WiFi', 'Private Bathroom', 'Air Conditioning', 'TV', 'Tea/Coffee Facilities', 'Heating'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']
),
(
  'Twin Room',
  'Comfortable twin room ideal for friends or colleagues. Two single beds with all modern conveniences in the heart of Manchester.',
  75.00,
  2,
  ARRAY['Free WiFi', 'Private Bathroom', 'TV', 'Tea/Coffee Facilities', 'Heating', 'Desk'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']
),
(
  'Superior Single Room',
  'Perfect for solo travelers, this single room offers comfort and convenience with easy access to Manchester city center.',
  65.00,
  1,
  ARRAY['Free WiFi', 'Private Bathroom', 'TV', 'Tea/Coffee Facilities', 'Heating'],
  ARRAY['/placeholder.svg?height=400&width=600', '/placeholder.svg?height=400&width=600']
);
