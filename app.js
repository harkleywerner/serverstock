import express from "express"
import configServer from "./src/config/server.js"
import errorGlobalMiddleware from "./src/middlewares/errorGlobal.middleware.js"
import rateLimitGloalMiddleware from "./src/middlewares/rateLimitGlobal.middleware.js"
import detalleDeStock from "./src/router/detalleDeStock.router.js"
import productos from "./src/router/productos.router.js"
import stock from "./src/router/stock.router.js"
import sucursales from "./src/router/sucursales.router.js"
import transsaciones from "./src/router/transsaciones.router.js"
import usuarios from "./src/router/usuarios.router.js"
import { BackEndError } from "./src/utils/errors.utils.js"
import corsConfigMiddleware from "./src/middlewares/corsConfig.middleware.js"
import sessionMiddleware from "./src/middlewares/session.middleware.js.js"
import { validationSucursalSessionMiddleware } from "./src/middlewares/validationSucursalSession.middleware.js"
import { validationSucursalLoggeadaMiddleware } from "./src/middlewares/validationSucursalLoggeada.middleware.js"
import { validationUsuarioSessionMiddleware } from "./src/middlewares/validationUsuarioSession.middleware.js"
import { sessionDeveloperMiddleware } from "./src/middlewares/sessionDeveloper.middleware.js"
import helmet from "helmet"

configServer()

const app = express()
const port = process.env.PORT
const limiter = rateLimitGloalMiddleware()


app.use(express.json())
app.use(corsConfigMiddleware());
app.use(sessionMiddleware())
app.use(helmet())

app.get("/", (req, res) => {
    res.status(301).redirect("/sucursales")
})


//Las validaciones pasan por 3 capas.
//1-Primero se valida si hay una sucursal con session.
//2-Luego se verifica en usuarios  si hay una sucursal con loggeado en true.
//3-Finalmente verifica en las rutas restringidas para el usuario si tiene alguna sessesion activa.

app.use("/", sessionDeveloperMiddleware, limiter)
app.use("/sucursales", sucursales)
app.use("/usuarios", validationSucursalLoggeadaMiddleware, usuarios)
app.use("/stock", validationSucursalSessionMiddleware, stock)
app.use("/stock/transsaciones", validationUsuarioSessionMiddleware, transsaciones)
app.use("/stock/productos", productos)
app.use("/stock/detalleDeStock", detalleDeStock)

app.get("/session", (req, res, next) => {

    const { sucursal_info, usuario_info } = req.session

    const data = {
        sucursal_info,
        usuario_info,
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