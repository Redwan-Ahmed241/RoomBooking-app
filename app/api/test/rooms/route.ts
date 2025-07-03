import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"
import { demoRooms } from "@/lib/demo-rooms"

export async function GET() {
  try {
    const { data, error } = await supabase.from("rooms").select("*").eq("is_available", true)

    // Fallback to demo rooms if table doesn't exist
    if (error?.message?.includes(`relation "public.rooms" does not exist`)) {
      return NextResponse.json(demoRooms)
    }

    if (error) {
      console.error("Error fetching rooms:", error)
      return NextResponse.json({ error: "Failed to fetch rooms" }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error in rooms test API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
