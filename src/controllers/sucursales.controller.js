import sucursales_model from "../models/sucursales.model.js"

const sucursales_controler = {

    getsucursales: async (req, res, next) => {
        try {
            const resultado_sucursales = await sucursales_model.getsucursales()
            res.status(200).json(resultado_sucursales)
        } catch (error) {
            next(error)
        }

    },

    postSucursal: async (req, res, next) => {

        try {
            const logeo = await sucursales_model.logginSucursal(req)

            if (logeo.affectedRows == 1) {
                res.status(200).json({ message: "success" })
            } else {
                res.status(204).json({ message: "denied" })
            }
        } catch (error) {
            next(error)
        }

    },


}


export default sucursales_controler