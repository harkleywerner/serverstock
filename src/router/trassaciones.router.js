import express from "express"
import trassaciones_controller from "../controllers/transsaciones.controller.js"
const router = express.Router()


router.post("/",trassaciones_controller.postTranssacion)

export default router