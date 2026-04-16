import productModel from "../../models/Product.js";

export default class ProductDao {
    async getAll({ limit = 10, page = 1, sort, query } = {}) {
        const filter = {};
        if (query) {
            // buscar por categoria o disponibilidad
            if (query === "true" || query === "false") {
                filter.available = query === "true";
            } else {
                filter.category = query;
            }
        }
        const options = {
            limit: Number(limit),
            page: Number(page),
            sort: sort ? { price: sort === "asc" ? 1 : -1 } : undefined
        };
        return await productModel.paginate(filter, options);
    }
    async getById(id) {
        return await productModel.findById(id);
    }
    async save(doc) {
        return await productModel.create(doc);
    }
    async update(id, doc) {
        return await productModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }
    async delete(id) {
        return await productModel.findByIdAndDelete(id);
    }
}