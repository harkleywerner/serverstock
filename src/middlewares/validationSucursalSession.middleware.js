export const validationSucursalSessionMiddleware = (req, res, next) => {

    const { sucursal_info = {} } = req.session

    const { id_sucursal } = sucursal_info


    if (id_sucursal) {
        next()
    } else {
        res.status(401).json(
            {
                tipo: "denied",
                message: "Tu session se expiro o no tiene acceso a esta ruta.",
                redirect: "/"
            }
        )
    }
};