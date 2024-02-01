import categorias_model from "../models/categorias.model.js"
import productos_model from "../models/productos.model.js"


const productos_controller = {

    getAllProductos: async (req, res, next) => {

        try {
            const listaDeProductos = await productos_model.getAllProductos(req)
            res.status(200).json(listaDeProductos)
        } catch (error) {
            next(error)
        }
    },

    getAllCategorias: async (req, res, next) => {
        try {
            const listaDeCategorias = await categorias_model.getAllCategorias(req)
            res.status(200).json(listaDeCategorias)
        } catch (error) {
            next(error)
        }
    }


}


export default productos_controller