import { type NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", params.id)
      .eq("customer_email", "test@example.com") // Safety check - only delete test bookings

    if (error?.message?.includes(`relation "public.bookings" does not exist`)) {
      return NextResponse.json({
        message: "Bookings table not created yet - nothing to clean up",
      })
    }

    if (error) {
      console.error("Error cleaning up test booking:", error)
      return NextResponse.json({ error: "Failed to clean up test booking" }, { status: 500 })
    }

    return NextResponse.json({ message: "Test booking cleaned up successfully" })
  } catch (error) {
    console.error("Error in cleanup API:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
