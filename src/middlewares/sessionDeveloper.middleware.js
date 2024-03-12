export const sessionDeveloperMiddleware = (req, res, next) => {

    const APP = process.env.APP


    if (APP == "development" && !req.session?.sucursal_info?.id_sucursal) {
    
        req.session.sucursal_info = {
            id_sucursal: 3,
            nombre: "testing",
            loggeado : true
        }
        req.session.usuario_info = {
            id_usuario: 23,
            nombre: "admin"
        }
    }

    next()

};