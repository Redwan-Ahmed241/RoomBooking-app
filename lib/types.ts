export interface Room {
  id: string
  name: string
  description: string
  price_per_night: number
  max_guests: number
  amenities: string[]
  images: string[]
  is_available: boolean
  created_at: string
}

export interface Booking {
  id: string
  room_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  check_in: string
  check_out: string
  guests: number
  total_price: number
  status: "pending" | "confirmed" | "cancelled"
  special_requests?: string
  created_at: string
}

export interface BookingFormData {
  room_id: string
  customer_name: string
  customer_email: string
  customer_phone?: string
  check_in: string
  check_out: string
  guests: number
  special_requests?: string
}
