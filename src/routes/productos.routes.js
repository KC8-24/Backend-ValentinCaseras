import { Router } from "express";
import ProductManager from "../services/ProductManager.js";

const router = Router()
const productManager = new ProductManager()

router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined
        const products = await productManager.getAll(limit)
        res.status(200).json({success: true, data: products})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al obtener los productos"})
    }
})

router.get("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const product = await productManager.getById(productId)

        if (!product) {
            return res.status(404).json({success: false, error: "Producto NO encontrado"})
        } else {
            res.status(200).json({success: true, data: product})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al obtener el producto"})
    }
})

router.post("/", async (req, res) => {
    try {
        const { title, description, code, price, stock, category, thumbnail } = req.body

        if (!title || !description || !code || !price || !stock || !category) {
            return res.status(400).send("Uno de los datos esta incompleto")
        }

        const newProduct = await productManager.add({ title, description, code, price, stock, category, thumbnail })

        res.status(201).json({success: true, data: newProduct})
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al agregar el producto"})
    }
})

router.put("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const updatedProduct = await productManager.update(productId, req.body)

        if (!updatedProduct) {
            return res.status(404).json({success: false, error: "Producto NO encontrado"})
        } else {
            res.status(200).json({success: true, data: updatedProduct})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al actualizar el producto"})
    }
})

router.delete("/:pid", async (req, res) => {
    try {
        const productId = parseInt(req.params.pid)
        const deletedProduct = await productManager.delete(productId)

        if (!deletedProduct) {
            return res.status(404).json({success: false, error: "Producto NO encontrado"})
        } else {
            res.status(200).json({success: true, data: deletedProduct})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({success: false, error: "ERROR! al eliminar el producto"})
    }
})


export default router