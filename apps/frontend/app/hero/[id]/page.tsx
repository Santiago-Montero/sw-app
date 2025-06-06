"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LoadingSpinner } from "@/components/loading-spinner"
import { fetchPerson, fetchFilm, fetchPlanet, fetchStarship } from "@/lib/api"
import type { People, Film, Planet, Starship } from "@/types"
import { ArrowLeft, User, Calendar, Ruler, Weight, Eye, Palette, MapPin, FilmIcon, Rocket } from "lucide-react"

export default function HeroDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [hero, setHero] = useState<People | null>(null)
  const [homeworld, setHomeworld] = useState<Planet | null>(null)
  const [films, setFilms] = useState<Film[]>([])
  const [starships, setStarships] = useState<Starship[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (params.id) {
      loadHeroDetails(params.id as string)
    }
  }, [params.id])

  const loadHeroDetails = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const heroData = await fetchPerson(id)
      setHero(heroData)

      // Cargar planeta natal
      if (heroData.homeworld) {
        const planetData = await fetchPlanet(heroData.homeworld)
        setHomeworld(planetData)
      }

      // Cargar películas
      const filmPromises = heroData.films.slice(0, 5).map((url) => fetchFilm(url))
      const filmsData = await Promise.all(filmPromises)
      setFilms(filmsData)

      // Cargar naves
      const starshipPromises = heroData.starships.slice(0, 5).map((url) => fetchStarship(url))
      const starshipsData = await Promise.all(starshipPromises)
      setStarships(starshipsData)
    } catch (err) {
      setError("Error al cargar los detalles del héroe")
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error || !hero) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error || "Héroe no encontrado"}</p>
          <Button onClick={() => router.push("/")}>Volver al inicio</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Button variant="outline" onClick={() => router.push("/")} className="mb-6">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Volver
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Información principal */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <User className="w-6 h-6" />
                {hero.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Nacimiento:</strong> {hero.birth_year}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Ruler className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Altura:</strong> {hero.height} cm
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Weight className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Peso:</strong> {hero.mass} kg
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Ojos:</strong> {hero.eye_color}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Cabello:</strong> {hero.hair_color}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm">
                    <strong>Género:</strong> {hero.gender}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-4">
                <Badge variant="default">{hero.gender}</Badge>
                <Badge variant="secondary">{hero.films.length} películas</Badge>
                <Badge variant="outline">{hero.starships.length} naves</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Planeta natal */}
        <div>
          {homeworld && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Planeta Natal
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-semibold text-lg mb-2">{homeworld.name}</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Clima:</strong> {homeworld.climate}
                  </p>
                  <p>
                    <strong>Terreno:</strong> {homeworld.terrain}
                  </p>
                  <p>
                    <strong>Población:</strong> {homeworld.population}
                  </p>
                  <p>
                    <strong>Gravedad:</strong> {homeworld.gravity}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

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
              {films.map((film) => (
                <div key={film.url} className="border rounded-lg p-4">
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
              {starships.map((starship) => (
                <div key={starship.url} className="border rounded-lg p-4">
                  <h3 className="font-semibold">{starship.name}</h3>
                  <p className="text-sm text-muted-foreground">{starship.model}</p>
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
