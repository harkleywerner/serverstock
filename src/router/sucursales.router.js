import express from "express"
import sucursales_controler from "../controllers/sucursales.controller.js"
const router = express.Router()


router.get("/", sucursales_controler.getsucursales)

router.post("/", sucursales_controler.postSucursal)

router.post("/invitado",sucursales_controler.postSucursalInvitado)

export default router