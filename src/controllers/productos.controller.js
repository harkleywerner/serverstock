import productos_model from "../models/productos.model.js"


const productos_controller = {

    getProductos: async (req, res, next) => {
        try {
            const listaDeProductos = await productos_model.getProductos(req)
            res.status(200).json(listaDeProductos)
        } catch (error) {
            next(error)
        }
    },


}


export default productos_controller