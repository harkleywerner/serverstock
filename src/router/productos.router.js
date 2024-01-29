import express from "express"
import productos_controller from "../controllers/productos.controller.js"
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        await productos_controller.getProductos(req, res)
    } catch (error) {
        next(error)
    }
})

router.get("/categorias", async (req, res, next) => {
    try {
        await productos_controller.getProductosCategorias(req, res)
    } catch (error) {
        next(error)
    }
})


export default router
