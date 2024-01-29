import productos_model from "../models/productos.model.js"


const productos_controller = {

    getProductos: async (req, res) => {

        const listaDeProductos = await productos_model.getProductos(req, res)
        res.status(200).json(listaDeProductos)

    },

    getProductosCategorias: async (req, res) => {

        const categorias = await categorias_model.getCategorias()

        res.status(200).json(categorias)
    }
}


export default productos_controller