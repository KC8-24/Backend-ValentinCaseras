import { productModel } from "./models/product.model.js"

export default class ProductManager {

    async getAll(limit, page, filter, sort) {
        return await productModel.paginate(filter, { limit: limit, page: page, sort: sort, lean: true })
    }

    async getById(id) {
        return await productModel.findById(id)
    }

    async add(product) {
        return await productModel.create(product)
    }

    async update(id, updatedFields) {
        const updatedProduct = await productModel.findByIdAndUpdate(
            id,
            updatedFields,
            { new: true }
        )

        if (!updatedProduct) return null

        return updatedProduct
    }

    async delete(id) {
        return await productModel.findByIdAndDelete(id)
    }
}