import { 
  Film, 
  People, 
  Planet, 
  Starship, 
  ApiResponse 
} from '../types'

const BASE_URL = process.env.NEXT_PUBLIC_API_URL

export async function getPeople(page = 1, search = ''): Promise<ApiResponse<People>> {
  const res = await fetch(`${BASE_URL}/people/?page=${page}&search=${search}`);
  return await res.json();
}

export async function getPerson(id: string): Promise<People> {
  const res = await fetch(`${BASE_URL}/people/${id}/`);
  return await res.json();
}

export async function getFilms(page = 1, search = ''): Promise<ApiResponse<Film>> {
  console.log(BASE_URL)
  const res = await fetch(`${BASE_URL}/film/?page=${page}&search=${search}`); 
  return await res.json();
}

export async function getFilm(id: string): Promise<Film> {
  const res = await fetch(`${BASE_URL}/film/${id}/`);
  return await res.json();
}

export async function getPlanets(page = 1, search = ''): Promise<ApiResponse<Planet>> {
  const res = await fetch(`${BASE_URL}/planet/?page=${page}&search=${search}`);
  return await res.json();
}

export async function getPlanet(id: string): Promise<Planet> {
  const res = await fetch(`${BASE_URL}/planet/${id}/`);
  return await res.json();
}

export async function getStarships(page = 1, search = ''): Promise<ApiResponse<Starship>> {
  const res = await fetch(`${BASE_URL}/starship/?page=${page}&search=${search}`);
  return await res.json();
}

export async function getStarship(id: string): Promise<Starship> {
  const res = await fetch(`${BASE_URL}/starship/${id}/`);
  return await res.json();
}