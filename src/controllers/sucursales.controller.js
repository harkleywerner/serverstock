import sucursales_model from "../models/usuario.models.js"

const sucursales_controler = {

    getsucursales: async (req, res) => {
        try {
            const resultado_sucursales = await sucursales_model.getsucursales()
            res.status(200).json(resultado_sucursales)
        } catch (error) {
            new Error(400)
        }
    },

    postSucursal: async (req, res) => {
        try {
            const logeo = await sucursales_model.postUsuario(req)

            if (logeo.affectedRows == 1) {
                res.status(200).json({ message: "verificado" })
            } else {
                res.status(204).json({ message: "no identificado" })
            }

        } catch (error) {
            new Error(400)
        }
    }
}


export default sucursales_controler