import categorias_model from "../models/categorias.model"

const categorias_controller = {

    getCategorias: async (res, req) => {
        try {
            const categorias = await categorias_model.getCategorias()

            res.status(200).json(categorias)

        } catch (error) {
            new Error(400)
        }
    }
}

export default categorias_controller