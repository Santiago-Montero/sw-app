"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getIdFromUrl } from "@/lib/utils"
import type { Starship } from "@/types"
import { Users, Gauge, Rocket, Briefcase } from "lucide-react"

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
    const starshipClass = starship.starship_class.toLowerCase()
    if (starshipClass.includes("fighter")) return "bg-red-50 dark:bg-red-950"
    if (starshipClass.includes("destroyer") || starshipClass.includes("battle")) return "bg-gray-50 dark:bg-gray-900"
    if (starshipClass.includes("transport") || starshipClass.includes("freighter")) return "bg-blue-50 dark:bg-blue-950"
    return "bg-purple-50 dark:bg-purple-950"
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
          <div className="relative h-52 overflow-hidden">
            <Image
              src={`/placeholder.svg?height=500&width=800&text=${encodeURIComponent(starship.name)}`}
              alt={starship.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="mb-2">{starship.starship_class}</Badge>
              <h3 className="text-xl font-bold text-white">{starship.name}</h3>
              <p className="text-sm text-gray-200">{starship.model}</p>
            </div>
          </div>

          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Gauge className="h-4 w-4 text-gray-500" />
                <span className="text-sm">
                  {starship.max_atmosphering_speed !== "n/a" ? `${starship.max_atmosphering_speed} km/h` : "N/A"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Tripulación: {starship.crew}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Pasajeros: {starship.passengers}</span>
              </div>
              <div className="flex items-center gap-2">
                <Rocket className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Hyperdrive: {starship.hyperdrive_rating}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 pt-0">
            <Badge variant="outline">{starship.manufacturer.split(",")[0]}</Badge>
            <Badge>{starship.films.length} películas</Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
