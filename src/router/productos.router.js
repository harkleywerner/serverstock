import express from "express"
import productos_controller from "../controllers/productos.controller.js"
const router = express.Router()

router.get("/",productos_controller.getAllProductos)

router.get("/categorias",productos_controller.getAllCategorias)

router.post("/",productos_controller.postProducto)

export default router
