import ProductDao from "../dao/mongo/Products.dao.js";
import CartDao from "../dao/mongo/Carts.dao.js";

export const productsService = new ProductDao();
export const cartsService = new CartDao();