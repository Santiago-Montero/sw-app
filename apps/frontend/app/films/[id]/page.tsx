"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getFilm, getPerson, getPlanet, getStarship } from "../../../lib/api"  
import type { Film, People, Planet, Starship } from "@/types"
import { ArrowLeft, FilmIcon, Users, Globe, Rocket, Calendar, User, Video } from "lucide-react"
import { getIdFromUrl } from "../../../lib/utils"

export default function FilmDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [film, setFilm] = useState<Film | null>(null)
  const [characters, setCharacters] = useState<People[]>([])
  const [planets, setPlanets] = useState<Planet[]>([])
  const [starships, setStarships] = useState<Starship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      loadFilmDetails(params.id as string)
    }
  }, [params.id])

  const loadFilmDetails = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const filmData = await getFilm(id)
      setFilm(filmData)

      // Cargar personajes
      const characterPromises = filmData.characters.slice(0, 5).map((url) => getPerson(getIdFromUrl(url)))
      const charactersData = await Promise.all(characterPromises)
      setCharacters(charactersData)

      // Cargar planetas
      const planetPromises = filmData.planets.slice(0, 5).map((url) => getPlanet(getIdFromUrl(url)))
      const planetsData = await Promise.all(planetPromises)
      setPlanets(planetsData)

      // Cargar naves
      const starshipPromises = filmData.starships.slice(0, 5).map((url) => getStarship(getIdFromUrl(url)))
      const starshipsData = await Promise.all(starshipPromises)
      setStarships(starshipsData)
    } catch (err) {
      setError("Error al cargar los detalles de la película")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !film) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Película no encontrada"}</p>
          <Button onClick={() => router.push("/films")}>Volver a películas</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.push("/films")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <FilmIcon className="w-6 h-6" />
                {film.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Fecha de lanzamiento:</strong> {film.release_date}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Director:</strong> {film.director}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Productor:</strong> {film.producer}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Video className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Episodio:</strong> {film.episode_id}
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-semibold mb-2">Sinopsis</h3>
                <p className="text-sm text-muted-foreground">{film.opening_crawl}</p>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="default">Episodio {film.episode_id}</Badge>
                <Badge variant="secondary">{film.characters.length} personajes</Badge>
                <Badge variant="outline">{film.planets.length} planetas</Badge>
                <Badge variant="outline">{film.starships.length} naves</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FilmIcon className="w-5 h-5" />
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Fecha de creación:</strong> {new Date(film.created).toLocaleDateString()}
                </p>
                <p>
                  <strong>Última edición:</strong> {new Date(film.edited).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Personajes */}
      {characters.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Personajes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {characters.map((character, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{character.name}</h3>
                  <p className="text-sm text-muted-foreground">Año de nacimiento: {character.birth_year}</p>
                  <p className="text-sm text-muted-foreground">Género: {character.gender}</p>
                  <p className="text-sm text-muted-foreground">Altura: {character.height} cm</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Planetas */}
      {planets.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5" />
              Planetas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {planets.map((planet, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{planet.name}</h3>
                  <p className="text-sm text-muted-foreground">Clima: {planet.climate}</p>
                  <p className="text-sm text-muted-foreground">Terreno: {planet.terrain}</p>
                  <p className="text-sm text-muted-foreground">Población: {planet.population}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Naves */}
      {starships.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Naves Espaciales
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {starships.map((starship, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{starship.name}</h3>
                  <p className="text-sm text-muted-foreground">Modelo: {starship.model}</p>
                  <p className="text-sm text-muted-foreground">Clase: {starship.starship_class}</p>
                  <p className="text-sm text-muted-foreground">Tripulación: {starship.crew}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 