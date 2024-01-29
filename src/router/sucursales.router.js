import express from "express"
import sucursales_controler from "../controllers/sucursales.controller.js"
const router = express.Router()


router.get("/", async (req, res, next) => {
    try {
        await sucursales_controler.getsucursales(req, res)

    } catch (error) {
        next(error)
    }

})

router.post("/", async (req, res,next) => {
    try {
        await sucursales_controler.postUsuario(req, res)
    } catch (error) {
        next(error)
    }
})

export default router