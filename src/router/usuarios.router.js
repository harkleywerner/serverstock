import express from "express"
import usuarios_controler from "../controllers/usuarios.controller.js"

const router = express.Router()

router.get("/",  usuarios_controler.getUsuarios)

router.post("/",  usuarios_controler.postUsuario)

export default router