import express from "express"
import productos_controller from "../controllers/productos.controller.js"
const router = express.Router()

router.get("/", (req, res, next) => productos_controller.getAllProductos(req, res, next))


export default router
