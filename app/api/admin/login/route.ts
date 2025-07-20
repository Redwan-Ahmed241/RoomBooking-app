import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Simple demo authentication
    if (email === "admin@villabook.com" && password === "admin123") {
      return NextResponse.json({
        success: true,
        token: "demo-admin-token",
        user: {
          email,
          name: "Villa Administrator",
          role: "admin",
        },
      })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Error in admin login:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
