import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getIdFromUrl(url: string): string {
  const matches = url.match(/\/(\d+)\/?$/)
  return matches ? matches[1] : ""
}
