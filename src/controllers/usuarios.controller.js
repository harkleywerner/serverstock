import usuarios_model from "../models/usuario.models.js"

const usuarios_controler = {

    getUsuarios: async (req, res, next) => {
        try {
            const resultado_usuarios = await usuarios_model.getUsuarios(req)
            res.status(200).json({ tipo: "success", data: resultado_usuarios })
        } catch (error) {
            next(error)
        }
    },

    postUsuario: async (req, res, next) => {

        try {
            const logeo = await usuarios_model.logginUsuario(req)

            const { nombre, apellido, rol, id_usuario } = logeo[0] || {}

            if (logeo.length == 1) {
                req.session.usuario_info = { nombre, apellido, rol, id_usuario }
                res.status(200).json({ tipo: "success" })
            } else {
                res.status(401).json({ tipo: "denied" })
            }
        } catch (error) {
            next(error)
        }

    }
}


export default usuarios_controler