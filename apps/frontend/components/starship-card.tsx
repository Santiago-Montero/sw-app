"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getIdFromUrl } from "../lib/utils"
import type { Starship } from "../types"
import { Rocket, Users, Film, Settings } from "lucide-react"

interface StarshipCardProps {
  starship: Starship
  index: number
  priority?: boolean
}

export function StarshipCard({ starship, index, priority = false }: StarshipCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const starshipId = getIdFromUrl(starship.url)

  // Determinar el color de fondo basado en la clase de nave
  const getBgColor = () => {
    const shipClass = starship.starship_class.toLowerCase()
    if (shipClass.includes("fighter")) return "bg-red-50 dark:bg-red-950"
    if (shipClass.includes("transport")) return "bg-blue-50 dark:bg-blue-950"
    if (shipClass.includes("cruiser")) return "bg-purple-50 dark:bg-purple-950"
    if (shipClass.includes("battleship")) return "bg-gray-50 dark:bg-gray-900"
    return "bg-green-50 dark:bg-green-950"
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -5 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <Link href={`/starships/${starshipId}`}>
        <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${getBgColor()}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(starship.name)}`}
              alt={starship.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{starship.name}</h3>
          </div>

          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{starship.model}</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{starship.starship_class}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{starship.crew}</span>
              </div>
              <div className="flex items-center gap-2">
                <Film className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{starship.films.length} películas</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 pt-0">
            <Badge variant="outline">{starship.length} m</Badge>
            <Badge>{starship.passengers} pasajeros</Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
