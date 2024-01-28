import express from "express"
import sucursales_controler from "../controllers/sucursales.controller.js"
const router = express.Router()


router.get("/", (req, res) => sucursales_controler.getsucursales(req, res))

router.post("/", (req, res) => sucursales_controler.postUsuario(req, res))

export default router