import { supabase } from "@/lib/supabase"
import type { Room } from "@/lib/types"
import BookingForm from "@/components/booking-form"
import { notFound } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Users, Wifi, Bath, Tv, Coffee, MapPin } from "lucide-react"

async function getRoom(roomId: string): Promise<Room | null> {
  const { data, error } = await supabase.from("rooms").select("*").eq("id", roomId).single()

  if (error) {
    console.error("Error fetching room:", error)
    return null
  }

  return data
}

export default async function BookingPage({ params }: { params: { roomId: string } }) {
  const room = await getRoom(params.roomId)

  if (!room) {
    notFound()
  }

  const getAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "free wifi":
        return <Wifi className="w-4 h-4" />
      case "private bathroom":
        return <Bath className="w-4 h-4" />
      case "tv":
        return <Tv className="w-4 h-4" />
      case "tea/coffee facilities":
        return <Coffee className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Room Details */}
          <div className="space-y-6">
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <Image
                src={room.images[0] || "/placeholder.svg?height=400&width=600"}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold">{room.name}</h1>
                <Badge className="flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  Up to {room.max_guests} guests
                </Badge>
              </div>

              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin className="w-4 h-4" />
                <span>Manchester, UK</span>
              </div>

              <p className="text-gray-700 mb-6">{room.description}</p>

              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-3">Amenities</h3>
                <div className="grid grid-cols-2 gap-2">
                  {room.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      {getAmenityIcon(amenity)}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-3xl font-bold text-blue-600">
                £{room.price_per_night}
                <span className="text-lg font-normal text-gray-500">/night</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <div className="lg:sticky lg:top-8">
            <BookingForm room={room} />
          </div>
        </div>
      </div>
    </div>
  )
}
