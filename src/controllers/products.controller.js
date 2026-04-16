import { productsService } from "../services/index.js";

// obtener todos los productos con filtros, paginacion y ordenamiento
const getAllProducts = async (req, res) => {
    try {
        const { limit, page, sort, query } = req.query;
        const result = await productsService.getAll({ limit, page, sort, query });
        const baseUrl = `${req.protocol}://${req.get("host")}/api/products`;

        res.status(200).send({
            status: "success",
            payload: result.docs.map(p => p.toObject()),
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.hasPrevPage ? `${baseUrl}?page=${result.prevPage}&limit=${limit || 10}` : null,
            nextLink: result.hasNextPage ? `${baseUrl}?page=${result.nextPage}&limit=${limit || 10}` : null
        });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// obtener un producto por id
const getProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsService.getById(pid);
        if (!product) return res.status(404).send({ status: "error", message: "producto no encontrado" });
        res.status(200).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// crear un producto
const createProduct = async (req, res) => {
    try {
        const { title, description, price, category, stock } = req.body;
        if (!title || !description || !price || !category || !stock)
            return res.status(400).send({ status: "error", message: "faltan campos obligatorios" });
        const product = await productsService.save({ title, description, price, category, stock });
        res.status(201).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsService.update(pid, req.body);
        if (!product) return res.status(404).send({ status: "error", message: "producto no encontrado" });
        res.status(200).send({ status: "success", payload: product });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

// eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productsService.delete(pid);
        if (!product) return res.status(404).send({ status: "error", message: "producto no encontrado" });
        res.status(200).send({ status: "success", message: "producto eliminado" });
    } catch (error) {
        res.status(500).send({ status: "error", message: error.message });
    }
};

export default { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct };