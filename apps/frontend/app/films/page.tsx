import { Suspense } from "react"
import { getFilms } from "@/services/api"
import { SearchBar } from "@/components/search-bar"
import { LoadingFilms } from "@/components/loading-films"
import { FilmCard } from "@/components/film-card"
import PaginationControls from "@/components/pagination-controls"
import { Film, Star } from "lucide-react"

interface FilmsPageProps {
  searchParams: {
    page?: string
    search?: string
  }
}

export default async function FilmsPage({ searchParams }: FilmsPageProps) {
  const page = Number(searchParams.page) || 1
  const search = searchParams.search || "" 

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Star className="h-8 w-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-center">Películas de Star Wars</h1>
          <Star className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="w-24 h-1 bg-yellow-400 rounded-full mb-8"></div>

        <SearchBar initialSearch={search} placeholder="Buscar películas..." />
      </div>

      <Suspense fallback={<LoadingFilms />}>
        <FilmsList page={page} search={search} />
      </Suspense>
    </div>
  )
}

async function FilmsList({ page, search }: { page: number; search: string }) {
  try {
    const { results: films, count, next, previous } = await getFilms(page, search)
    const totalPages = Math.ceil(count / 10)

    if (!films || films.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <Film className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-2xl font-medium text-gray-600">No se encontraron películas</h3>
          {search && (
            <p className="text-gray-500 mt-2">No hay resultados para "{search}". Intenta con otra búsqueda.</p>
          )}
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {films.map((film, index) => (
            <FilmCard key={film.url} film={film} index={index} priority={index < 3} />
          ))}
        </div>

        <PaginationControls
          currentPage={page}
          totalPages={totalPages}
          hasNextPage={!!next}
          hasPrevPage={!!previous}
          search={search}
        />
      </>
    )
  } catch (error) {
    console.error("Error fetching films:", error)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-2xl font-medium text-red-600 mb-2">Error al cargar las películas</h3>
        <p className="text-gray-600">
          Ha ocurrido un problema al obtener los datos. Por favor, intenta de nuevo más tarde.
        </p>
      </div>
    )
  }
}
