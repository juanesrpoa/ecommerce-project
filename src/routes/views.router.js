import { Router } from "express";
import { productsService, cartsService } from "../services/index.js";

const router = Router();

// vista principal con todos los productos y paginacion
router.get("/products", async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const result = await productsService.getAll({ limit, page, sort, query });
        res.render("index", {
            products: result.docs.map(p => p.toObject()),
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

// vista de un producto por id
router.get("/products/:pid", async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsService.getById(pid);
        if (!product) return res.status(404).send({ status: "error", message: "producto no encontrado" });
        res.render("product", { 
            product: product.toObject(),
            cartId: "69e083a233b983537f74e266"
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

// vista de un carrito por id
router.get("/carts/:cid", async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        res.render("cart", { cart: cart.toObject(), products: cart.products });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
});

export default router;