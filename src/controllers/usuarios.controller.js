import usuarios_model from "../models/usuario.models.js"

const usuarios_controler = {

    getUsuarios: async (req, res) => {
        try {
            const resultado_usuarios = await usuarios_model.getUsuarios()
            res.json(resultado_usuarios)
        } catch (error) {
            res.json({ "error": 404 })
            console.log(error)
        }
    }
}


export default usuarios_controler