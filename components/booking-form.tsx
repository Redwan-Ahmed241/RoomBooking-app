"use client"

import type React from "react"

import { useState } from "react"
import type { Room, BookingFormData } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, CreditCard } from "lucide-react"
import { useRouter } from "next/navigation"

interface BookingFormProps {
  room: Room
}

export default function BookingForm({ room }: BookingFormProps) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<BookingFormData>({
    room_id: room.id,
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    check_in: "",
    check_out: "",
    guests: 1,
    special_requests: "",
  })

  const calculateNights = () => {
    if (!formData.check_in || !formData.check_out) return 0
    const checkIn = new Date(formData.check_in)
    const checkOut = new Date(formData.check_out)
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime())
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  const totalPrice = calculateNights() * room.price_per_night

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          total_price: totalPrice,
        }),
      })

      if (response.ok) {
        const booking = await response.json()
        router.push(`/booking-confirmation/${booking.id}`)
      } else {
        alert("Failed to create booking. Please try again.")
      }
    } catch (error) {
      console.error("Error creating booking:", error)
      alert("An error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Book Your Stay
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="check_in">Check-in</Label>
              <Input
                id="check_in"
                type="date"
                required
                value={formData.check_in}
                onChange={(e) => setFormData({ ...formData, check_in: e.target.value })}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="check_out">Check-out</Label>
              <Input
                id="check_out"
                type="date"
                required
                value={formData.check_out}
                onChange={(e) => setFormData({ ...formData, check_out: e.target.value })}
                min={formData.check_in || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests">Number of Guests</Label>
            <Input
              id="guests"
              type="number"
              min="1"
              max={room.max_guests}
              required
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: Number.parseInt(e.target.value) })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_name">Full Name</Label>
            <Input
              id="customer_name"
              type="text"
              required
              value={formData.customer_name}
              onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_email">Email</Label>
            <Input
              id="customer_email"
              type="email"
              required
              value={formData.customer_email}
              onChange={(e) => setFormData({ ...formData, customer_email: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="customer_phone">Phone Number</Label>
            <Input
              id="customer_phone"
              type="tel"
              value={formData.customer_phone}
              onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="special_requests">Special Requests (Optional)</Label>
            <Textarea
              id="special_requests"
              value={formData.special_requests}
              onChange={(e) => setFormData({ ...formData, special_requests: e.target.value })}
              placeholder="Any special requirements or requests..."
            />
          </div>

          {calculateNights() > 0 && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <span>
                  £{room.price_per_night} × {calculateNights()} nights
                </span>
                <span>£{totalPrice}</span>
              </div>
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total</span>
                <span>£{totalPrice}</span>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting || calculateNights() === 0}>
            <CreditCard className="w-4 h-4 mr-2" />
            {isSubmitting ? "Processing..." : `Book Now - £${totalPrice}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
