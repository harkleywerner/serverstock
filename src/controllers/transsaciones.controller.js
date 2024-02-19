import trassaciones_model from "../models/trassaciones.model.js"




const trassaciones_controller = {

    postTranssacion: async (req, res, next) => {

        try {
            const transsacion = await trassaciones_model.addTranssacion(req)

            const response = transsacion ? transsacion : { success: "success" }

            res.status(200).json({ ...response })
        } catch (error) {
            next(error)
        }
    },



}


export default trassaciones_controller