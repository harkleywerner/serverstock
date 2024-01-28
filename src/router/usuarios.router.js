import express from "express"
import usuarios_controler from "../controllers/usuarios.controller.js"
const router = express.Router()


router.get("/", (req, res) => usuarios_controler.getUsuarios(req, res))

router.post("/", (req, res) => usuarios_controler.postUsuario(req, res))

export default router