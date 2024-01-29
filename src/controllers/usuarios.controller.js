import usuarios_model from "../models/usuario.models.js"

const usuarios_controler = {

    getUsuarios: async (req, res) => {
        const resultado_usuarios = await usuarios_model.getUsuarios()
        res.status(200).json(resultado_usuarios)
    },

    postUsuario: async (req, res) => {

        const logeo = await usuarios_model.logginUsuario(req)

        if (logeo.affectedRows == 1) {
            res.status(200).json({ message: "verificado" })
        } else {
            res.status(204).json({ message: "no identificado" })
        }

    }
}


export default usuarios_controler