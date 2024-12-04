import express from "express"
import handlebars  from "express-handlebars"
import ProductManager from "./services/ProductManager.js"
import productsRoutes from './routes/products.routes.js'
import cartsRoutes from './routes/carts.routes.js'
import viewsRoutes from "./routes/views.routes.js"
import __dirname from "./utils.js"
import { Server } from "socket.io"

const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, () => console.log(`Escuchando en el puerto: ${PORT}`))

const io = new Server(httpServer)

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.get("/ping", (req, res) => {
    res.send("pong")
})

app.use("/api/products", productsRoutes)
app.use("/api/carts", cartsRoutes)
app.use("/", viewsRoutes)

const productManager = new ProductManager()

io.on("connection", async socket => {
    const products = await productManager.getAll()
    io.emit("allProducts", products)

    socket.on("newProduct", data => {
        console.log("Recibido:" + JSON.stringify(data, null, 2))
        products.push(data)
        io.emit("allProducts", products)
    })

    socket.on("deletedProduct", data => {
        productManager.delete(data)
        io.emit("allProducts", products)
    })
})