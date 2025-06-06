"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getStarship, getPerson, getFilm } from "../../../lib/api"
import type { Starship, People, Film } from "@/types"
import { ArrowLeft, Rocket, Users, FilmIcon, User, Settings, DollarSign, Gauge } from "lucide-react"
import { getIdFromUrl } from "../../../lib/utils"

export default function StarshipDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [starship, setStarship] = useState<Starship | null>(null)
  const [pilots, setPilots] = useState<People[]>([])
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      loadStarshipDetails(params.id as string)
    }
  }, [params.id])

  const loadStarshipDetails = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const starshipData = await getStarship(id)
      setStarship(starshipData)

      // Cargar pilotos
      const pilotPromises = starshipData.pilots.slice(0, 5).map((url) => getPerson(getIdFromUrl(url)  ))
      const pilotsData = await Promise.all(pilotPromises)
      setPilots(pilotsData)

      // Cargar películas
      const filmPromises = starshipData.films.slice(0, 5).map((url) => getFilm(getIdFromUrl(url)))
      const filmsData = await Promise.all(filmPromises)
      setFilms(filmsData)
    } catch (err) {
      setError("Error al cargar los detalles de la nave")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !starship) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Nave no encontrada"}</p>
          <Button onClick={() => router.push("/starships")}>Volver a naves</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.push("/starships")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Rocket className="w-6 h-6" />
                {starship.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Modelo:</strong> {starship.model}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Costo:</strong> {starship.cost_in_credits} créditos
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Gauge className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Velocidad máxima:</strong> {starship.max_atmosphering_speed} km/h
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Tripulación:</strong> {starship.crew}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Pasajeros:</strong> {starship.passengers}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Clase:</strong> {starship.starship_class}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="default">{starship.starship_class}</Badge>
                <Badge variant="secondary">{starship.pilots.length} pilotos</Badge>
                <Badge variant="outline">{starship.films.length} películas</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Especificaciones Técnicas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Longitud:</strong> {starship.length} metros
                </p>
                <p>
                  <strong>Capacidad de carga:</strong> {starship.cargo_capacity} kg
                </p>
                <p>
                  <strong>Consumibles:</strong> {starship.consumables}
                </p>
                <p>
                  <strong>Hiperimpulsor:</strong> {starship.hyperdrive_rating}
                </p>
                <p>
                  <strong>MGLT:</strong> {starship.MGLT}
                </p>
                <p>
                  <strong>Fecha de creación:</strong> {new Date(starship.created).toLocaleDateString()}
                </p>
                <p>
                  <strong>Última edición:</strong> {new Date(starship.edited).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Pilotos */}
      {pilots.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Pilotos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pilots.map((pilot, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{pilot.name}</h3>
                  <p className="text-sm text-muted-foreground">Año de nacimiento: {pilot.birth_year}</p>
                  <p className="text-sm text-muted-foreground">Género: {pilot.gender}</p>
                  <p className="text-sm text-muted-foreground">Altura: {pilot.height} cm</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Películas */}
      {films.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FilmIcon className="w-5 h-5" />
              Películas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {films.map((film, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{film.title}</h3>
                  <p className="text-sm text-muted-foreground">Episodio {film.episode_id}</p>
                  <p className="text-sm text-muted-foreground">{film.release_date}</p>
                  <p className="text-sm text-muted-foreground">Director: {film.director}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
} 