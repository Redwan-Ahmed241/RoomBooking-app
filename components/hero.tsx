import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 py-24 sm:py-32">
        <div className="text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6">Moorfields Villas</h1>
          <p className="text-xl sm:text-2xl mb-8 max-w-3xl mx-auto">
            Comfortable accommodation in the heart of Manchester. Perfect for business travelers, tourists, and extended
            stays.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Link href="#booking">Book Now</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="#rooms">View Rooms</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
