-- Insert sample villa
INSERT INTO villas (name, description, location, address, amenities, images) VALUES
(
  'Sunset Paradise Villa',
  'A luxurious beachfront villa with stunning ocean views, perfect for families and groups seeking a premium vacation experience. Features modern amenities, private beach access, and world-class service.',
  'Maldives',
  '123 Ocean Drive, Paradise Island, Maldives',
  ARRAY['Private Beach', 'Swimming Pool', 'WiFi', 'Air Conditioning', 'Restaurant', 'Spa Services', 'Airport Transfer', 'Concierge Service'],
  ARRAY['/placeholder.svg?height=400&width=600&text=Villa+Exterior', '/placeholder.svg?height=400&width=600&text=Pool+Area', '/placeholder.svg?height=400&width=600&text=Beach+View']
);

-- Get the villa ID for room insertion
DO $$
DECLARE
    villa_uuid UUID;
BEGIN
    SELECT id INTO villa_uuid FROM villas WHERE name = 'Sunset Paradise Villa' LIMIT 1;
    
    -- Insert sample rooms for the villa
    INSERT INTO rooms (villa_id, name, description, price_per_night, max_guests, room_type, size_sqm, amenities, images, rating) VALUES
    (
      villa_uuid,
      'Ocean View Suite',
      'Spacious suite with panoramic ocean views, king-size bed, private balcony, and luxury amenities. Perfect for couples seeking romance and tranquility.',
      299.00,
      2,
      'Suite',
      45,
      ARRAY['Ocean View', 'Private Balcony', 'King Bed', 'Mini Bar', 'Coffee Machine', 'Safe', 'Bathtub'],
      ARRAY['/placeholder.svg?height=400&width=600&text=Ocean+Suite', '/placeholder.svg?height=400&width=600&text=Suite+Balcony'],
      4.8
    ),
    (
      villa_uuid,
      'Garden Villa Room',
      'Elegant room surrounded by tropical gardens with direct pool access. Features modern furnishings and a peaceful atmosphere.',
      199.00,
      2,
      'Deluxe Room',
      35,
      ARRAY['Garden View', 'Pool Access', 'Queen Bed', 'Mini Fridge', 'Coffee Machine', 'Safe'],
      ARRAY['/placeholder.svg?height=400&width=600&text=Garden+Room', '/placeholder.svg?height=400&width=600&text=Garden+View'],
      4.6
    ),
    (
      villa_uuid,
      'Family Beach House',
      'Spacious family accommodation with two bedrooms, living area, and direct beach access. Ideal for families with children.',
      399.00,
      6,
      'Family Suite',
      80,
      ARRAY['Beach Access', 'Two Bedrooms', 'Living Area', 'Kitchenette', 'Kids Area', 'Safe', 'Balcony'],
      ARRAY['/placeholder.svg?height=400&width=600&text=Family+Suite', '/placeholder.svg?height=400&width=600&text=Beach+Access'],
      4.7
    ),
    (
      villa_uuid,
      'Luxury Presidential Suite',
      'The ultimate luxury experience with private pool, butler service, and exclusive amenities. Perfect for special occasions.',
      599.00,
      4,
      'Presidential Suite',
      120,
      ARRAY['Private Pool', 'Butler Service', 'Master Bedroom', 'Living Room', 'Dining Area', 'Wine Cellar', 'Jacuzzi'],
      ARRAY['/placeholder.svg?height=400&width=600&text=Presidential+Suite', '/placeholder.svg?height=400&width=600&text=Private+Pool'],
      4.9
    ),
    (
      villa_uuid,
      'Cozy Standard Room',
      'Comfortable and affordable accommodation with all essential amenities. Great value for budget-conscious travelers.',
      149.00,
      2,
      'Standard Room',
      25,
      ARRAY['City View', 'Double Bed', 'Mini Fridge', 'Coffee Machine', 'Safe', 'Desk'],
      ARRAY['/placeholder.svg?height=400&width=600&text=Standard+Room'],
      4.4
    ),
    (
      villa_uuid,
      'Romantic Honeymoon Suite',
      'Intimate suite designed for couples with rose petal service, champagne welcome, and sunset views.',
      449.00,
      2,
      'Honeymoon Suite',
      55,
      ARRAY['Sunset View', 'Rose Petal Service', 'Champagne', 'King Bed', 'Jacuzzi', 'Private Terrace', 'Romantic Lighting'],
      ARRAY['/placeholder.svg?height=400&width=600&text=Honeymoon+Suite', '/placeholder.svg?height=400&width=600&text=Romantic+Terrace'],
      4.9
    );
END $$;

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (email, password_hash, name) VALUES
('admin@villabook.com', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'Villa Administrator');
