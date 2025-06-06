"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Film, EarthIcon, Rocket, User, Menu, X } from "lucide-react"

const navItems = [
  {
    name: "Personajes",
    href: "/",
    icon: <User className="h-5 w-5" />,
  },
  {
    name: "Películas",
    href: "/films",
    icon: <Film className="h-5 w-5" />,
  },
  {
    name: "Planetas",
    href: "/planets",
    icon: <EarthIcon className="h-5 w-5" />,
  },
  {
    name: "Naves",
    href: "/starships",
    icon: <Rocket className="h-5 w-5" />,
  },
]

export function MainNav() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-yellow-400 text-xl font-bold">STAR WARS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-1 transition-colors",
                  pathname === item.href
                    ? "bg-yellow-500 text-black"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white",
                )}
              >
                {item.icon}
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white hover:bg-gray-800"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-900 pb-3 px-2 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block px-3 py-2 rounded-md text-base font-medium flex items-center space-x-2",
                pathname === item.href
                  ? "bg-yellow-500 text-black"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white",
              )}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
