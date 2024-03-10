import trassaciones_model from "../models/transsacionesModel/trassaciones.model.js"

const trassaciones_controller = {

    postTranssacion: async (req, res, next) => {

        try {
            const transsacion = await trassaciones_model.addTranssacion(req, next)
            res.status(200).json({ tipo: "success", data: { ...transsacion } })
        } catch (error) {
            next(error)
        }
    },

    getTranssacion: async (req, res, next) => {
        try {
            const transsacion = await trassaciones_model.getTranssacionByIdStock(req, next)
          
            res.status(200).json({ tipo: "success", data: {...transsacion[0]} })
        } catch (error) {
            next(error)
        }
    }

}


export default trassaciones_controller