import express from "express"
import sucursales_controler from "../controllers/sucursales.controller.js"
const router = express.Router()


router.get("/", (req, res, next) => sucursales_controler.getsucursales(req, res, next))

router.post("/", (req, res, next) => sucursales_controler.postUsuario(req, res, next))

export default router