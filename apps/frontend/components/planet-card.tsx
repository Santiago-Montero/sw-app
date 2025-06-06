"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getIdFromUrl } from "@/lib/utils"
import type { Planet } from "@/types"
import { Users, Droplets, Thermometer, Mountain } from "lucide-react"

interface PlanetCardProps {
  planet: Planet
  index: number
  priority?: boolean
}

export function PlanetCard({ planet, index, priority = false }: PlanetCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const planetId = getIdFromUrl(planet.url)

  // Determinar el color de fondo basado en el clima
  const getBgColor = () => {
    switch (planet.climate) {
      case "arid":
        return "bg-amber-50 dark:bg-amber-950"
      case "temperate":
        return "bg-green-50 dark:bg-green-950"
      case "frozen":
        return "bg-blue-50 dark:bg-blue-950"
      case "murky":
        return "bg-gray-50 dark:bg-gray-900"
      default:
        return "bg-purple-50 dark:bg-purple-950"
    }
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
      <Link href={`/planets/${planetId}`}>
        <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${getBgColor()}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(planet.name)}`}
              alt={planet.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{planet.name}</h3>
          </div>

          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{planet.climate}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mountain className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{planet.terrain}</span>
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{planet.surface_water}% agua</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{planet.population !== "unknown" ? planet.population : "Desconocida"}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 pt-0">
            <Badge variant="outline">{planet.terrain.split(", ")[0]}</Badge>
            <Badge>{planet.films.length} películas</Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
