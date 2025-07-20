"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Building, Bed, DollarSign, Plus, Edit, Trash2, Eye, Calendar, TrendingUp } from "lucide-react"
import Logo from "@/components/logo"
import Link from "next/link"
import type { Villa, Room, Booking } from "@/lib/types"

export default function AdminDashboard() {
  const [villas, setVillas] = useState<Villa[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState({
    totalVillas: 0,
    totalRooms: 0,
    totalBookings: 0,
    totalRevenue: 0,
    occupancyRate: 0,
  })

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [villasRes, roomsRes, bookingsRes] = await Promise.all([
        fetch("/api/admin/villas"),
        fetch("/api/admin/rooms"),
        fetch("/api/admin/bookings"),
      ])

      const [villasData, roomsData, bookingsData] = await Promise.all([
        villasRes.json(),
        roomsRes.json(),
        bookingsRes.json(),
      ])

      setVillas(villasData)
      setRooms(roomsData)
      setBookings(bookingsData)

      // Calculate stats
      const totalRevenue = bookingsData.reduce(
        (sum: number, booking: Booking) => sum + (booking.status !== "cancelled" ? booking.total_price : 0),
        0,
      )

      const confirmedBookings = bookingsData.filter((b: Booking) => b.status === "confirmed")
      const occupancyRate = roomsData.length > 0 ? (confirmedBookings.length / roomsData.length) * 100 : 0

      setStats({
        totalVillas: villasData.length,
        totalRooms: roomsData.length,
        totalBookings: bookingsData.length,
        totalRevenue,
        occupancyRate,
      })
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Logo size="lg" />
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Logo size="md" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Manage your villas and bookings</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="outline" size="sm">
                  <Eye className="w-4 h-4 mr-2" />
                  View Site
                </Button>
              </Link>
              <Button variant="outline" size="sm">
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Villas</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalVillas}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Building className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Rooms</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalRooms}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Bed className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalBookings}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">${stats.totalRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Occupancy Rate</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.occupancyRate.toFixed(1)}%</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="villas" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="villas">Villas</TabsTrigger>
            <TabsTrigger value="rooms">Rooms</TabsTrigger>
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
          </TabsList>

          {/* Villas Tab */}
          <TabsContent value="villas">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Villa Management</CardTitle>
                  <Link href="/admin/villas/new">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Villa
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {villas.map((villa) => (
                    <div key={villa.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{villa.name}</h3>
                        <p className="text-gray-600">{villa.location}</p>
                        <p className="text-sm text-gray-500 mt-1">{villa.amenities.length} amenities</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={villa.is_active ? "default" : "secondary"}>
                          {villa.is_active ? "Active" : "Inactive"}
                        </Badge>
                        <Link href={`/admin/villas/${villa.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {villas.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No villas found. Add your first villa to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Rooms Tab */}
          <TabsContent value="rooms">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Room Management</CardTitle>
                  <Link href="/admin/rooms/new">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Room
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <div key={room.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg">{room.name}</h3>
                        <p className="text-gray-600">
                          {room.room_type} • ${room.price_per_night}/night
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Max {room.max_guests} guests • Rating: {room.rating}/5
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={room.is_available ? "default" : "secondary"}>
                          {room.is_available ? "Available" : "Unavailable"}
                        </Badge>
                        <Link href={`/admin/rooms/${room.id}`}>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4" />
                          </Button>
                        </Link>
                        <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {rooms.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      No rooms found. Add rooms to your villas to get started.
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings">
            <Card>
              <CardHeader>
                <CardTitle>Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{booking.customer_name}</h3>
                        <p className="text-gray-600">{booking.customer_email}</p>
                        <p className="text-sm text-gray-500 mt-1">
                          {booking.check_in} to {booking.check_out} • {booking.guests} guests
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">${booking.total_price}</p>
                          <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {bookings.length === 0 && <div className="text-center py-8 text-gray-500">No bookings found.</div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
