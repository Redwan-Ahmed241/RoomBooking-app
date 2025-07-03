import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        rooms (name, price_per_night)
      `)
      .eq("id", params.id)
      .single()

    if (error?.message?.includes(`relation "public.bookings" does not exist`)) {
      return NextResponse.json(
        {
          error: "Bookings table not created yet",
        },
        { status: 404 },
      )
    }

    if (error) {
      console.error("Error fetching booking:", error)
      return NextResponse.json({ error: "Booking not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in booking verification API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
