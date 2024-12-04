import { Router } from "express";
import CartManager from "../services/CartManager.js";

const router = Router()
const cartManager = new CartManager()

router.get("/", async (req, res) => {
    try {
        const carts = await cartManager.getAll()
        res.status(200).json({success: true, data: carts})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al obtener los carritos"})
    }
})

router.get("/:cid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const cart = await cartManager.getById(cartId)

        if (!cart) {
            return res.status(404).json({success: false, error: "Carrito NO encontrado"})
        } else {
            res.status(200).json({success: true, data: cart.products})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al obtener el carrito"})
    }
})

router.post("/", async (req, res) => {
    try {
        const newCart = await cartManager.create()
        res.status(201).json({success: true, data: newCart})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al crear el carrito"})
    }
})

router.post("/:cid/product/:pid", async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid)
        const productId = parseInt(req.params.pid)
        const addProduct = await cartManager.addProduct(cartId, productId)

        if (!addProduct.success) {
            return res.status(404).json({success: false, error: addProduct.error})
        } else {
            res.status(200).json({success: true, data: addProduct.products})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al agregar productos al carrito"})
    }
})

export default router