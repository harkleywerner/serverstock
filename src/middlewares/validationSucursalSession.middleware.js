export const validationSucursalSessionMiddleware = (req, res, next) => {
    //=> Este middleware sirve para todas las rutas cuya raiz empieza con stock.
    const { sucursal_info = {} } = req.session

    return next()
    if (sucursal_info.id_sucursal) {

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