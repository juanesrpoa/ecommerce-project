# Ecommerce Project

Proyecto de ecommerce con productos y carritos hecho con Node.js y MongoDB.

## Tecnologias

- Node.js
- Express
- MongoDB Atlas
- Mongoose
- Handlebars
- mongoose-paginate-v2

## Como correr el proyecto

Instalar todo:
npm install

Crear el .env con esto:
PORT=8080
MONGO_URL=tu_mongo_url

Iniciar:
npm start

## Rutas API

### Productos
- GET /api/products - trae todos los productos (acepta limit, page, sort, query)
- GET /api/products/:pid - trae un producto por id
- POST /api/products - crea un producto
- PUT /api/products/:pid - actualiza un producto
- DELETE /api/products/:pid - elimina un producto

### Carritos
- POST /api/carts - crea un carrito
- GET /api/carts/:cid - trae un carrito por id con productos completos
- POST /api/carts/:cid/products/:pid - agrega un producto al carrito
- DELETE /api/carts/:cid/products/:pid - elimina un producto del carrito
- PUT /api/carts/:cid - actualiza todos los productos del carrito
- PUT /api/carts/:cid/products/:pid - actualiza la cantidad de un producto
- DELETE /api/carts/:cid - elimina todos los productos del carrito

## Vistas

- /products - lista de productos con paginacion
- /products/:pid - detalle de un producto
- /carts/:cid - vista del carrito