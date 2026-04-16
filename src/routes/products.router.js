import { Router } from "express";
import productsController from "../controllers/products.controller.js";

const router = Router();

// obtener todos los productos con filtros, paginacion y ordenamiento
router.get("/", productsController.getAllProducts);

// obtener un producto por id
router.get("/:pid", productsController.getProduct);

// crear un producto
router.post("/", productsController.createProduct);

// actualizar un producto
router.put("/:pid", productsController.updateProduct);

// eliminar un producto
router.delete("/:pid", productsController.deleteProduct);

export default router;