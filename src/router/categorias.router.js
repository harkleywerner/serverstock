import express from "express"
import categorias_controller from "../controllers/categorias.controller"

const router = express.Router()

router.get("/",(req,res) => categorias_controller.getCategorias(req,res))

export default router
