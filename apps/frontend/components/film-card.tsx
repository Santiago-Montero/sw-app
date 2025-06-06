"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getIdFromUrl } from "../lib/utils"
import type { Film } from "../types"
import { FilmIcon, Calendar, User, Users } from "lucide-react"

interface FilmCardProps {
  film: Film
  index: number
  priority?: boolean
}

export function FilmCard({ film, index, priority = false }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const filmId = getIdFromUrl(film.url)

  // Determinar el color de fondo basado en el episodio
  const getBgColor = () => {
    switch (film.episode_id) {
      case 1:
        return "bg-blue-50 dark:bg-blue-950"
      case 2:
        return "bg-purple-50 dark:bg-purple-950"
      case 3:
        return "bg-red-50 dark:bg-red-950"
      case 4:
        return "bg-yellow-50 dark:bg-yellow-950"
      case 5:
        return "bg-green-50 dark:bg-green-950"
      case 6:
        return "bg-indigo-50 dark:bg-indigo-950"
      default:
        return "bg-gray-50 dark:bg-gray-900"
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
      <Link href={`/films/${filmId}`}>
        <Card className={`overflow-hidden h-full transition-all duration-300 hover:shadow-lg ${getBgColor()}`}>
          <div className="relative h-48 overflow-hidden">
            <Image
              src={`/placeholder.svg?height=400&width=600&text=${encodeURIComponent(film.title)}`}
              alt={film.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <h3 className="absolute bottom-4 left-4 text-xl font-bold text-white">{film.title}</h3>
          </div>

          <CardContent className="pt-4">
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{film.release_date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{film.director}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{film.producer}</span>
              </div>
              <div className="flex items-center gap-2">
                <FilmIcon className="h-4 w-4 text-gray-500" />
                <span className="text-sm">Episodio {film.episode_id}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 pt-0">
            <Badge variant="outline">{film.characters.length} personajes</Badge>
            <Badge>{film.planets.length} planetas</Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
