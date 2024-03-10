import express from "express"
import transsaciones_controller from "../controllers/transsaciones.controller.js"
const router = express.Router()


router.post("/", transsaciones_controller.postTranssacion)
router.get("/", transsaciones_controller.getTranssacion)

export default router