import type { Room } from "@/lib/types"

export const demoRooms: Room[] = [
  {
    id: "demo-1",
    name: "Deluxe Double Room",
    description: "Spacious double room with modern amenities, perfect for couples visiting Manchester.",
    price_per_night: 85,
    max_guests: 2,
    amenities: ["Free WiFi", "Private Bathroom", "Air Conditioning", "TV"],
    images: ["/placeholder.svg?height=400&width=600"],
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-2",
    name: "Twin Room",
    description: "Comfortable twin room ideal for friends or colleagues. Two single beds with all conveniences.",
    price_per_night: 75,
    max_guests: 2,
    amenities: ["Free WiFi", "Private Bathroom", "TV"],
    images: ["/placeholder.svg?height=400&width=600"],
    is_available: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "demo-3",
    name: "Superior Single Room",
    description: "Perfect for solo travellers, this single room offers comfort and convenience.",
    price_per_night: 65,
    max_guests: 1,
    amenities: ["Free WiFi", "Private Bathroom", "TV"],
    images: ["/placeholder.svg?height=400&width=600"],
    is_available: true,
    created_at: new Date().toISOString(),
  },
]
