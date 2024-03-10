export const validationSucursalLoggeadaMiddleware = (req,res,next) => {

    const { sucursal_info = {} } = req.session

    const { loggeado } = sucursal_info

    if (loggeado) {
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
