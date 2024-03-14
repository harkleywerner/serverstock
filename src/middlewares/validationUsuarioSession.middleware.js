export const validationUsuarioSessionMiddleware = (req, res, next) => { 

    const { usuario_info = {} } = req.session

    const { id_usuario } = usuario_info

    if (id_usuario) {
        next()
    } else {
        res.status(401).json(
            {
                tipo: "denied",
                message: "Debes iniciar session con algun usuario.",
                redirect: "/"
            }
        )
    }

};