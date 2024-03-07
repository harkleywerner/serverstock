import express from "express"
import configServer from "./src/config/server.js"
import errorGlobalMiddleware from "./src/middlewares/errorGlobal.middleware.js"
import rateLimitGloalMiddleware from "./src/middlewares/rateLimitGlobal.middleware.js"
import detalleDeStock from "./src/router/detalleDeStock.router.js"
import productos from "./src/router/productos.router.js"
import stock from "./src/router/stock.router.js"
import sucursales from "./src/router/sucursales.router.js"
import trassaciones from "./src/router/trassaciones.router.js"
import usuarios from "./src/router/usuarios.router.js"
import { BackEndError } from "./src/utils/errors.utils.js"
import corsConfigMiddleware from "./src/middlewares/corsConfig.middleware.js"
import sucursalSessionMiddleware from "./src/middlewares/sucursalSession.middleware.js.js"
import { validationSucursalSessionMiddleware } from "./src/middlewares/validationSucursalSession.middleware.js"

configServer()

const app = express()
const port = process.env.PORT
const limiter = rateLimitGloalMiddleware()


app.use(express.json())

app.use(corsConfigMiddleware());
app.use(sucursalSessionMiddleware())

/* 
INSTALAR HELMENT PARA CSP
*/

app.get("/", (req, res) => {
    res.status(301).redirect("/sucursales")
})



app.use("/", limiter)
app.use("/stock", validationSucursalSessionMiddleware, stock)
app.use("/sucursales", sucursales)
app.use("/stock/usuarios", usuarios)
app.use("/stock/trassaciones", trassaciones)
app.use("/stock/productos", productos)
app.use("/stock/detalleDeStock", detalleDeStock)
app.get("/session", (req, res, next) => {
    const { sucursal_info, usuario_info } = req.session

    const data = {
        sucursal_info,
        usuario_info
    }

    res.status(200).json({ tipo: "success", data })

})

app.use((req, res, next) => {
    const error = new BackEndError("Ruta no encontrada", 404)
    next(error)
})


app.use(errorGlobalMiddleware);

app.listen(port, () => {
    console.log(`Server on en el puerto ${port}`)
})