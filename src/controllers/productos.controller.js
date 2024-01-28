import productos_model from "../models/productos.model"

const productos_controller = {

    getProductos: async (req, res) => {
        try {

            const listaDeProductos = await productos_model.getProductos(req)

            res.status(200).json(listaDeProductos)

        } catch (error) {
            new Error(400)
        }
    }
}


export default productos_controller