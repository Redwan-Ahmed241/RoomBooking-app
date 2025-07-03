import type { Room } from "@/lib/types"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Wifi, Bath, Tv, Coffee } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

interface RoomCardProps {
  room: Room
}

export default function RoomCard({ room }: RoomCardProps) {
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
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48">
        <Image
          src={room.images[0] || "/placeholder.svg?height=200&width=400"}
          alt={room.name}
          fill
          className="object-cover"
        />
      </div>

      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <span>{room.name}</span>
          <Badge variant="secondary" className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {room.max_guests}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-3">{room.description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {room.amenities.slice(0, 4).map((amenity, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1">
              {getAmenityIcon(amenity)}
              <span className="text-xs">{amenity}</span>
            </Badge>
          ))}
          {room.amenities.length > 4 && <Badge variant="outline">+{room.amenities.length - 4} more</Badge>}
        </div>

        <div className="text-2xl font-bold text-blue-600">
          £{room.price_per_night}
          <span className="text-sm font-normal text-gray-500">/night</span>
        </div>
      </CardContent>

      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/book/${room.id}`}>Book This Room</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
