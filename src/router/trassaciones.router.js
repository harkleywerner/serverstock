import express from "express"
import trassaciones_controller from "../controllers/transsaciones.controller.js"
const router = express.Router()


router.post("/", (req, res, next) => trassaciones_controller.postTranssacion(req, res, next))

router.post("/detalles", (req, res, next) => trassaciones_controller.postTranssacionesDetalle(req, res, next))

export default router