"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X, Wifi, Car, Coffee, Waves, Snowflake, Utensils, Dumbbell, SpadeIcon as Spa } from "lucide-react"

interface FilterChipsProps {
  selectedAmenities: string[]
  onAmenityToggle: (amenity: string) => void
  onClearAll: () => void
}

const amenityOptions = [
  { name: "WiFi", icon: Wifi, color: "bg-blue-100 text-blue-800" },
  { name: "Pool", icon: Waves, color: "bg-cyan-100 text-cyan-800" },
  { name: "Air Conditioning", icon: Snowflake, color: "bg-sky-100 text-sky-800" },
  { name: "Restaurant", icon: Utensils, color: "bg-orange-100 text-orange-800" },
  { name: "Parking", icon: Car, color: "bg-gray-100 text-gray-800" },
  { name: "Coffee Machine", icon: Coffee, color: "bg-amber-100 text-amber-800" },
  { name: "Gym", icon: Dumbbell, color: "bg-red-100 text-red-800" },
  { name: "Spa", icon: Spa, color: "bg-purple-100 text-purple-800" },
]

export default function FilterChips({ selectedAmenities, onAmenityToggle, onClearAll }: FilterChipsProps) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-sm font-medium text-gray-700 mr-2">Filters:</span>

      {amenityOptions.map((amenity) => {
        const isSelected = selectedAmenities.includes(amenity.name)
        const Icon = amenity.icon

        return (
          <Badge
            key={amenity.name}
            variant={isSelected ? "default" : "outline"}
            className={`cursor-pointer transition-all hover:scale-105 ${
              isSelected
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : `${amenity.color} hover:shadow-md border-gray-300`
            }`}
            onClick={() => onAmenityToggle(amenity.name)}
          >
            <Icon className="w-3 h-3 mr-1" />
            {amenity.name}
          </Badge>
        )
      })}

      {selectedAmenities.length > 0 && (
        <Button variant="ghost" size="sm" onClick={onClearAll} className="text-gray-600 hover:text-gray-800 p-1 h-auto">
          <X className="w-4 h-4 mr-1" />
          Clear all
        </Button>
      )}
    </div>
  )
}
