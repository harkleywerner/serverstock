import sucursales_model from "../models/sucursales.model.js"

const sucursales_controler = {


    getsucursales: async (req, res, next) => {

        if (req.session?.sucursal_info) {
            req.session.destroy()
        }

        try {
            const resultado_sucursales = await sucursales_model.getsucursales()
            res.status(200).json({ tipo: "success", data: resultado_sucursales })
        } catch (error) {
            next(error)
        }

    },

    getSucursalLogout: async (req, res) => {

        req.session.destroy()

        res.status(200).json({ tipo: "success" })
    },

    postSucursal: async (req, res, next) => {

        try {
            const sucursal_info = await sucursales_model.logginSucursal(req)

            if (sucursal_info.length == 1) {
                req.session.sucursal_info = { ...sucursal_info[0], loggeado: true }

                res.status(200).json({ tipo: "success" })
            } else {
                res.status(200).json({ tipo: "denied" })
            }
        } catch (error) {
            next(error)
        }

    },
    postSucursalInvitado: async (req, res) => {
        req.session.sucursal_info = { ...req.body, loggeado: false }
        res.status(200).json({ tipo: "success" })
    }


}


export default sucursales_controler