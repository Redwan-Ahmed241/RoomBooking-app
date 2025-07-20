import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    const { data, error } = await supabase.from("villas").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching villas:", error)
      return NextResponse.json([], { status: 200 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error in villas API:", error)
    return NextResponse.json([], { status: 200 })
  }
}
