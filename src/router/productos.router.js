import express from "express"
import productos_controller from "../controllers/productos.controller.js"
const router = express.Router()

router.get("/",(req,res) => productos_controller.getProductos(req,res))


export default router
