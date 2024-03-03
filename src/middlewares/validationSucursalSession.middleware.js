export const validationSucursalSessionMiddleware = (req, res, next) => {
    //=> Este middleware sirve para todas las rutas cuya raiz empieza con stock.
    const { id_sucursal } = req.session

    if (id_sucursal) {
        next()
    } else {
        res.status(401).json(
            {
                tipo: "denied",
                message: "Tu session se expiro o no tiene acceso a esta ruta.",
                redirect : "sucursales"
            }
        )
    }

};