import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { room_id, check_in, check_out } = await request.json()

    // Check for existing bookings that overlap with the requested dates
    const { data: existingBookings, error } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", room_id)
      .neq("status", "cancelled")
      .or(`check_in.lte.${check_out},check_out.gte.${check_in}`)

    if (error?.message?.includes(`relation "public.bookings" does not exist`)) {
      // If bookings table doesn't exist, assume room is available
      return NextResponse.json({
        available: true,
        message: "Room is available (bookings table not created yet)",
      })
    }

    if (error) {
      console.error("Error checking availability:", error)
      return NextResponse.json({ error: "Failed to check availability" }, { status: 500 })
    }

    const isAvailable = !existingBookings || existingBookings.length === 0

    return NextResponse.json({
      available: isAvailable,
      conflicting_bookings: existingBookings?.length || 0,
      message: isAvailable ? "Room is available" : "Room is not available for selected dates",
    })
  } catch (error) {
    console.error("Error in availability test API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
