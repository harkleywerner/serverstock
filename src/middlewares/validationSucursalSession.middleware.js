

export const validationSucursalSessionMiddleware = (req, res, next) => {

    const { sucursal_info = {}, usuario_info = {} } = req.session

    const { id_sucursal, loggeado } = sucursal_info
    const { id_usuario } = usuario_info

    const response = (redirect = "/") => {
        res.status(401).json(
            {
                tipo: "denied",
                message: "Tu session se expiro o no tiene acceso a esta ruta.",
                redirect: redirect
            }
        )

    }

    if (loggeado && !id_usuario) {
        response("usuarios")
    }
    else if (!id_sucursal) {
        response()
    }
    else {
        next()
    }
};


