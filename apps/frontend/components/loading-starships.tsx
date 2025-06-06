import { Skeleton } from "@/components/ui/skeleton"

export function LoadingStarships() {
  // Crear un array de 6 elementos para los esqueletos de carga
  const skeletons = Array.from({ length: 6 }, (_, i) => i)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {skeletons.map((index) => (
        <div key={index} className="overflow-hidden rounded-lg border">
          <Skeleton className="h-52 w-full" />
          <div className="p-4 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </div>
            <div className="flex gap-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
