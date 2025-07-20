import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        room:rooms(name),
        villa:villas(name)
      `)
      .order("created_at", { ascending: false })
      .limit(50)

    if (error) {
      console.error("Error fetching bookings:", error)
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error in bookings API:", error)
    return NextResponse.json([], { status: 200 })
  }
}
