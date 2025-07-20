"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, User, Settings } from "lucide-react"
import Logo from "./logo"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/rooms" className="text-gray-700 hover:text-blue-600 transition-colors">
              Rooms
            </Link>
            <Link href="/villas" className="text-gray-700 hover:text-blue-600 transition-colors">
              Villas
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
              About
            </Link>
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4 mr-2" />
              Login
            </Button>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              Sign Up
            </Button>
            <Link href="/admin">
              <Button variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="sm" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-blue-600 transition-colors">
                Home
              </Link>
              <Link href="/rooms" className="text-gray-700 hover:text-blue-600 transition-colors">
                Rooms
              </Link>
              <Link href="/villas" className="text-gray-700 hover:text-blue-600 transition-colors">
                Villas
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 transition-colors">
                About
              </Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
                <Button variant="ghost" size="sm" className="justify-start">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  Sign Up
                </Button>
                <Link href="/admin">
                  <Button variant="outline" size="sm" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
