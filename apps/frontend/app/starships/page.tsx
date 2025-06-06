import { Suspense } from "react"
import { getStarships } from "../../lib/api"
import { SearchBar } from "../../components/search-bar"
import { LoadingHeroes } from "../../components/loading-heroes"
import { Star, Rocket } from "lucide-react"
import PaginationControls from "../../components/pagination-controls"
import { StarshipCard } from "../../components/starship-card"

interface StarshipsPageProps {
  searchParams: {
    page?: string
    search?: string
  }
}

export default async function StarshipsPage({ searchParams }: StarshipsPageProps) {
  const page = Number(searchParams.page) || 1
  const search = searchParams.search || ""

  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex flex-col items-center justify-center mb-12">
        <div className="flex items-center gap-3 mb-4">
          <Star className="h-8 w-8 text-yellow-400" />
          <h1 className="text-4xl font-bold text-center">Naves Espaciales de Star Wars</h1>
          <Star className="h-8 w-8 text-yellow-400" />
        </div>
        <div className="w-24 h-1 bg-yellow-400 rounded-full mb-8"></div>

        <SearchBar initialSearch={search} />
      </div>

      <Suspense fallback={<LoadingHeroes />}>
        <StarshipsList page={page} search={search} />
      </Suspense>
    </div>
  )
}

async function StarshipsList({ page, search }: { page: number; search: string }) {
  try {
    const { results: starships, count, next, previous } = await getStarships(page, search)
    const totalPages = Math.ceil(count / 10)

    if (starships.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16">
          <Rocket className="h-16 w-16 text-gray-400 mb-4" />
          <h3 className="text-2xl font-medium text-gray-600">No se encontraron naves espaciales</h3>
          {search && (
            <p className="text-gray-500 mt-2">No hay resultados para "{search}". Intenta con otra búsqueda.</p>
          )}
        </div>
      )
    }

    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {starships.map((starship, index) => (
            <StarshipCard
              key={starship.url}
              starship={starship}
              index={index}
              priority={index < 4}
            />
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
    console.error("Error fetching starships:", error)
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h3 className="text-2xl font-medium text-red-600 mb-2">Error al cargar las naves espaciales</h3>
        <p className="text-gray-600">
          Ha ocurrido un problema al obtener los datos. Por favor, intenta de nuevo más tarde.
        </p>
      </div>
    )
  }
}
