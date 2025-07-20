"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Calendar, Users, MapPin } from "lucide-react"
import { useRouter } from "next/navigation"

export default function HeroSearch() {
  const router = useRouter()
  const [searchData, setSearchData] = useState({
    check_in: "",
    check_out: "",
    guests: 1,
    villa_name: "",
  })

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (searchData.check_in) params.set("check_in", searchData.check_in)
    if (searchData.check_out) params.set("check_out", searchData.check_out)
    if (searchData.guests > 1) params.set("guests", searchData.guests.toString())
    if (searchData.villa_name) params.set("villa_name", searchData.villa_name)

    router.push(`/rooms?${params.toString()}`)
  }

  return (
    <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-24">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect
            <span className="text-amber-400"> Villa Stay</span>
          </h1>
          <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto">
            Discover luxury accommodations in paradise. Book your dream room with stunning views and world-class
            amenities.
          </p>
        </div>

        {/* Search Card */}
        <Card className="max-w-5xl mx-auto shadow-2xl">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Villa/Location */}
              <div className="space-y-2">
                <Label htmlFor="villa" className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4" />
                  Villa or Location
                </Label>
                <Input
                  id="villa"
                  placeholder="Search villas..."
                  value={searchData.villa_name}
                  onChange={(e) => setSearchData({ ...searchData, villa_name: e.target.value })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Check-in */}
              <div className="space-y-2">
                <Label htmlFor="checkin" className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Check-in
                </Label>
                <Input
                  id="checkin"
                  type="date"
                  value={searchData.check_in}
                  onChange={(e) => setSearchData({ ...searchData, check_in: e.target.value })}
                  min={new Date().toISOString().split("T")[0]}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Check-out */}
              <div className="space-y-2">
                <Label htmlFor="checkout" className="flex items-center gap-2 text-gray-700">
                  <Calendar className="w-4 h-4" />
                  Check-out
                </Label>
                <Input
                  id="checkout"
                  type="date"
                  value={searchData.check_out}
                  onChange={(e) => setSearchData({ ...searchData, check_out: e.target.value })}
                  min={searchData.check_in || new Date().toISOString().split("T")[0]}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <Label htmlFor="guests" className="flex items-center gap-2 text-gray-700">
                  <Users className="w-4 h-4" />
                  Guests
                </Label>
                <Input
                  id="guests"
                  type="number"
                  min="1"
                  max="10"
                  value={searchData.guests}
                  onChange={(e) => setSearchData({ ...searchData, guests: Number.parseInt(e.target.value) })}
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>

              {/* Search Button */}
              <div className="flex items-end">
                <Button
                  onClick={handleSearch}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3"
                  size="lg"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
