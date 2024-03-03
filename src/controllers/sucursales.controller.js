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

            if (logeo.length == 1) {
                req.session.id_sucursal =  req.body.id_sucursal
                res.status(200).json({tipo : "success"})
            } else {
                res.status(200).json({ tipo: "denied" })
            }
        } catch (error) {
            next(error)
        }

    },


}


export default sucursales_controler