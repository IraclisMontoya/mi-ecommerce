# Café Origen — Frontend

Tienda en línea de café tostado, construida con React. Catálogo de productos, autenticación de usuarios, carrito persistente y checkout con métodos de pago simulados.

**Demo en vivo:** https://mi-ecommerce-o3kt.onrender.com
**API (backend):** https://github.com/IraclisMontoya/mi-ecommerce-api

> Nota: el sitio está en un plan gratuito de hosting. Si no ha recibido visitas recientemente, la primera carga puede tardar unos segundos mientras el servidor "despierta".

## Funcionalidades

- Catálogo de productos conectado a una API real (MongoDB vía backend propio)
- Registro e inicio de sesión con JWT, rutas protegidas
- Carrito de compras persistente por usuario (se guarda en la base de datos, no solo en el navegador)
- Checkout con dirección de envío, selección de método de pago (tarjeta, PayPal, Apple Pay, OXXO) y validación de formato de tarjeta (algoritmo de Luhn)
- Manejo de errores con Error Boundary global
- Pruebas automatizadas con Vitest y React Testing Library
- Entornos separados para desarrollo y producción
- Despliegue continuo: cada cambio subido a `main` se publica automáticamente

## Stack técnico

React + Vite, React Router, CSS Modules, Vitest + React Testing Library, fetch API para consumo del backend.

## Cómo correrlo localmente

```
npm install
npm run dev
```

Requiere un archivo `.env.development` con la variable `VITE_API_URL` apuntando al backend (local o desplegado).

## Estructura del proyecto

```
src/
  components/   componentes reutilizables (Header, Footer, ProductCard, ErrorBoundary...)
  pages/        vistas de cada ruta (Home, Products, ProductDetail, Cart, Checkout...)
  services/     funciones que hablan con la API (fetch)
  hooks/        lógica reutilizable (useFetch, useCart)
  utils/        funciones puras (cálculo de totales, validación de tarjeta)
```

## Documentación relacionada

Ver [POSTMORTEM.md](https://github.com/IraclisMontoya/mi-ecommerce-api/blob/main/POSTMORTEM.md) en el repositorio del backend para una reflexión sobre los retos técnicos del proyecto y las lecciones aprendidas.
