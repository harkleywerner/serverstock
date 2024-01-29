import express from "express"
import usuarios_controler from "../controllers/usuarios.controller.js"

const router = express.Router()

router.get("/", (req, res, next) => usuarios_controler.getUsuarios(req, res, next))

router.post("/", (req, res, next) => usuarios_controler.postUsuario(req, res, next))

export default router