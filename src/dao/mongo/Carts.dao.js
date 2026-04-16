import cartModel from "../../models/Cart.js";

export default class CartDao {
    async getAll() {
        return await cartModel.find();
    }
    async getById(id) {
        return await cartModel.findById(id).populate("products.product");
    }
    async save(doc) {
        return await cartModel.create(doc);
    }
    async update(id, doc) {
        return await cartModel.findByIdAndUpdate(id, { $set: doc }, { new: true });
    }
    async delete(id) {
        return await cartModel.findByIdAndDelete(id);
    }
}