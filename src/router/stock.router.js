import express from "express"
import stock_controller from "../controllers/stock.controller.js"

const router = express.Router()

router.get("/",  stock_controller.getAllStock)

router.get("/gestion",  stock_controller.getStockGestion)

router.post("/", stock_controller.postStock)

router.patch("/gestion",  stock_controller.patchStockGestion)

router.post("/nuevo",  stock_controller.postNuevoStock)

export default router