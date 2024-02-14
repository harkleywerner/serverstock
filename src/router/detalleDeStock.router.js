import express from "express"
import detalle_de_stock_controller from "../controllers/detalleDeStock.controller.js"

const router = express.Router()

router.get("/ultimo", (req, res, next) => detalle_de_stock_controller.getUltimoDetalleDeStock(req, res, next))
router.get("/", (req, res, next) => detalle_de_stock_controller.getDetalleDeStock(req, res, next))


export default router