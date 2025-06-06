"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getIdFromUrl } from "@/lib/utils"
import type { Film } from "@/types"
import { Calendar, User, FilmIcon } from "lucide-react"

interface FilmCardProps {
  film: Film
  index: number
  priority?: boolean
}

export function FilmCard({ film, index, priority = false }: FilmCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const filmId = getIdFromUrl(film.url)

  // Obtener el número de episodio en números romanos
  const getEpisodeRoman = (episode: number) => {
    const romans = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]
    return romans[episode - 1] || episode.toString()
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
        <Card className="overflow-hidden h-full transition-all duration-300 hover:shadow-lg">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={`/placeholder.svg?height=600&width=800&text=${encodeURIComponent(
                `Star Wars: Episodio ${getEpisodeRoman(film.episode_id)}`,
              )}`}
              alt={film.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={priority}
              className="object-cover transition-transform duration-500"
              style={{ transform: isHovered ? "scale(1.05)" : "scale(1)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <Badge className="mb-2 bg-yellow-500 hover:bg-yellow-600">
                Episodio {getEpisodeRoman(film.episode_id)}
              </Badge>
              <h3 className="text-xl font-bold text-white">{film.title}</h3>
            </div>
          </div>

          <CardContent className="pt-4">
            <p className="text-sm text-muted-foreground line-clamp-3">{film.opening_crawl}</p>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{film.director}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{film.release_date}</span>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-wrap gap-2 pt-0">
            <Badge variant="outline">
              <FilmIcon className="h-3 w-3 mr-1" />
              {film.characters.length} personajes
            </Badge>
          </CardFooter>
        </Card>
      </Link>
    </motion.div>
  )
}
