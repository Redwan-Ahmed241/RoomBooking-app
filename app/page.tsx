import { supabase } from "@/lib/supabase"
import type { Room } from "@/lib/types"
import Navbar from "@/components/navbar"
import HeroSearch from "@/components/hero-search"
import RoomCard from "@/components/room-card"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, MapPin, Award } from "lucide-react"

async function getFeaturedRooms(): Promise<Room[]> {
  try {
    const { data, error } = await supabase
      .from("rooms")
      .select(`
        *,
        villa:villas(name, location)
      `)
      .eq("is_available", true)
      .order("rating", { ascending: false })
      .limit(6)

    if (error) {
      console.log("Database error, using demo data:", error.message)
      return []
    }

    return data || []
  } catch (error) {
    console.log("Error fetching rooms:", error)
    return []
  }
}

export default async function HomePage() {
  const featuredRooms = await getFeaturedRooms()

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <HeroSearch />

      {/* Featured Rooms Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Accommodations</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our most popular rooms with exceptional ratings and stunning amenities
          </p>
        </div>

        {featuredRooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No rooms available at the moment.</p>
            <p className="text-sm text-gray-500">Please check back later or contact us for availability.</p>
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">1+</h3>
                <p className="text-gray-600">Premium Villas</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">9+</h3>
                <p className="text-gray-600">Luxury Rooms</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">4.8</h3>
                <p className="text-gray-600">Average Rating</p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-sm">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">100%</h3>
                <p className="text-gray-600">Satisfaction Rate</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose VillaBook?</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury, comfort, and exceptional service in every stay
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Premium Quality</h3>
            <p className="text-gray-600">
              Every room is carefully selected and maintained to ensure the highest standards of luxury and comfort.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated team is available around the clock to ensure your stay is perfect from start to finish.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Prime Locations</h3>
            <p className="text-gray-600">
              All our villas are located in the most desirable destinations with easy access to attractions and
              amenities.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
