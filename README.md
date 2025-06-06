# Star Wars Application ( sw-app )

Esta aplicación es una plataforma que permite explorar el universo de Star Wars, mostrando información sobre personajes, planetas, naves espaciales y películas. El backend consume la API pública de Star Wars (SWAPI) y proporciona una interfaz REST para el frontend.

## Requisitos Previos

- Node.js (v20 o superior)
- npm o yarn o pnpm (recomendado)

## Variables de Entorno

### Backend (.env)

- `PORT`: Puerto en el que se ejecutará el servidor (por defecto: 3000)
- `HTTP_BASE_URL`: URL base de la API de Star Wars (por defecto: https://swapi.dev/api)
- `LOG_LEVEL`: Nivel de registro (info, debug, error, warn)
- `NODE_ENV`: Entorno de ejecución (development, production)
- `LOG_ENABLED`: Indica si se deben mostrar los logs (true, false)

### Frontend (.env)

- `NEXT_PUBLIC_API_URL`: URL base de la API de Star Wars (por defecto: http://localhost:3000)

## Instalación

1. Clonar el repositorio
2. Instalar dependencias

## Estructura del Proyecto

### Backend

- `apps/backend`: Contiene el servidor NestJS
- `apps/backend/src`: Código fuente del backend
- `apps/backend/test`: Pruebas unitarias y de integración
- `apps/backend/src/modules`: Módulos principales del backend
- `apps/backend/src/shared`: Funciones y utilidades compartidas
- `apps/backend/src/main.ts`: Punto de entrada principal del server

### Frontend

- `apps/frontend`: Contiene la aplicación Next.js
- `apps/frontend/src`: Código fuente del frontend
- `apps/frontend/src/components`: Componentes reutilizables
- `apps/frontend/src/pages`: Páginas de la aplicación
- `apps/frontend/src/types`: Tipos de datos compartidos
- `apps/frontend/src/lib`: Funciones y utilidades compartidas
- `apps/frontend/src/app`: Configuración de la aplicación Next.js

## Ejecución

### Backend

1. Ejecutar el servidor de desarrollo
2. Ejecutar las pruebas unitarias y de integración
3. Ejecutar el server  (npm run start:dev)

### Frontend

1. Ejecutar el servidor de desarrollo
2. Ejecutar la app (npm run dev)



### URLS

- frontend: https://sw-f0bxg8p25-santiagomonteros-projects.vercel.app/ (desplegado en vercel)
- backend: https://sw-app-h2lo.onrender.com/planet (desplegado en render)

