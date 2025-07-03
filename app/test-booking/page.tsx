"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Clock, AlertCircle } from "lucide-react"

interface TestResult {
  step: string
  status: "pending" | "success" | "error"
  message: string
  data?: any
}

export default function TestBookingPage() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)

  const updateResult = (step: string, status: "pending" | "success" | "error", message: string, data?: any) => {
    setTestResults((prev) => {
      const existing = prev.find((r) => r.step === step)
      if (existing) {
        existing.status = status
        existing.message = message
        existing.data = data
        return [...prev]
      }
      return [...prev, { step, status, message, data }]
    })
  }

  const runEndToEndTest = async () => {
    setIsRunning(true)
    setTestResults([])

    // Step 1: Test room fetching
    updateResult("fetch-rooms", "pending", "Fetching available rooms...")
    try {
      const roomsResponse = await fetch("/api/test/rooms")
      const roomsData = await roomsResponse.json()

      if (roomsResponse.ok && roomsData.length > 0) {
        updateResult("fetch-rooms", "success", `Found ${roomsData.length} rooms`, roomsData)
      } else {
        updateResult("fetch-rooms", "error", "No rooms found or API error")
        setIsRunning(false)
        return
      }

      // Step 2: Test availability check
      const testRoom = roomsData[0]
      const checkInDate = new Date()
      checkInDate.setDate(checkInDate.getDate() + 7) // 1 week from now
      const checkOutDate = new Date()
      checkOutDate.setDate(checkOutDate.getDate() + 9) // 2 nights

      updateResult("check-availability", "pending", "Checking room availability...")

      const availabilityResponse = await fetch("/api/test/availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          room_id: testRoom.id,
          check_in: checkInDate.toISOString().split("T")[0],
          check_out: checkOutDate.toISOString().split("T")[0],
        }),
      })

      const availabilityData = await availabilityResponse.json()

      if (availabilityResponse.ok) {
        updateResult("check-availability", "success", "Room is available for test dates", availabilityData)
      } else {
        updateResult("check-availability", "error", availabilityData.error || "Availability check failed")
      }

      // Step 3: Create test booking
      updateResult("create-booking", "pending", "Creating test booking...")

      const bookingData = {
        room_id: testRoom.id,
        customer_name: "Test Customer",
        customer_email: "test@example.com",
        customer_phone: "+44 7700 900123",
        check_in: checkInDate.toISOString().split("T")[0],
        check_out: checkOutDate.toISOString().split("T")[0],
        guests: 2,
        special_requests: "This is a test booking - please ignore",
        total_price: testRoom.price_per_night * 2,
      }

      const bookingResponse = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      })

      const bookingResult = await bookingResponse.json()

      if (bookingResponse.ok) {
        updateResult("create-booking", "success", "Test booking created successfully", bookingResult)

        // Step 4: Verify booking was saved
        updateResult("verify-booking", "pending", "Verifying booking was saved...")

        const verifyResponse = await fetch(`/api/test/booking/${bookingResult.id}`)
        const verifyData = await verifyResponse.json()

        if (verifyResponse.ok) {
          updateResult("verify-booking", "success", "Booking verified in database", verifyData)

          // Step 5: Clean up test booking
          updateResult("cleanup", "pending", "Cleaning up test data...")

          const cleanupResponse = await fetch(`/api/test/cleanup/${bookingResult.id}`, {
            method: "DELETE",
          })

          if (cleanupResponse.ok) {
            updateResult("cleanup", "success", "Test booking cleaned up successfully")
          } else {
            updateResult("cleanup", "error", "Failed to clean up test booking")
          }
        } else {
          updateResult("verify-booking", "error", "Could not verify booking in database")
        }
      } else {
        updateResult("create-booking", "error", bookingResult.error || "Failed to create booking")
      }
    } catch (error) {
      updateResult("fetch-rooms", "error", `Network error: ${error}`)
    }

    setIsRunning(false)
  }

  const getStatusIcon = (status: "pending" | "success" | "error") => {
    switch (status) {
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500 animate-spin" />
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />
    }
  }

  const getStatusBadge = (status: "pending" | "success" | "error") => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary">Running...</Badge>
      case "success":
        return <Badge className="bg-green-100 text-green-800">Success</Badge>
      case "error":
        return <Badge variant="destructive">Failed</Badge>
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking System Test</h1>
          <p className="text-gray-600">
            This test verifies the complete booking flow from room fetching to booking creation.
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              End-to-End Booking Test
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-gray-600">This test will:</p>
              <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
                <li>Fetch available rooms from the database</li>
                <li>Check room availability for test dates</li>
                <li>Create a test booking</li>
                <li>Verify the booking was saved correctly</li>
                <li>Clean up test data</li>
              </ul>

              <Button onClick={runEndToEndTest} disabled={isRunning} className="w-full">
                {isRunning ? "Running Tests..." : "Run End-to-End Test"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {testResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {testResults.map((result, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 border rounded-lg">
                    {getStatusIcon(result.status)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium capitalize">{result.step.replace("-", " ")}</h3>
                        {getStatusBadge(result.status)}
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                      {result.data && (
                        <details className="text-xs">
                          <summary className="cursor-pointer text-blue-600 hover:text-blue-800">View Data</summary>
                          <pre className="mt-2 p-2 bg-gray-100 rounded overflow-x-auto">
                            {JSON.stringify(result.data, null, 2)}
                          </pre>
                        </details>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
