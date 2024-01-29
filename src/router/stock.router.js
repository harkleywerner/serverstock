import express from "express"
import stock_controller from "../controllers/stock.controller.js"

const router = express.Router()

router.get("/", async (req, res) => {
    try {
        await stock_controller.getAllStock(req, res)
    } catch (error) {
        next(error)
    }
})

router.get("/gestion/detalles", async (req, res, next) => {
    try {
        await stock_controller.getDetalleStock(req, res)
    } catch (error) {
        next(error)
    }
})


router.get("/gestion", async (req, res) => {
    try {
        await stock_controller.getStock(req, res)
    } catch (error) {
        next(error)
    }
})

router.put("/gestion", async (req, res, next) => {
    try {
        await stock_controller.putStock(req, res, next)
    } catch (error) {
        next(error)
    }
})

router.post("/nuevo", async (req, res, next) => {
    try {
        await stock_controller.postStock(req, res, next)
    } catch (error) {
        next(error)
    }
})

export default router