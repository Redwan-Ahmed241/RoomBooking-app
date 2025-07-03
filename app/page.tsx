import { supabase } from "@/lib/supabase"
import type { Room } from "@/lib/types"
import RoomCard from "@/components/room-card"
import Hero from "@/components/hero"
import BookingSection from "@/components/booking-section"
import { demoRooms } from "@/lib/demo-rooms"

async function getRooms(): Promise<Room[]> {
  const { data, error } = await supabase
    .from("rooms")
    .select("*")
    .eq("is_available", true)
    .order("price_per_night", { ascending: true })

  // ── Fallback if the rooms table doesn't exist ────────────────────────────────
  if (error?.message?.includes(`relation "public.rooms" does not exist`)) {
    console.warn(
      "[Supabase] The 'rooms' table has not been created yet. " +
        "Falling back to demo data. Run scripts/001-create-tables.sql " +
        "and scripts/002-seed-rooms.sql to create & seed the database.",
    )
    return demoRooms
  }

  if (error) {
    console.error("Error fetching rooms:", error)
    return []
  }

  return data ?? []
}

export default async function HomePage() {
  const rooms = await getRooms()

  return (
    <div className="min-h-screen">
      <Hero />
      <BookingSection />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Rooms</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choose from our comfortable and well-appointed rooms in the heart of Manchester
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </div>
  )
}
