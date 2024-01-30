
const trassaciones_controller = {

    postTranssacion: async (req, next) => {

        try {
            res.status(200).json()
        } catch (error) {
            next(error)
        }
    },

    postTranssacionesDetalle: async (req, next) => {
        try {
            res.status(200).json()
        } catch (error) {
            next(error)
        }
    }

}


export default trassaciones_controller