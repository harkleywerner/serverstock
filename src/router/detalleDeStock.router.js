import express from "express"
import detalle_de_stock_controller from "../controllers/detalleDeStock.controller.js"

const router = express.Router()

router.get("/",detalle_de_stock_controller.getDetalleDeStock)
router.get("/",detalle_de_stock_controller.getDetalleDeStockByIdProducto)
router.post("/", detalle_de_stock_controller.postDetalleDeStock)

export default router