import express from "express"
import configServer from "./src/config/server.js"
import cors from "cors"
import usuarios from "./src/router/usuarios.router.js"
import errorGlobalMiddleware from "./src/middlewares/errorGlobal.middleware.js"
import productos from "./src/router/productos.router.js"
import sucursales from "./src/router/sucursales.router.js"
import stock from "./src/router/stock.router.js"
import trassaciones from "./src/router/trassaciones.router.js"

configServer()
const app = express()
const port = 3000

app.use(express.json())

app.use(cors())

app.use("/usuarios", usuarios)
app.use("/trassaciones",trassaciones)
app.use("/productos", productos)
app.use("/stock", stock)
app.use("/sucursales", sucursales)

app.use(errorGlobalMiddleware);

app.listen(port, () => {
    console.log(`Sever on en el puerto ${port}`)
})