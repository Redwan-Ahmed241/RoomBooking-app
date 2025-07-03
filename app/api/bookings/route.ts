import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import type { BookingFormData } from "@/lib/types"

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingFormData & { total_price: number } = await request.json()

    // Check if room is available for the selected dates
    const { data: existingBookings, error: checkError } = await supabase
      .from("bookings")
      .select("*")
      .eq("room_id", bookingData.room_id)
      .neq("status", "cancelled")
      .or(`check_in.lte.${bookingData.check_out},check_out.gte.${bookingData.check_in}`)

    if (checkError) {
      console.error("Error checking availability:", checkError)
      return NextResponse.json({ error: "Failed to check availability" }, { status: 500 })
    }

    if (existingBookings && existingBookings.length > 0) {
      return NextResponse.json({ error: "Room is not available for selected dates" }, { status: 400 })
    }

    // Create the booking
    const { data: booking, error: insertError } = await supabase
      .from("bookings")
      .insert([
        {
          room_id: bookingData.room_id,
          customer_name: bookingData.customer_name,
          customer_email: bookingData.customer_email,
          customer_phone: bookingData.customer_phone,
          check_in: bookingData.check_in,
          check_out: bookingData.check_out,
          guests: bookingData.guests,
          total_price: bookingData.total_price,
          special_requests: bookingData.special_requests,
          status: "pending",
        },
      ])
      .select()
      .single()

    if (insertError) {
      console.error("Error creating booking:", insertError)
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 })
    }

    return NextResponse.json(booking, { status: 201 })
  } catch (error) {
    console.error("Error processing booking:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
