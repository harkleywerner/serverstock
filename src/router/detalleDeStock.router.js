import express from "express"
import detalle_de_stock_controller from "../controllers/detalleDeStock.controller.js"

const router = express.Router()

router.get("/", detalle_de_stock_controller.getDetalleDeStock)

export default router