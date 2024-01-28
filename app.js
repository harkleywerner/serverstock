import express from "express"
import configServer from "./src/config/server.js"
import cors from "cors"
import usuarios from "./src/router/usuarios.router.js"
import errorGlobalMiddleware from "./src/middlewares/errorGlobal.middleware.js"
import productos from "./src/controllers/productos.controller.js"
import categorias from "./src/controllers/categorias.controller.js"

configServer()
const app = express()
const port = 3000

app.use(express.json())

app.use(cors())

app.use("/usuarios", usuarios)
app.use("/productos", productos)
app.use("/categorias", categorias)

app.use(errorGlobalMiddleware);

app.listen(port, () => {
    console.log(`Sever on en el puerto ${port}`)
})