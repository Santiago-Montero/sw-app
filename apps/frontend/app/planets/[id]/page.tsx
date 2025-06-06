"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { getPlanet, getPerson, getFilm } from "../../../lib/api"
import type { Planet, People, Film } from "@/types"
import { ArrowLeft, Globe, Users, Droplets, Mountain, FilmIcon, User, MapPin } from "lucide-react"
import { getIdFromUrl } from "../../../lib/utils"

export default function PlanetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [planet, setPlanet] = useState<Planet | null>(null)
  const [residents, setResidents] = useState<People[]>([])
  const [films, setFilms] = useState<Film[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      loadPlanetDetails(params.id as string)
    }
  }, [params.id])

  const loadPlanetDetails = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const planetData = await getPlanet(id)
      setPlanet(planetData)

      // Cargar residentes
      const residentPromises = planetData.residents.slice(0, 5).map((url) => getPerson(getIdFromUrl(url)))
      const residentsData = await Promise.all(residentPromises)
      setResidents(residentsData)

      // Cargar películas
      const filmPromises = planetData.films.slice(0, 5).map((url) => getFilm(getIdFromUrl(url)))
      const filmsData = await Promise.all(filmPromises)
      setFilms(filmsData)
    } catch (err) {
      setError("Error al cargar los detalles del planeta")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !planet) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Planeta no encontrado"}</p>
          <Button onClick={() => router.push("/planets")}>Volver a planetas</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.push("/planets")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Globe className="w-6 h-6" />
                {planet.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplets className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Clima:</strong> {planet.climate}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Mountain className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Terreno:</strong> {planet.terrain}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Población:</strong> {planet.population}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Gravedad:</strong> {planet.gravity}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Diámetro:</strong> {planet.diameter} km
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Período orbital:</strong> {planet.orbital_period} días
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="default">{planet.climate}</Badge>
                <Badge variant="secondary">{planet.residents.length} residentes</Badge>
                <Badge variant="outline">{planet.films.length} películas</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Información adicional */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Información Adicional
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <p>
                  <strong>Período de rotación:</strong> {planet.rotation_period} horas
                </p>
                <p>
                  <strong>Superficie de agua:</strong> {planet.surface_water}%
                </p>
                <p>
                  <strong>Fecha de creación:</strong> {new Date(planet.created).toLocaleDateString()}
                </p>
                <p>
                  <strong>Última edición:</strong> {new Date(planet.edited).toLocaleDateString()}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Residentes */}
      {residents.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Residentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {residents.map((resident, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{resident.name}</h3>
                  <p className="text-sm text-muted-foreground">Año de nacimiento: {resident.birth_year}</p>
                  <p className="text-sm text-muted-foreground">Género: {resident.gender}</p>
                  <p className="text-sm text-muted-foreground">Altura: {resident.height} cm</p>
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