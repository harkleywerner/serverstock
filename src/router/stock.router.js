import express from "express"
import stock_controller from "../controllers/stock.controller.js"

const router = express.Router()

router.get("/", (req, res, next) => stock_controller.getAllStock(req, res, next))

router.get("/gestion", (req, res, next) => stock_controller.getStockGestion(req, res, next))

router.post("/",(req,res,next) => stock_controller.postStock(req,res,next))

router.put("/gestion", (req, res, next) => stock_controller.putStockGestion(req, res, next))

router.post("/nuevo", (req, res, next) => stock_controller.postNuevoStock(req, res, next))

export default router