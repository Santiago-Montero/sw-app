"use client"

import type React from "react"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Loader2 } from "lucide-react"

interface SearchBarProps {
  initialSearch?: string
  placeholder?: string
}

export function SearchBar({ initialSearch = "", placeholder = "Buscar..." }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState(initialSearch)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(() => {
      const params = new URLSearchParams()
      if (searchTerm) {
        params.set("search", searchTerm)
      }
      params.set("page", "1") // Reset to first page on new search

      router.push(`?${params.toString()}`)
    })
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-md gap-2">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>
      <Button type="submit" disabled={isPending} className="bg-yellow-500 hover:bg-yellow-600">
        {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Buscar"}
      </Button>
    </form>
  )
}
