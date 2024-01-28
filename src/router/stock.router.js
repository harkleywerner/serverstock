import express from "express"
import stock_controller from "../controllers/stock.controller.js"

const router = express.Router()

router.get("/", (req, res) => stock_controller.getAllStock(req, res))

router.get("/gestion", (req, res) => stock_controller.getStock(req, res))

router.put("/gestion", (req, res) => stock_controller.putStock(req, res))

router.post("/nuevo", (req, res) => stock_controller.postStock(req, res))

export default router