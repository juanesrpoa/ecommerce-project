import { cartsService, productsService } from "../services/index.js";

// crear un carrito
const createCart = async (req, res) => {
    try {
        const cart = await cartsService.save({ products: [] });
        res.status(201).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// obtener un carrito por id con productos completos
const getCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// agregar producto al carrito
const addProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        const product = await productsService.getById(pid);
        if (!product) return res.status(404).send({ status: "error", message: "producto no encontrado" });

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);
        if (productIndex >= 0) {
            cart.products[productIndex].quantity++;
        } else {
            cart.products.push({ product: pid, quantity: 1 });
        }
        await cartsService.update(cid, { products: cart.products });
        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// eliminar un producto del carrito
const deleteProduct = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        cart.products = cart.products.filter(p => p.product._id.toString() !== pid);
        await cartsService.update(cid, { products: cart.products });
        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// actualizar todos los productos del carrito
const updateCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const { products } = req.body;
        const cart = await cartsService.update(cid, { products });
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// actualizar cantidad de un producto en el carrito
const updateProductQuantity = async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartsService.getById(cid);
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        const productIndex = cart.products.findIndex(p => p.product._id.toString() === pid);
        if (productIndex < 0) return res.status(404).send({ status: "error", message: "producto no encontrado en el carrito" });
        cart.products[productIndex].quantity = quantity;
        await cartsService.update(cid, { products: cart.products });
        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// eliminar todos los productos del carrito
const clearCart = async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartsService.update(cid, { products: [] });
        if (!cart) return res.status(404).send({ status: "error", message: "carrito no encontrado" });
        res.status(200).send({ status: "success", payload: cart });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export default { createCart, getCart, addProduct, deleteProduct, updateCart, updateProductQuantity, clearCart };