import usuarios_model from "../models/usuario.models.js"

const usuarios_controler = {

    getUsuarios: async (req, res, next) => {
        try {
            const resultado_usuarios = await usuarios_model.getUsuarios()
            res.status(200).json(resultado_usuarios)
        } catch (error) {
            next(error)
        }
    },

    postUsuario: async (req, res, next) => {

        try {
            const logeo = await usuarios_model.logginUsuario(req)

            if (logeo.affectedRows == 1) {
                res.status(200).json({ message: "verificado" })
            } else {
                res.status(204).json({ message: "no identificado" })
            }
        } catch (error) {
            next(error)
        }

    }
}


export default usuarios_controler