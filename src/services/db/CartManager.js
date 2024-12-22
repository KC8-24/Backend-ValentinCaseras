export default class CartManager {
    constructor() {
        this.carts = []
    }

    async getAll() {
        return this.carts
    }

    async getById(id) {
        return this.carts.find(cart => cart.id === id)
    }

    async create() {
        const newCart = {
            id: Math.floor(Math.random() * 1000),
            products: []
        }

        this.carts.push(newCart)

        this.saveToFile()

        return newCart
    }

    async addProduct(cartId, productId) {
        const productToAdd = this.products.find(prod => prod.id === productId)
        const cartToFind = this.carts.find(cart => cart.id === cartId)

        if (!cartToFind) {
            return {success: false, error: "No se encontro carrito"}
        } 

        if (!productToAdd) {
            return {success: false, error: "No se encontro el producto"}
        }

        const isAlreadyAdded = cartToFind.products.find(prod => prod.id === productId)

        if (isAlreadyAdded) {
            isAlreadyAdded.qty++
        } else {
            cartToFind.products.push({id: productId, qty: 1})
        }

        this.saveToFile()

        return {success: true, products: cartToFind.products}
    }
}