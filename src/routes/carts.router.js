import { Router } from "express";
import cartsController from "../controllers/carts.controller.js";

const router = Router();

// crear un carrito
router.post("/", cartsController.createCart);

// obtener un carrito por id con productos completos
router.get("/:cid", cartsController.getCart);

// agregar producto al carrito
router.post("/:cid/products/:pid", cartsController.addProduct);

// eliminar un producto del carrito
router.delete("/:cid/products/:pid", cartsController.deleteProduct);

// actualizar todos los productos del carrito
router.put("/:cid", cartsController.updateCart);

// actualizar cantidad de un producto en el carrito
router.put("/:cid/products/:pid", cartsController.updateProductQuantity);

// eliminar todos los productos del carrito
router.delete("/:cid", cartsController.clearCart);

export default router;