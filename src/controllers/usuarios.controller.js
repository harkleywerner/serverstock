import usuarios_model from "../models/usuario.models.js"

const usuarios_controler = {

    getUsuarios: async (req, res) => {
        try {
            const resultado_usuarios = await usuarios_model.getUsuarios()
            res.status(200).json(resultado_usuarios)
        } catch (error) {
            new Error(400)
        }
    },

    postUsuario: async (req, res) => {
        try {
            const logeo = await usuarios_model.postUsuario(req)

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


export default usuarios_controler