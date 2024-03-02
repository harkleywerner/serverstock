import express from "express"
import detalle_de_stock_controller from "../controllers/detalleDeStock.controller.js"

const router = express.Router()

router.get("/", detalle_de_stock_controller.getDetalleDeStock)
router.post("/producto", detalle_de_stock_controller.postDetalleDeStockProducto)

export default router