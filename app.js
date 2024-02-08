import express from "express"
import configServer from "./src/config/server.js"
import cors from "cors"
import usuarios from "./src/router/usuarios.router.js"
import errorGlobalMiddleware from "./src/middlewares/errorGlobal.middleware.js"
import productos from "./src/router/productos.router.js"
import sucursales from "./src/router/sucursales.router.js"
import stock from "./src/router/stock.router.js"
import trassaciones from "./src/router/trassaciones.router.js"
import { BackEndError } from "./src/utils/errors.utils.js"
import rateLimitGloalMiddleware from "./src/middlewares/rateLimitGlobal.middleware.js"

configServer()

const app = express()
const port = process.env.PORT
const limiter = rateLimitGloalMiddleware()

app.use(express.json())

app.use(cors())

app.use("/", limiter)


app.get("/", (req, res) => {
    res.status(301).redirect("/sucursales")
})

app.use("/usuarios", usuarios)
app.use("/trassaciones", trassaciones)
app.use("/productos", productos)
app.use("/stock", stock)
app.use("/sucursales", sucursales)

app.use((req, res, next) => {
    const error = new BackEndError("Ruta no encontrada", 404)
    next(error)
})

app.get("/", (req, res) => {
    res.status(301).redirect("/sucursales")
})


app.use(errorGlobalMiddleware);

app.listen(port, () => {
    console.log(`Sever on en el puerto ${port}`)
})