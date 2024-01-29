import express from "express"
import usuarios_controler from "../controllers/usuarios.controller.js"

const router = express.Router()


router.get("/", async (req, res, next) => {
    try {
        await usuarios_controler.getUsuarios(req, res)
    } catch (error) {
        next(error)
    }
})

router.post("/", async (req, res, next) => {
    try {
        await usuarios_controler.postUsuario(req, res)
    } catch (error) {
        next(error)
    }
})

export default router